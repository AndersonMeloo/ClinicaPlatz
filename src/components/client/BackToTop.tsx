"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Botão "voltar ao topo" com o progresso da rolagem (0–100%): anel em volta do
 * símbolo do logo e, no desktop, uma pílula com o texto, a porcentagem e uma
 * linha que se preenche. O progresso é escrito direto no DOM (sem re-render a
 * cada rolagem).
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100))) : 0;
        if (ringRef.current) ringRef.current.style.strokeDashoffset = String(100 - progress);
        if (barRef.current) barRef.current.style.transform = `scaleX(${progress / 100})`;
        if (textRef.current) textRef.current.textContent = `${progress}%`;
        setVisible(window.scrollY > 240);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      data-visible={visible}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className="group fixed right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-3 transition-[opacity,transform,visibility] duration-500 ease-soft data-[visible=false]:invisible data-[visible=false]:translate-y-3 data-[visible=false]:opacity-0 md:right-6 md:bottom-6"
    >
      <span className="hidden items-center gap-3 rounded-full bg-paper/90 py-2 pr-4 pl-4 text-forest shadow-[0_12px_30px_-16px_rgb(22_58_43/0.5)] ring-1 ring-line backdrop-blur-md md:flex">
        <span className="grid gap-1.5 text-left">
          <span className="flex items-baseline justify-between gap-4 text-xs font-semibold">
            Voltar ao topo
            <span ref={textRef} className="text-ink-muted tabular-nums">
              0%
            </span>
          </span>
          <span className="block h-[2px] w-full overflow-hidden rounded-full bg-forest/15">
            <span ref={barRef} className="block h-full origin-left scale-x-0 bg-sage" />
          </span>
        </span>
      </span>

      <span className="relative grid size-14 place-items-center rounded-full bg-paper shadow-[0_16px_32px_-14px_rgb(22_58_43/0.55)] transition-transform duration-300 group-hover:-translate-y-0.5 md:size-16">
        <svg viewBox="0 0 60 60" aria-hidden="true" className="absolute inset-0 size-full -rotate-90">
          <circle cx="30" cy="30" r="27" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-forest/10" />
          <circle
            ref={ringRef}
            cx="30"
            cy="30"
            r="27"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100"
            strokeDashoffset="100"
            className="text-sage"
          />
        </svg>
        <Image src="/images/logo-platz-simbolo.png" width={65} height={71} alt="" className="relative h-7 w-auto md:h-8" />
      </span>
      <span className="sr-only">Voltar ao topo da página</span>
    </button>
  );
}
