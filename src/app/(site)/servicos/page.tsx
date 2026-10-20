import type { Metadata } from "next";
import { clinic } from "@/config/clinic";
import { pageMetadata, seo } from "@/content/seo";
import { categories, landingPages, servicePages } from "@/content/landing-pages";
import { breadcrumbNode, clinicNode, graph, peopleNodes, webPageNode, websiteNode } from "@/lib/structured-data";
import { MotionRoot } from "@/components/client/MotionRoot";
import { PageFilter } from "@/components/client/PageFilter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { BookingCta } from "@/components/sections/BookingCta";

const { title, description } = seo["/servicos"];

export const metadata: Metadata = pageMetadata("/servicos");

export default function ServicesHubPage() {
  const trail = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
  ];
  const jsonLd = graph(
    clinicNode(servicePages),
    peopleNodes(),
    websiteNode(),
    {
      ...webPageNode("/servicos", title, description, "CollectionPage"),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: landingPages.map((page, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: page.h1,
          url: `${clinic.siteUrl}${page.path}`,
        })),
      },
    },
    breadcrumbNode(trail),
  );

  return (
    <>
      <main id="conteudo">
        <section aria-labelledby="pagina-titulo" className="pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="container-x" data-reveal>
            <Breadcrumbs trail={trail} />
            <div className="mt-10 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="lg:col-span-7">
                <p className="eyebrow flex items-center gap-3 text-sage">
                  <span aria-hidden="true" className="h-px w-8 bg-current" />
                  {clinic.name}
                </p>
                <h1 id="pagina-titulo" className="text-h1 mt-5 max-w-[16ch] text-balance">
                  Serviços veterinários em Guarulhos
                </h1>
              </div>
              <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-muted lg:col-span-4 lg:col-start-9 lg:mt-0 lg:pb-2">
                Consultas, exames, vacinação, hidratação e farmácia veterinária para cães, gatos e pets não
                convencionais, no Continental 2. Filtre por categoria e escolha um serviço para saber mais.
              </p>
            </div>
          </div>
        </section>

        <section aria-label="Páginas de serviços" className="pb-20 md:pb-28">
          <div className="container-x" data-reveal>
            <PageFilter
              categories={Object.entries(categories).map(([id, c]) => ({ id, label: c.label, color: c.color }))}
              items={landingPages.map((page) => ({
                path: page.path,
                title: page.h1,
                description: page.description,
                image: page.image,
                category: page.category,
              }))}
            />
          </div>
        </section>

        <BookingCta
          title="Já sabe o que o seu pet precisa?"
          text="Preencha um formulário rápido e o WhatsApp abre com a sua mensagem pronta. A clínica confirma o horário."
        />
      </main>
      <MotionRoot />
      <JsonLd data={jsonLd} />
    </>
  );
}
