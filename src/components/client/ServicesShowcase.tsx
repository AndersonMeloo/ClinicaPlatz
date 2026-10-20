"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import type { Service } from "@/config/clinic";
import { PendingBadge } from "@/components/ui/Placeholder";
import { bookingHref } from "@/lib/booking";

/**
 * Vitrine de serviços (desktop): foto de fundo em tela cheia que acompanha o
 * card ativo. Cada card é um acordeão horizontal (botão com aria-expanded).
 * Nada troca sozinho; a troca acontece por clique ou teclado.
 */
export function ServicesShowcase({ services, hrefs }: { services: Service[]; hrefs: Record<string, string> }) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <div className="on-dark relative isolate flex h-[min(88vh,820px)] min-h-[660px] flex-col justify-end overflow-hidden rounded-[2rem] bg-forest-deep pb-10">
      {services.map((service, i) => (
        <Image
          key={service.id}
          src={service.backdrop.src}
          alt=""
          fill
          sizes="100vw"
          loading={i === 0 ? "eager" : "lazy"}
          style={{ objectPosition: service.backdrop.position }}
          className={`-z-20 object-cover transition-[opacity,transform] duration-[1100ms] ease-soft ${
            i === active ? "scale-100 opacity-100" : "scale-[1.05] opacity-0"
          }`}
        />
      ))}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/90 via-forest-deep/35 via-55% to-forest-deep/5"
      />

      <ul className="mx-auto flex h-[340px] w-full max-w-[1280px] items-stretch gap-3.5 px-8">
        {services.map((service, i) => {
          const isActive = i === active;
          const panelId = `${baseId}-painel-${i}`;
          return (
            <li
              key={service.id}
              className={`relative min-w-0 basis-0 overflow-hidden rounded-card transition-[flex-grow,background-color,box-shadow] duration-700 ease-soft ${
                isActive
                  ? "on-light grow-[2.6] bg-paper text-forest shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)]"
                  : "grow bg-forest-deep/45 text-cream ring-1 ring-white/15 backdrop-blur-xl hover:bg-forest-deep/60"
              }`}
            >
              <div className={`flex h-full flex-col ${isActive ? "p-7 xl:p-8" : "p-5 xl:p-6"}`}>
                <span className={`text-xs font-bold tracking-[0.16em] ${isActive ? "text-sage" : "text-cream/70"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={isActive ? "mt-3" : "flex flex-1 items-center justify-center text-center"}>
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => setActive(i)}
                    className={`font-display tracking-[-0.015em] text-balance ${
                      isActive
                        ? "cursor-default text-left text-[2rem] leading-[1.05]"
                        : "text-[1.3rem] leading-tight after:absolute after:inset-0 after:content-[''] xl:text-[1.4rem]"
                    }`}
                  >
                    {service.name}
                  </button>
                </h3>
                {!isActive && (
                  <Plus aria-hidden="true" className="mx-auto size-5 text-cream/80" strokeWidth={1.6} />
                )}

                <div id={panelId} hidden={!isActive} className="animate-fade-up flex-1 flex-col data-[open=true]:flex" data-open={isActive}>
                  <p className="mt-3 max-w-[44ch] leading-relaxed text-ink-muted">{service.description}</p>
                  {!service.confirmed && (
                    <p className="mt-3">
                      <PendingBadge />
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-forest pt-4">
                    {hrefs[service.id] && (
                      <Link href={hrefs[service.id]} className="group/cta inline-flex items-center gap-2 font-semibold">
                        Saiba mais<span className="sr-only"> sobre {service.name.toLowerCase()} em Guarulhos</span>
                        <ArrowRight
                          aria-hidden="true"
                          className="size-5 transition-transform duration-300 ease-soft group-hover/cta:translate-x-1"
                        />
                      </Link>
                    )}
                    <Link
                      href={bookingHref(service.id)}
                      className="text-sm font-semibold text-ink-muted underline-offset-4 transition-colors hover:text-forest hover:underline"
                    >
                      Agendar<span className="sr-only">: {service.name}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
