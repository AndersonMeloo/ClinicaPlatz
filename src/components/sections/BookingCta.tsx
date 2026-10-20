import Link from "next/link";
import { bookingHref } from "@/lib/booking";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Faixa de chamada que leva à página de agendamento (com o serviço já escolhido). */
export function BookingCta({ serviceId, title, text }: { serviceId?: string; title: string; text: string }) {
  return (
    <section aria-labelledby="agendar-cta-title" className="on-dark bg-forest py-20 text-cream md:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10" data-reveal>
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-leaf">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            Agendamento
          </p>
          <h2 id="agendar-cta-title" className="text-h2 mt-5 text-balance">
            {title}
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-cream/75">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
          <Link href={bookingHref(serviceId)} className={buttonClass("light")}>
            <WhatsAppIcon className="size-[1.15rem]" />
            Agendar agora
          </Link>
          <ButtonLink
            href={buildWhatsAppUrl(defaultWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-light"
          >
            Tirar dúvidas
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
