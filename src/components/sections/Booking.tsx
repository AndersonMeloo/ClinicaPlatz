import { clinic } from "@/config/clinic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingForm } from "@/components/client/BookingForm";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buildWhatsAppUrl, defaultWhatsAppMessage, whatsappNumber } from "@/lib/whatsapp";

const steps = [
  {
    title: "Conte o que está acontecendo",
    text: "Informe os dados do seu pet e descreva os sintomas. Nada é enviado até você confirmar no WhatsApp.",
  },
  {
    title: "Envie pelo WhatsApp",
    text: "O WhatsApp abre com a mensagem pronta. Você pode revisar e completar antes de enviar.",
  },
  {
    title: "O veterinário responde",
    text: "Ele avalia o seu relato e combina com você o melhor horário para o atendimento.",
  },
];

export function Booking({ defaultReason, title }: { defaultReason?: string; title?: string } = {}) {
  const reasons = [...clinic.services.map((s) => s.name), "Outro motivo"];
  const serviceIds = Object.fromEntries(clinic.services.map((s) => [s.id, s.name]));

  return (
    <section
      id="agendar"
      aria-labelledby="agendar-title"
      className="on-dark relative bg-forest py-24 text-cream md:py-32"
    >
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            id="agendar-title"
            tone="dark"
            eyebrow="Consulta"
            title={title ?? "Conte o que o seu pet precisa."}
            intro="Sem cadastro e sem ligação. Você descreve o que está acontecendo, envia pelo WhatsApp e o veterinário responde."
          />

          <ol className="mt-12 border-t border-cream/15" data-reveal-group>
            {steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-2 border-b border-cream/15 py-6">
                <span className="font-display text-xl text-leaf">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-lg font-semibold">{step.title}</p>
                  <p className="mt-1 leading-relaxed text-cream/75">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <div className="rounded-[1.75rem] bg-paper p-6 text-forest shadow-[0_40px_80px_-40px_rgb(0_0_0/0.55)] sm:p-8 md:p-10">
            <h3 className="text-h3">Pedido de consulta</h3>
            <p className="mt-2 mb-8 text-ink-muted">Preencha os campos abaixo para montar a sua mensagem.</p>
            <BookingForm
              reasons={reasons}
              serviceIds={serviceIds}
              demoMode={!whatsappNumber() && clinic.showPlaceholderNotes}
              initialReason={defaultReason}
            />
            <noscript>
              <p className="mt-6 text-sm">
                Para usar o formulário, ative o JavaScript, ou{" "}
                <a href={buildWhatsAppUrl(defaultWhatsAppMessage)} className="inline-flex items-center gap-1 font-semibold underline">
                  <WhatsAppIcon className="size-4" /> fale direto pelo WhatsApp
                </a>
                .
              </p>
            </noscript>
          </div>
        </div>
      </div>
    </section>
  );
}
