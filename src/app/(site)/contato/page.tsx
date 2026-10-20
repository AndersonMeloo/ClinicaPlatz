import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/config/clinic";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { breadcrumbNode, clinicNode, graph, peopleNodes, webPageNode, websiteNode } from "@/lib/structured-data";
import { servicePages } from "@/content/landing-pages";
import { pageMetadata, seo } from "@/content/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { MotionRoot } from "@/components/client/MotionRoot";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Location } from "@/components/sections/Location";
import { InstagramBand } from "@/components/sections/Footer";

const city = clinic.address?.city ?? "Guarulhos";

export const metadata: Metadata = pageMetadata("/contato");

export default function ContactPage() {
  const jsonLd = graph(
    clinicNode(servicePages),
    peopleNodes(),
    websiteNode(),
    webPageNode("/contato", seo["/contato"].title, seo["/contato"].description, "ContactPage"),
    breadcrumbNode([
      { name: "Início", path: "/" },
      { name: "Contato", path: "/contato" },
    ]),
  );

  return (
    <>
      <main id="conteudo">
        <section aria-labelledby="contato-pagina-titulo" className="pt-32 pb-20 md:pt-40 md:pb-24">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7" data-reveal>
              <p className="eyebrow flex items-center gap-3 text-sage">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                Contato
              </p>
              <h1 id="contato-pagina-titulo" className="text-display mt-6 max-w-[12ch] text-balance">
                Fale com a <em className="text-sage italic">{clinic.name}</em>.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pb-3" data-reveal>
              <p className="max-w-[40ch] text-lg leading-relaxed text-ink-muted">
                Tire dúvidas pelo WhatsApp, acompanhe a clínica no Instagram ou venha nos visitar em {city}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={buildWhatsAppUrl(defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-[1.15rem]" />
                  Falar no WhatsApp
                </ButtonLink>
                <Link href="/agendamento" className={buttonClass("outline")}>
                  Agendar consulta
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Location title={<>Clínica veterinária no Continental 2, em {city}.</>} />
        <InstagramBand />
      </main>
      <MotionRoot />
      <JsonLd data={jsonLd} />
    </>
  );
}
