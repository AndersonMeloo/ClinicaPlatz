"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clinic, isActivePath, navigation } from "@/config/clinic";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buildWhatsAppUrl, consultationWhatsAppMessage } from "@/lib/whatsapp";
import { MobileMenu } from "./MobileMenu";

/**
 * Desktop (≥1024 px): barra com navegação e CTA. Celular e tablet: só o logo
 * (em um cartão claro no topo da página) e o botão "Menu".
 * Ao rolar, o topo ganha fundo completo em todos os tamanhos de tela.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="group fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 data-[scrolled=true]:bg-cream/95 data-[scrolled=true]:shadow-[0_1px_0_var(--color-line)] data-[scrolled=true]:backdrop-blur-md"
    >
      <div className="container-x flex h-20 items-center justify-between gap-6 transition-[height] duration-500 ease-soft group-data-[scrolled=true]:h-16">
        <Link
          href="/#inicio"
          aria-label={`${clinic.name}, ir para o início`}
          className="rounded-2xl bg-paper px-3 py-2 shadow-[0_12px_30px_-14px_rgb(22_58_43/0.45)] transition-[background-color,box-shadow] duration-500 group-data-[scrolled=true]:bg-transparent group-data-[scrolled=true]:shadow-none lg:bg-transparent lg:p-0 lg:shadow-none"
        >
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.92rem] font-medium">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActivePath(item.href, pathname) ? "page" : undefined}
                  className="relative py-1 aria-[current=page]:after:scale-x-100 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-soft hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={buildWhatsAppUrl(consultationWhatsAppMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta inline-flex h-10 items-center gap-2 rounded-full border border-forest/20 bg-paper/70 pr-3.5 pl-3 text-sm font-semibold whitespace-nowrap transition-[background-color,border-color] duration-300 ease-soft hover:border-forest/50 hover:bg-paper max-lg:hidden"
        >
          <WhatsAppIcon className="size-4 text-sage" />
          Agendar pelo WhatsApp
          <ArrowRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-300 ease-soft group-hover/cta:translate-x-0.5"
          />
          <span className="sr-only">(abre em nova aba)</span>
        </a>

        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
