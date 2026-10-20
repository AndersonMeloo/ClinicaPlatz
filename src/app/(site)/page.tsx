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
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata, seo } from "@/content/seo";

export const metadata = pageMetadata("/");

export default function HomePage() {
  const jsonLd = graph(
    clinicNode(servicePages),
    peopleNodes(),
    websiteNode(),
    webPageNode("/", seo["/"].title, seo["/"].description),
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
