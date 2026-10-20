import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clinic } from "@/config/clinic";
import { servicePages } from "@/content/landing-pages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PendingBadge, ProvisionalTag } from "@/components/ui/Placeholder";
import { ServicesShowcase } from "@/components/client/ServicesShowcase";
import { bookingHref } from "@/lib/booking";

export function Services() {
  const hrefs = Object.fromEntries(
    servicePages.filter((p) => p.serviceId).map((p) => [p.serviceId as string, p.path]),
  );
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="servicos-title"
          layout="split"
          eyebrow="Serviços"
          title="O que você encontra na Platz Vet."
          intro={
            <>
              Escolha um serviço para ver os detalhes e iniciar o agendamento pelo WhatsApp, ou{" "}
              <Link href="/servicos" className="font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest">
                veja todos os serviços veterinários em Guarulhos
              </Link>
              .
            </>
          }
        />
      </div>

      <div className="mt-14 hidden px-4 lg:block" data-reveal>
        <ServicesShowcase services={clinic.services} hrefs={hrefs} />
      </div>

      <ul className="container-x mt-12 grid gap-12 sm:grid-cols-2 sm:gap-x-6 md:gap-x-8 lg:hidden" data-reveal-group>
        {clinic.services.map((service) => (
          <li key={service.id}>
            <article>
              <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-mint sm:aspect-[4/5]">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  style={{ objectPosition: service.image.position }}
                  className="object-cover"
                />
                <ProvisionalTag photo={service.image} />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="text-h3">{service.name}</h3>
                {!service.confirmed && <PendingBadge />}
              </div>
              <p className="mt-3 leading-relaxed text-ink-muted">{service.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                {hrefs[service.id] && (
                  <Link
                    href={hrefs[service.id]}
                    className="group inline-flex items-center gap-2 border-b border-forest pb-1 font-semibold"
                  >
                    Saiba mais<span className="sr-only"> sobre {service.name.toLowerCase()} em Guarulhos</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                )}
                <Link
                  href={bookingHref(service.id)}
                  className="text-sm font-semibold text-ink-muted underline-offset-4 hover:text-forest hover:underline"
                >
                  Agendar<span className="sr-only">: {service.name}</span>
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
