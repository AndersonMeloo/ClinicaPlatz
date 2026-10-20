import { MotionRoot } from "@/components/client/MotionRoot";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Care } from "@/components/sections/Care";
import { Space } from "@/components/sections/Space";
import { Faq, homeFaqItems } from "@/components/sections/Faq";
import { InstagramBand } from "@/components/sections/Footer";
import { clinicNode, faqNode, graph, peopleNodes, webPageNode, websiteNode } from "@/lib/structured-data";
import { servicePages } from "@/content/landing-pages";
import { clinic } from "@/config/clinic";
import { JsonLd } from "@/components/ui/JsonLd";

export default function HomePage() {
  const jsonLd = graph(
    clinicNode(servicePages),
    peopleNodes(),
    websiteNode(),
    webPageNode("/", `${clinic.descriptor} em Guarulhos | ${clinic.name}`, clinic.summary),
    faqNode("/", homeFaqItems()),
  );

  return (
    <>
      <main id="conteudo">
        <Hero />
        <Services />
        <About />
        <Care />
        <Space />
        <Faq />
        <InstagramBand />
      </main>
      <MotionRoot />
      <JsonLd data={jsonLd} />
    </>
  );
}
