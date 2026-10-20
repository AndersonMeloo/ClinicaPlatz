import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { clinic, hasProvisionalPhotos, navigation } from "@/config/clinic";
import { landingPages } from "@/content/landing-pages";
import { formatHours } from "@/lib/hours";
import { buildWhatsAppUrl, defaultWhatsAppMessage, whatsappDisplay } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { AutoVideo } from "@/components/client/AutoVideo";

const linkClass = "text-cream/80 transition-colors hover:text-cream";

export function InstagramBand() {
  const { instagram } = clinic.social;
  if (!instagram && !clinic.showPlaceholderNotes) return null;
  const handle = instagram?.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, "");

  return (
    <section aria-labelledby="instagram-title" className="border-t border-line">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col items-center justify-center px-5 py-20 text-center md:border-r md:border-line md:py-24">
          <p className="eyebrow text-sage">Acompanhe</p>
          <h2 id="instagram-title" className="text-h2 mt-5 max-w-[16ch] text-balance">
            Novidades e bastidores da clínica.
          </h2>
          <p className="mt-5 max-w-[40ch] leading-relaxed text-ink-muted">
            Siga a {clinic.name} no Instagram para conhecer a equipe, o espaço e os pacientes.
          </p>
          {instagram ? (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-b border-forest pb-1 font-semibold"
            >
              <InstagramIcon className="size-[1.1rem]" />
              {handle}
            </a>
          ) : (
            <p className="mt-8 inline-flex items-center gap-2 text-ink-muted italic">
              <InstagramIcon className="size-[1.1rem]" />
              [Link do perfil a confirmar]
            </p>
          )}
        </div>
        <div className="flex items-center justify-center bg-mint px-5 py-16 md:py-20">
          <AutoVideo
            video={clinic.instagramVideo}
            className="aspect-[9/16] w-[min(280px,68vw)] rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(15_44_32/0.6)] ring-8 ring-paper"
          />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="on-dark bg-forest text-cream">
        <div className="container-x pt-20 pb-10 md:pb-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-10 lg:grid-cols-12 lg:gap-10">
            <div className="col-span-2 md:col-span-3 lg:col-span-4">
              <Logo tone="light" size="lg" />
              <p className="mt-8 max-w-[18ch] font-display text-[2rem] leading-[1.1] text-balance">{clinic.tagline}</p>
            </div>

            <nav aria-label="Rodapé" className="lg:col-span-2">
              <p className="eyebrow text-leaf">Navegação</p>
              <ul className="mt-5 grid gap-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Serviços" className="lg:col-span-3">
              <p className="eyebrow text-leaf">Serviços em Guarulhos</p>
              <ul className="mt-5 grid gap-3">
                {landingPages.map((page) => (
                  <li key={page.path}>
                    <Link href={page.path} className={linkClass}>
                      {page.breadcrumb}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="col-span-2 md:col-span-1 lg:col-span-3">
              <p className="eyebrow text-leaf">Contato</p>
              {clinic.address && (
                <address className="mt-5 text-cream/80 not-italic">
                  {clinic.address.street}, {clinic.address.number}
                  <br />
                  {clinic.address.district}, {clinic.address.city}/{clinic.address.state}
                </address>
              )}
              <ul className="mt-5 grid gap-3">
                <li>
                  <a
                    href={buildWhatsAppUrl(defaultWhatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${linkClass}`}
                  >
                    <WhatsAppIcon className="size-4" />
                    {whatsappDisplay() ?? "WhatsApp"}
                  </a>
                </li>
                {clinic.phone && (
                  <li>
                    <a href={`tel:${clinic.phone.replace(/\D/g, "")}`} className={linkClass}>
                      {clinic.phone}
                    </a>
                  </li>
                )}
                {clinic.social.instagram && (
                  <li>
                    <a
                      href={clinic.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 ${linkClass}`}
                    >
                      <InstagramIcon className="size-4" />
                      Instagram
                    </a>
                  </li>
                )}
              </ul>

              <p className="eyebrow mt-10 text-leaf">Horários</p>
              <ul className="mt-5 grid gap-3 text-cream/80">
                {clinic.hours ? (
                  formatHours(clinic.hours).map((h) => (
                    <li key={h.days}>
                      {h.days}
                      <br />
                      <span className="text-cream">{h.time}</span>
                    </li>
                  ))
                ) : (
                  <li className="italic">[A confirmar]</li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-14 border-t border-cream/15 pt-8 text-sm text-cream/70">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p>
                © {year} {clinic.name}. Todos os direitos reservados.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 md:pr-16">
                <Link href="/privacidade" className={linkClass}>
                  Política de privacidade
                </Link>
                {clinic.showPlaceholderNotes && hasProvisionalPhotos() && <span></span>}
              </div>
            </div>

            <p className="mt-6 flex justify-center">
              <a
                href="https://www.andersonrmelo.com.br/"
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-1 text-cream/50 transition-colors hover:text-cream"
              >
                Desenvolvido por Anderson R. Melo
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
