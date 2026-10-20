"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import type { CareStep } from "@/config/clinic";
import { PendingBadge, ProvisionalTag } from "@/components/ui/Placeholder";

/**
 * Acordeão com item ativo destacado e foto ao lado (desktop). No celular,
 * a foto aparece dentro do item aberto.
 */
export function CareAccordion({ steps }: { steps: CareStep[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <div className="grid border-y border-line lg:grid-cols-2">
      <ul className="lg:border-r lg:border-line">
        {steps.map((step, i) => {
          const isActive = i === active;
          const buttonId = `${baseId}-botao-${i}`;
          const panelId = `${baseId}-painel-${i}`;
          return (
            <li
              key={step.title}
              className={`border-b border-line transition-colors duration-500 ease-soft last:border-b-0 ${isActive ? "bg-leaf" : ""}`}
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center justify-between gap-6 px-5 py-7 text-left md:px-10 md:py-9 ${
                    isActive ? "cursor-default" : "transition-colors hover:bg-forest/[0.035]"
                  }`}
                >
                  <span className="text-h3">{step.title}</span>
                  <span
                    aria-hidden="true"
                    className={`grid size-9 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-500 ease-soft ${
                      isActive ? "rotate-45 bg-forest text-cream" : "bg-leaf text-forest"
                    }`}
                  >
                    <Plus className="size-4" strokeWidth={2} />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!isActive}
                className={`grid transition-[grid-template-rows] duration-500 ease-soft ${
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-8 md:px-10 md:pb-10">
                    <p className="max-w-[46ch] text-lg leading-relaxed text-forest/85">{step.description}</p>
                    {!step.confirmed && (
                      <p className="mt-4">
                        <PendingBadge />
                      </p>
                    )}
                    <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-card lg:hidden">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        fill
                        sizes="100vw"
                        style={{ objectPosition: step.image.position }}
                        className="object-cover"
                      />
                      <ProvisionalTag photo={step.image} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="hidden p-10 lg:block">
        <div className="relative h-full min-h-[540px] overflow-hidden rounded-media bg-mint">
          {steps.map((step, i) => (
            <Image
              key={step.title}
              src={step.image.src}
              alt={i === active ? step.image.alt : ""}
              aria-hidden={i !== active}
              fill
              sizes="(min-width: 1024px) 45vw, 1px"
              style={{ objectPosition: step.image.position }}
              className={`object-cover transition-[opacity,transform] duration-700 ease-soft ${
                i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
              }`}
            />
          ))}
          <ProvisionalTag photo={steps[active].image} />
        </div>
      </div>
    </div>
  );
}
