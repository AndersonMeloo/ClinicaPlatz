"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, SplitText, DrawSVGPlugin);

declare global {
  interface Window {
    __platzMotion?: boolean;
  }
}

const fontsReady = () =>
  Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 1200))]);

/**
 * Orquestra todas as animações da página a partir de atributos data-*,
 * mantendo as seções como Server Components:
 *  - [data-reveal]        entrada única ao rolar
 *  - [data-reveal-group]  filhos com stagger
 *  - [data-hero-*]        sequência de abertura (só desktop)
 *  - [data-signature]     traço desenhado (só desktop)
 * Os estados iniciais escondidos vêm do CSS e só existem com html.js-anim.
 */
export function MotionRoot() {
  useGSAP(() => {
    window.__platzMotion = true;
    const html = document.documentElement;
    // Sem .js-anim (movimento reduzido ou JS atrasado), nada é animado.
    if (!html.classList.contains("js-anim")) return;

    const mm = gsap.matchMedia();

    mm.add(
      { desktop: "(min-width: 48rem)", mobile: "(max-width: 47.99rem)", reduce: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { desktop, reduce } = context.conditions as { desktop: boolean; reduce: boolean };

        if (reduce) {
          gsap.set("[data-reveal], [data-reveal-group] > *, [data-hero-fade], [data-signature]", { opacity: 1 });
          gsap.set("[data-hero-title]", { visibility: "visible" });
          return;
        }

        const distance = desktop ? 28 : 14;

        // Entradas ao rolar: IntersectionObserver em vez de ScrollTrigger. Ele
        // verifica a visibilidade real a cada rolagem, sem posições calculadas
        // na montagem, que ficavam erradas na navegação entre páginas e
        // deixavam blocos invisíveis.
        const animations = new Map<Element, () => void>();
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
              observer.unobserve(entry.target);
              const animate = animations.get(entry.target);
              animations.delete(entry.target);
              if (animate) context.add(animate);
            });
          },
          { rootMargin: "0px 0px -10% 0px" },
        );
        const onEnter = (el: Element, animate: () => void) => {
          animations.set(el, animate);
          observer.observe(el);
        };

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.set(el, { opacity: 0, y: distance });
          onEnter(el, () =>
            gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", clearProps: "transform" }),
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          gsap.set(group.children, { opacity: 0, y: distance });
          onEnter(group, () =>
            gsap.to(group.children, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.07,
              clearProps: "transform",
            }),
          );
        });

        if (desktop) {
          // Traços desenhados ao entrar na tela (fora do hero).
          gsap.utils.toArray<SVGSVGElement>('[data-signature="scroll"]').forEach((svg) => {
            gsap.set(svg, { opacity: 1 });
            gsap.set(svg.querySelectorAll("path"), { drawSVG: "0%" });
            onEnter(svg, () =>
              gsap.to(svg.querySelectorAll("path"), { drawSVG: "100%", duration: 1.8, ease: "power2.inOut" }),
            );
          });
        }

        // Rede de segurança: nada fica invisível por muito tempo, mesmo se o
        // observador não disparar por algum motivo.
        const safety = setTimeout(() => {
          animations.forEach((animate, el) => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
              observer.unobserve(el);
              animations.delete(el);
              context.add(animate);
            }
          });
        }, 2500);

        const cleanup = () => {
          observer.disconnect();
          clearTimeout(safety);
        };

        if (!desktop) return cleanup;

        // Abertura do hero: título por linhas, depois texto, CTAs e traço.
        const title = document.querySelector<HTMLElement>("[data-hero-title]");
        if (!title) return cleanup;

        fontsReady().then(() =>
          context.add(() => {
            const split = SplitText.create(title, { type: "lines", mask: "lines", linesClass: "pb-[0.06em]" });
            gsap.set(title, { visibility: "visible" });

            gsap
              // Com a tela de abertura, o hero começa quando ela sai (1,6 s).
              .timeline({ defaults: { ease: "expo.out" }, delay: html.classList.contains("intro-on") ? 1.6 : 0 })
              .from(split.lines, { yPercent: 105, duration: 1.1, stagger: 0.1 })
              .fromTo(
                "[data-hero-fade]",
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", clearProps: "transform" },
                0.35,
              )
              .from("[data-hero-media]", { scale: 1.06, duration: 1.6, ease: "power2.out" }, 0)
              .set('[data-signature="load"]', { opacity: 1 }, 0.7)
              .fromTo(
                '[data-signature="load"] path',
                { drawSVG: "0%" },
                { drawSVG: "100%", duration: 1.6, ease: "power2.inOut" },
                0.7,
              );
          }),
        );

        return cleanup;
      },
    );

    return () => mm.revert();
  });

  return null;
}
