import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Clock, HeartHandshake, Pill } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { clinic } from "@/config/clinic";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { PendingBadge, ProvisionalTag } from "@/components/ui/Placeholder";
import { SignatureLine } from "@/components/ui/SignatureLine";
import { TodayHours } from "@/components/client/TodayHours";

function Fact({ icon: Icon, children, pending }: { icon: LucideIcon; children: ReactNode; pending?: boolean }) {
  return (
    <li className="flex items-center gap-3.5">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mint text-sage">
        <Icon className="size-[1.1rem]" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.95rem] font-medium">
        {children}
        {pending && <PendingBadge />}
      </span>
    </li>
  );
}

export function Hero() {
  const { petlove, pharmacy } = clinic.partners;
  const showPending = clinic.showPlaceholderNotes;

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col lg:col-span-7 lg:pt-6">
          <h1 id="hero-title" data-hero-fade className="eyebrow flex items-center gap-3 text-sage">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {clinic.descriptor} em {clinic.address?.city ?? "Guarulhos"}
          </h1>

          <p data-hero-title className="text-display mt-7 max-w-[13ch] text-balance">
            Cuidando de quem faz parte da sua <em className="text-sage italic">história</em>.
          </p>

          <div className="mt-10 lg:mt-14 lg:ml-[24%]">
            <p data-hero-fade className="max-w-[40ch] text-lg leading-relaxed text-ink-muted md:text-[1.2rem]">
              Consultas, exames, vacinação, hidratação e farmácia veterinária para cães, gatos e pets não
              convencionais. Solicite seu horário pelo WhatsApp em poucos passos.
            </p>
            <div data-hero-fade className="mt-8 flex flex-wrap gap-3">
              <Link href="/consulta" className={buttonClass("primary")}>
                <WhatsAppIcon className="size-[1.15rem]" />
                Agendar pelo WhatsApp
              </Link>
              <ButtonLink href="#servicos" variant="outline">
                Conhecer os serviços
              </ButtonLink>
            </div>
          </div>

          <a
            href="#servicos"
            data-hero-fade
            className="group mt-auto hidden items-center gap-3 pt-16 text-sm font-medium text-ink-muted transition-colors hover:text-forest lg:inline-flex"
          >
            <span className="grid size-10 place-items-center rounded-full border border-forest/20 transition-colors group-hover:border-forest">
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
            </span>
            Role para conhecer
          </a>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-mint md:aspect-[4/5]">
            <Image
              data-hero-media
              src={clinic.heroPhoto.src}
              alt={clinic.heroPhoto.alt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              style={{ objectPosition: clinic.heroPhoto.position }}
              className="object-cover"
            />
            <ProvisionalTag photo={clinic.heroPhoto} />
          </div>
          <SignatureLine className="pointer-events-none absolute -bottom-9 -left-24 hidden w-72 text-clay md:block xl:-left-32 xl:w-80" />
        </div>
      </div>

      <div className="container-x mt-14 md:mt-20">
        <ul className="grid gap-5 border-t border-line pt-7 pb-2 sm:grid-cols-2 lg:grid-cols-3" data-hero-fade>
          {(petlove.confirmed || showPending) && (
            <Fact icon={HeartHandshake} pending={!petlove.confirmed}>
              Atendemos clientes Petlove
            </Fact>
          )}
          {(pharmacy.confirmed || showPending) && (
            <Fact icon={Pill} pending={!pharmacy.confirmed}>
              Farmácia veterinária no local
            </Fact>
          )}
          {clinic.hours ? (
            <Fact icon={Clock}>
              <TodayHours hours={clinic.hours} />
            </Fact>
          ) : (
            showPending && (
              <Fact icon={Clock} pending>
                Horários de atendimento
              </Fact>
            )
          )}
        </ul>
      </div>
    </section>
  );
}
