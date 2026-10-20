import Image from "next/image";
import { clinic } from "@/config/clinic";

/**
 * Tela de abertura (≈1,6 s), exibida a cada carregamento completo da página.
 * Fica oculta por padrão; o script do <head> adiciona html.intro-on quando deve
 * aparecer. A animação e a saída são 100% CSS, então a tela some sozinha mesmo
 * se o JavaScript da página falhar. É decorativa (aria-hidden): o conteúdo
 * real já está carregado por baixo.
 */
export function IntroScreen() {
  const letters = [...clinic.name];

  return (
    <div aria-hidden="true" className="intro-screen">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/images/logo-platz-claro-simbolo.png"
          width={65}
          height={71}
          alt=""
          priority
          className="intro-mark h-16 w-auto"
        />
        <p className="mt-5 flex font-[family-name:var(--font-cormorant)] text-[clamp(3.5rem,12vw,6.5rem)] leading-none font-medium tracking-[0.01em] text-cream">
          {letters.map((letter, i) => (
            <span key={i} className="intro-letter" style={{ "--i": i } as React.CSSProperties}>
              {letter === " " ? " " : letter}
            </span>
          ))}
        </p>
        <p className="intro-sub mt-3 text-[0.72rem] font-bold tracking-[0.32em] text-leaf uppercase">
          {clinic.descriptor}
        </p>
        {clinic.vet.name && (
          <p className="intro-sign mt-6 flex items-center gap-3 font-[family-name:var(--font-cormorant)] text-xl text-cream/80 italic">
            <span className="intro-rule h-px w-8 bg-leaf/60" />
            Dr. {clinic.vet.name}
            <span className="intro-rule h-px w-8 bg-leaf/60" />
          </p>
        )}
      </div>
    </div>
  );
}
