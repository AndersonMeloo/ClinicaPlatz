"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

/** Índice "Nesta página" que destaca a seção visível durante a rolagem. */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
        const current = items.find((item) => visible.get(item.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Nesta página"
      className="rounded-card bg-paper p-6 shadow-[0_24px_50px_-32px_rgb(22_58_43/0.35)] ring-1 ring-line"
    >
      <p className="text-xs font-bold tracking-[0.14em] text-ink-muted uppercase">Nesta página</p>
      <ol className="mt-4 grid gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className="block rounded-lg px-3 py-2 text-[0.95rem] leading-snug text-ink-muted transition-colors hover:text-forest aria-[current=location]:bg-mint aria-[current=location]:font-semibold aria-[current=location]:text-forest"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
