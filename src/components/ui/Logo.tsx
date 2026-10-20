import Image from "next/image";
import { clinic } from "@/config/clinic";

/**
 * Assinatura provisória: símbolo extraído do logo do Instagram (150 px) + nome
 * em texto. Trocar pelo arquivo vetorial oficial quando a clínica enviar.
 */
export function Logo({ tone = "dark", size = "md" }: { tone?: "dark" | "light"; size?: "md" | "lg" }) {
  const light = tone === "light";
  const large = size === "lg";
  return (
    <span className="flex items-center gap-3 whitespace-nowrap">
      <Image
        src={light ? "/images/logo-platz-claro-simbolo.png" : "/images/logo-platz-simbolo.png"}
        width={65}
        height={71}
        alt=""
        className={large ? "h-14 w-auto" : "h-8 w-auto lg:h-10"}
        priority={!light}
      />
      <span className="leading-none">
        <span
          className={`block font-display font-semibold tracking-[-0.01em] ${large ? "text-[2rem]" : "text-[1.2rem] lg:text-[1.45rem]"}`}
        >
          {clinic.name}
        </span>
        <span
          className={`mt-1 block font-bold tracking-[0.24em] uppercase ${large ? "text-[0.6rem]" : "text-[0.5rem] lg:text-[0.6rem]"} ${light ? "text-leaf" : "text-sage"}`}
        >
          {clinic.descriptor}
        </span>
      </span>
    </span>
  );
}
