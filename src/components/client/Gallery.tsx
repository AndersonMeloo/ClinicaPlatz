"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";
import type { GalleryItem } from "@/config/clinic";

/**
 * Galeria com rolagem horizontal nativa (scroll-snap): funciona com toque,
 * trackpad, teclado (faixa focável) e botões. Não há arrasto obrigatório.
 */
/**
 * Posições de parada da faixa: o início de cada foto, limitado ao fim da
 * rolagem. Quando as últimas fotos já cabem juntas na tela (telas largas),
 * elas viram uma única parada — o contador conta paradas, não fotos, e cada
 * clique sempre move a faixa, sem saltos e sem espaço vazio no fim.
 */
function scrollStops(track: HTMLElement): number[] {
  const slides = Array.from(track.children) as HTMLElement[];
  if (!slides.length) return [0];
  const max = track.scrollWidth - track.clientWidth;
  const stops: number[] = [];
  for (const slide of slides) {
    const stop = Math.min(slide.offsetLeft - slides[0].offsetLeft, max);
    if (!stops.length || stop - stops[stops.length - 1] > 8) stops.push(stop);
  }
  return stops;
}

export function Gallery({ items, heading }: { items: GalleryItem[]; heading: ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(items.length);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const stops = scrollStops(track);
    let nearest = 0;
    stops.forEach((stop, i) => {
      if (Math.abs(stop - track.scrollLeft) < Math.abs(stops[nearest] - track.scrollLeft)) nearest = i;
    });
    setCount(stops.length);
    setIndex(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onChange = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    onChange();
    track.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    return () => {
      track.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      cancelAnimationFrame(frame);
    };
  }, [measure]);

  const go = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const stops = scrollStops(track);
    const target = stops[Math.min(Math.max(index + direction, 0), stops.length - 1)];
    track.scrollTo({ left: target, behavior: "smooth" });
  };

  const atStart = index === 0;
  const atEnd = index >= count - 1;
  const total = String(count).padStart(2, "0");

  return (
    <div>
      <div className="container-x flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        {heading}
        <div className="flex items-center justify-end gap-4">
          <p className="mr-auto text-sm text-ink-muted md:hidden">Deslize para ver mais</p>
          <p className="font-medium tabular-nums" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
            <span className="text-ink-muted">/{total}</span>
          </p>
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={atStart}
            className="grid size-11 place-items-center rounded-full border border-forest/20 transition-colors hover:bg-forest hover:text-cream disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="sr-only">Foto anterior</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={atEnd}
            className="grid size-11 place-items-center rounded-full border border-forest/20 transition-colors hover:bg-forest hover:text-cream disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
            <span className="sr-only">Próxima foto</span>
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Fotos da clínica"
        data-reveal
        className="gallery-track no-scrollbar relative mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2"
      >
        {items.map((item) => (
          <li key={item.label} className="shrink-0 snap-start">
            <figure>
              {item.photo ? (
                <div
                  className={`relative h-[clamp(320px,36vw,470px)] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-card bg-mint ${
                    item.orientation === "landscape" ? "aspect-[1140/565]" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    fill
                    sizes={
                      item.orientation === "landscape" ? "(min-width: 768px) 70vw, 100vw" : "(min-width: 768px) 30vw, 75vw"
                    }
                    style={{ objectPosition: item.photo.position }}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-[clamp(320px,36vw,470px)] aspect-[3/4] flex-col justify-between rounded-card border border-dashed border-sage/45 bg-mint p-6">
                  <Camera className="size-6 text-sage" strokeWidth={1.6} aria-hidden="true" />
                  <p className="font-display text-[1.7rem] leading-none">{item.label}</p>
                </div>
              )}
              <figcaption className="mt-4 max-w-[34ch] text-sm leading-relaxed">
                {item.photo && <span className="font-semibold">{item.label} · </span>}
                <span className="text-ink-muted">{item.caption}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
