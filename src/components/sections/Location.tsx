import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { clinic } from "@/config/clinic";
import { formatAddress, formatHours, mapsEmbedUrl, mapsSearchUrl } from "@/lib/hours";
import { buildWhatsAppUrl, defaultWhatsAppMessage, whatsappDisplay } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { PendingText } from "@/components/ui/Placeholder";
import { MapEmbed } from "@/components/ui/MapEmbed";

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-5">
      <span className="grid size-10 place-items-center rounded-full bg-mint text-sage">
        <Icon className="size-[1.1rem]" aria-hidden="true" />
      </span>
      <div>
        <dt className="text-xs font-bold tracking-[0.14em] text-ink-muted uppercase">{label}</dt>
        <dd className="mt-1 leading-relaxed">{children}</dd>
      </div>
    </div>
  );
}

const linkClass =
  "font-semibold underline decoration-forest/25 underline-offset-4 transition-colors hover:decoration-forest";

export function Location({ title }: { title?: ReactNode } = {}) {
  const { address, hours, phone, social } = clinic;
  const mapsUrl = clinic.mapsUrl ?? (address ? mapsSearchUrl(address) : null);
  const embedUrl = clinic.mapEmbedUrl ?? (address ? mapsEmbedUrl(address) : null);
  const whatsapp = whatsappDisplay();
  const facade = clinic.gallery.find((g) => g.orientation === "landscape" && g.photo && !g.photo.provisional)?.photo;
  const formatted = address ? formatAddress(address) : null;

  return (
    <section id="contato" aria-labelledby="contato-title" className="border-t border-line py-24 md:py-32">
      <div className="container-x grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div data-reveal>
            <p className="eyebrow flex items-center gap-3 text-sage">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              Onde estamos
            </p>
            <h2 id="contato-title" className="text-h2 mt-5 text-balance">
              {title ?? <>Venha conhecer a {clinic.name}.</>}
            </h2>
          </div>

          <dl className="mt-10 divide-y divide-line border-y border-line" data-reveal>
            <Row icon={MapPin} label="Endereço">
              {formatted ? (
                <address className="not-italic">
                  {formatted.line1}
                  <br />
                  {formatted.line2}
                </address>
              ) : (
                <PendingText>Endereço completo a confirmar</PendingText>
              )}
            </Row>
            <Row icon={Clock} label="Horários">
              {hours ? (
                <span className="grid gap-0.5">
                  {formatHours(hours).map((h) => (
                    <span key={h.days}>
                      {h.days}: <span className="font-semibold">{h.time}</span>
                    </span>
                  ))}
                </span>
              ) : (
                <PendingText>Dias e horários a confirmar</PendingText>
              )}
            </Row>
            {whatsapp && (
              <Row icon={WhatsAppIcon} label="WhatsApp">
                <a
                  href={buildWhatsAppUrl(defaultWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {whatsapp}
                </a>
              </Row>
            )}
            {phone && (
              <Row icon={Phone} label="Telefone">
                <a href={`tel:${phone.replace(/\D/g, "")}`} className={linkClass}>
                  {phone}
                </a>
              </Row>
            )}
            <Row icon={InstagramIcon} label="Instagram">
              {social.instagram ? (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {social.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, "")}
                </a>
              ) : (
                <PendingText>Perfil a confirmar</PendingText>
              )}
            </Row>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3" data-reveal>
            {mapsUrl && (
              <ButtonLink href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin className="size-[1.1rem]" aria-hidden="true" />
                Abrir no mapa
              </ButtonLink>
            )}
            <ButtonLink
              href={buildWhatsAppUrl(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              variant={mapsUrl ? "outline" : "primary"}
            >
              <WhatsAppIcon className="size-[1.1rem]" />
              Falar no WhatsApp
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-6 lg:col-span-7" data-reveal>
          {facade && (
            <figure>
              <div className="relative aspect-[1140/565] overflow-hidden rounded-media bg-mint">
                <Image
                  src={facade.src}
                  alt={facade.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-ink-muted">Fachada da clínica no dia da inauguração.</figcaption>
            </figure>
          )}
          {embedUrl && <MapEmbed src={embedUrl} title={`Mapa com a localização da ${clinic.name}`} />}
        </div>
      </div>
    </section>
  );
}
