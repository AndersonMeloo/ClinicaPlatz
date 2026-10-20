import { clinic } from "@/config/clinic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CareAccordion } from "@/components/client/CareAccordion";

export function Care() {
  return (
    <section id="atendimento" aria-labelledby="atendimento-title" className="border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="atendimento-title"
          layout="split"
          eyebrow="Como é o atendimento"
          title="Do primeiro contato à consulta, sem complicação."
          intro="Como funciona a experiência na clínica, do pedido de horário até o atendimento."
        />
      </div>
      <div className="mt-14 lg:container-x" data-reveal>
        <CareAccordion steps={clinic.careSteps} />
      </div>
    </section>
  );
}
