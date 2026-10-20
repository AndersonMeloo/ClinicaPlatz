"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowRight, X } from "lucide-react";
import { clinic, isActivePath, navigation } from "@/config/clinic";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

const items = navigation;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Menu de tela cheia (abaixo de 1024 px). Abre com um círculo que cresce a
 * partir do botão "Menu" e fecha encolhendo de volta para ele.
 * Usa <dialog> nativo: foco preso no menu, Esc fecha e o foco volta ao botão.
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const dialog = dialogRef.current;
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => mq.matches && dialog?.open && dialog.close();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      timeline.current?.kill();
    };
  }, []);

  /** Centro do botão e raio necessário para cobrir a tela inteira. */
  const origin = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 40;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    return { x, y, radius };
  };

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    timeline.current?.kill();
    dialog.showModal();
    // Foco no próprio menu (não no botão Fechar): evita o anel de foco no toque;
    // pelo teclado, Tab segue para os links e Esc fecha.
    dialog.focus();

    const parts = dialog.querySelectorAll("[data-menu-item]");
    const fades = dialog.querySelectorAll("[data-menu-fade]");

    if (prefersReducedMotion()) {
      gsap.set([dialog, parts, fades], { clearProps: "all" });
      return;
    }

    const { x, y, radius } = origin();
    timeline.current = gsap
      .timeline()
      .fromTo(
        dialog,
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { clipPath: `circle(${radius}px at ${x}px ${y}px)`, duration: 0.9, ease: "power3.inOut" },
      )
      .fromTo(
        parts,
        { yPercent: 70, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.07 },
        0.35,
      )
      .fromTo(fades, { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.08 }, 0.3);
  };

  const close = (afterClose?: () => void) => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    timeline.current?.kill();

    const finish = () => {
      dialog.close();
      gsap.set(dialog, { clearProps: "clipPath" });
      afterClose?.();
    };

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    const { x, y } = origin();
    timeline.current = gsap
      .timeline({ onComplete: finish })
      .to(dialog.querySelectorAll("[data-menu-item], [data-menu-fade]"), { opacity: 0, duration: 0.2 })
      .to(dialog, { clipPath: `circle(0px at ${x}px ${y}px)`, duration: 0.65, ease: "power3.inOut" }, 0.05);
  };

  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const [path, id] = href.split("#");
    close(() => {
      const target = (path || "/") === pathname && id ? document.getElementById(id) : null;
      if (target) {
        history.pushState(null, "", `#${id}`);
        target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      } else {
        router.push(href);
      }
    });
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-controls="menu-mobile"
        className="flex flex-col items-end gap-[5px] rounded-2xl px-3.5 py-2.5"
      >
        <span className="text-[0.72rem] leading-none font-bold tracking-[0.26em]">MENU</span>
        <span aria-hidden="true" className="mt-1 block h-[1.5px] w-8 bg-current" />
        <span aria-hidden="true" className="block h-[1.5px] w-8 bg-current" />
      </button>

      <dialog
        ref={dialogRef}
        tabIndex={-1}
        id="menu-mobile"
        aria-label="Menu"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        className="menu-sheet on-dark outline-none fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-[#0b2219] p-0 text-cream backdrop:bg-transparent"
      >
        <div className="relative flex h-full flex-col overflow-y-auto">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_55%_at_95%_0%,rgb(183_204_152/0.2),transparent_65%)]"
          />

          <div className="container-x relative flex h-20 shrink-0 items-center justify-between">
            <p data-menu-fade className="text-[0.72rem] font-semibold tracking-[0.28em] text-cream/70 uppercase">
              Platz <span className="mx-2 text-leaf">/</span> Vet
            </p>
            <button
              type="button"
              onClick={() => close()}
              className="flex items-center gap-3 rounded-2xl px-1 py-2 text-[0.72rem] font-bold tracking-[0.24em] uppercase"
            >
              <span className="text-leaf">Fechar</span>
              <X className="size-8" strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Menu" className="container-x relative mt-[clamp(1.5rem,9vh,5rem)] flex-1">
            <ol>
              {items.map((item, i) => (
                <li key={item.href} data-menu-item className="border-b border-cream/10">
                  <Link
                    href={item.href}
                    aria-current={isActivePath(item.href, pathname) ? "page" : undefined}
                    onClick={(event) => navigate(event, item.href)}
                    className="group flex items-baseline gap-5 py-3.5"
                  >
                    <span className="w-6 shrink-0 text-xs font-bold text-leaf tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(2rem,9vw,2.75rem)] leading-[1.1] tracking-[-0.02em] transition-colors duration-300 group-hover:text-leaf">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div
            data-menu-fade
            className="container-x relative flex shrink-0 items-center justify-between gap-4 pt-8 pb-[max(1.75rem,env(safe-area-inset-bottom))] text-sm"
          >
            <a
              href={buildWhatsAppUrl(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-semibold"
            >
              Falar no WhatsApp
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <span className="text-cream/50">
              © {new Date().getFullYear()} {clinic.name}
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
