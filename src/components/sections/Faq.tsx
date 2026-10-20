import { Plus } from "lucide-react";
import type { ReactNode } from "react";
import { clinic, type FaqItem } from "@/config/clinic";
import { formatHours } from "@/lib/hours";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PendingBadge, PendingText } from "@/components/ui/Placeholder";

/** Itens exibidos na home (inclui o horário, gerado da configuração). */
export function homeFaqItems(): FaqItem[] {
  const hoursItem: FaqItem = {
    question: "Qual é o horário de funcionamento?",
    answer: clinic.hours
      ? formatHours(clinic.hours)
          .map((h) => `${h.days}: ${h.time}`)
          .join(". ") + "."
      : null,
    confirmed: Boolean(clinic.hours),
  };
  return [...clinic.faq, hoursItem].filter((item) => item.answer || clinic.showPlaceholderNotes);
}

const whatsappLink = (
  <>
    Não encontrou sua dúvida?{" "}
    <a
      href={buildWhatsAppUrl(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-forest underline decoration-forest/30 underline-offset-4 transition-colors hover:decoration-forest"
    >
      Fale com a gente no WhatsApp
    </a>
    .
  </>
);

export function FaqSection({
  id = "duvidas",
  eyebrow = "Dúvidas frequentes",
  title,
  items,
  intro = whatsappLink,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  items: FaqItem[];
  intro?: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} intro={intro} />
          </div>
        </div>

        <div className="border-t border-line lg:col-span-8" data-reveal-group>
          {items.map((item) => (
            <details key={item.question} name={id} className="faq-item group border-b border-line">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-7 transition-colors hover:text-sage md:py-8">
                <h3 className="text-h3">{item.question}</h3>
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-leaf text-forest transition-[transform,background-color,color] duration-500 ease-soft group-open:rotate-45 group-open:bg-forest group-open:text-cream"
                >
                  <Plus className="size-4" strokeWidth={2} />
                </span>
              </summary>
              <div className="flex flex-col items-start gap-3 pr-4 pb-8 text-lg leading-relaxed text-ink-muted md:pr-16">
                <p>{item.answer ?? <PendingText>Em breve</PendingText>}</p>
                {!item.confirmed && <PendingBadge />}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return <FaqSection title="Antes de agendar." items={homeFaqItems()} />;
}
