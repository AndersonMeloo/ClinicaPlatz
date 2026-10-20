import { clinic } from "@/config/clinic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Gallery } from "@/components/client/Gallery";

export function Space() {
  return (
    <section id="clinica" aria-labelledby="clinica-title" className="border-t border-line py-24 md:py-32">
      <Gallery
        items={clinic.gallery}
        heading={
          <SectionHeading
            id="clinica-title"
            eyebrow="A clínica"
            title="Um espaço feito para receber bem."
            intro="Recepção, consultório e farmácia da Platz Vet, em imagens dos vídeos e posts da própria clínica."
          />
        }
      />
    </section>
  );
}
