"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Photo } from "@/config/clinic";

export interface FilterCategory {
  id: string;
  label: string;
  color: string;
}

export interface FilterItem {
  path: string;
  title: string;
  description: string;
  image: Photo;
  category: string;
}

/**
 * Lista de páginas com filtro por categoria. Sem JavaScript, todas as páginas
 * aparecem (o HTML do servidor já vem com "Todos").
 */
export function PageFilter({ items, categories }: { items: FilterItem[]; categories: FilterCategory[] }) {
  const [active, setActive] = useState("todos");
  const byId = Object.fromEntries(categories.map((c) => [c.id, c]));
  const visible = active === "todos" ? items : items.filter((item) => item.category === active);
  const options = [
    { id: "todos", label: "Todos", color: "", count: items.length },
    ...categories
      .map((c) => ({ ...c, count: items.filter((item) => item.category === c.id).length }))
      .filter((c) => c.count > 0),
  ];

  return (
    <div>
      <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const pressed = option.id === active;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(option.id)}
              className={`inline-flex h-11 items-center gap-2.5 rounded-full px-5 text-[0.95rem] font-semibold transition-colors duration-300 ${
                pressed
                  ? "bg-forest text-cream"
                  : "bg-paper text-forest shadow-[0_8px_24px_-18px_rgb(22_58_43/0.5)] ring-1 ring-line hover:ring-forest/30"
              }`}
            >
              {option.color && (
                <span aria-hidden="true" className="size-2.5 rounded-full" style={{ backgroundColor: option.color }} />
              )}
              {option.label}
              <span className={`text-sm tabular-nums ${pressed ? "text-leaf" : "text-ink-muted"}`}>{option.count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {visible.length === 1 ? "1 página" : `${visible.length} páginas`}
      </p>

      <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => {
          const category = byId[item.category];
          return (
            <li key={item.path} className="animate-fade-up">
              <Link href={item.path} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-mint">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    style={{ objectPosition: item.image.position }}
                    className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
                  />
                </div>
                {category && (
                  <p className="mt-5 flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-ink-muted uppercase">
                    <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: category.color }} />
                    {category.label}
                  </p>
                )}
                <h2 className="mt-2 flex items-center justify-between gap-4 font-display text-[1.7rem] leading-tight">
                  {item.title}
                  <ArrowRight
                    className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </h2>
                <p className="mt-2 leading-relaxed text-ink-muted">{item.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
