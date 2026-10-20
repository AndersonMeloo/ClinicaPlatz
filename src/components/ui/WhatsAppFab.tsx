import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

/**
 * Botão flutuante do WhatsApp, fixo em todas as páginas. Duas ondas de pulso
 * alternadas mantêm o botão em evidência; com movimento reduzido, fica parado.
 */
export function WhatsAppFab() {
  return (
    <a
      href={buildWhatsAppUrl(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+4.25rem)] z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_0_0_6px_rgb(37_211_102/0.22),0_16px_32px_-12px_rgb(0_0_0/0.4)] transition-transform duration-300 ease-soft hover:scale-105 active:scale-95 md:right-6 md:bottom-[6.25rem] md:size-16"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25d366] motion-safe:animate-[wa-pulse_2.4s_ease-out_infinite]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25d366] motion-safe:animate-[wa-pulse_2.4s_ease-out_1.2s_infinite]"
      />
      <WhatsAppIcon className="relative size-7 md:size-8" />
      <span className="sr-only">Conversar com a Platz Vet no WhatsApp (abre em nova aba)</span>
    </a>
  );
}
