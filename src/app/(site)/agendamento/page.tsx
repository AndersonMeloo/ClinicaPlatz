import type { Metadata } from "next";
import { clinic } from "@/config/clinic";
import { pageMetadata, seo } from "@/content/seo";
import { servicePages } from "@/content/landing-pages";
import { breadcrumbNode, clinicNode, faqNode, graph, peopleNodes, webPageNode, websiteNode } from "@/lib/structured-data";
import { MotionRoot } from "@/components/client/MotionRoot";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Booking } from "@/components/sections/Booking";
import { FaqSection } from "@/components/sections/Faq";

const city = clinic.address?.city ?? "Guarulhos";
const { title, description } = seo["/agendamento"];

export const metadata: Metadata = pageMetadata("/agendamento");

/** Página de agendamento. Aceita /agendamento?servico=<id> para abrir com o serviço escolhido. */
export default function BookingPage() {
  const trail = [
    { name: "Início", path: "/" },
    { name: "Agendamento", path: "/agendamento" },
  ];
  const faq = clinic.faq.filter((item) => item.answer).slice(0, 3);
  const jsonLd = graph(
    clinicNode(servicePages),
    peopleNodes(),
    websiteNode(),
    webPageNode("/agendamento", title, description),
    breadcrumbNode(trail),
    faqNode("/agendamento", faq),
  );

  return (
    <>
      <main id="conteudo">
        <section aria-labelledby="pagina-titulo" className="pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container-x" data-reveal>
            <Breadcrumbs trail={trail} />
            <div className="mt-10 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="lg:col-span-7">
                <p className="eyebrow flex items-center gap-3 text-sage">
                  <span aria-hidden="true" className="h-px w-8 bg-current" />
                  Agendamento · {city}
                </p>
                <h1 id="pagina-titulo" className="text-h1 mt-5 max-w-[14ch] text-balance">
                  Agende o atendimento do seu pet.
                </h1>
              </div>
              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-muted lg:col-span-4 lg:col-start-9 lg:mt-0 lg:pb-2">
                Atendimento para cães, gatos e pets não convencionais na {clinic.name}. Você monta o pedido aqui, envia
                pelo WhatsApp e a clínica confirma o horário.
              </p>
            </div>
          </div>
        </section>

        <Booking />

        <FaqSection id="duvidas-agendamento" title="Sobre o agendamento." items={faq} />
      </main>
      <MotionRoot />
      <JsonLd data={jsonLd} />
    </>
  );
}
