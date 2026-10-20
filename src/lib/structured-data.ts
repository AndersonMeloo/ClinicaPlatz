import { clinic } from "@/config/clinic";
import { whatsappNumber } from "@/lib/whatsapp";
import type { LandingPageContent } from "@/content/landing-pages";

/**
 * Grafo de entidades schema.org (SEO semântico). Todas as páginas descrevem a
 * mesma clínica pelo mesmo @id, e cada página acrescenta as entidades dela
 * (serviço, perguntas, trilha de navegação). Só entram dados reais.
 */

type Node = Record<string, unknown>;

const SCHEMA_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const url = (path = "/") => `${clinic.siteUrl}${path === "/" ? "/" : path}`;
const slug = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
const specialistId = (name: string) => url(`/#${slug(name)}`);
export const ids = {
  clinic: url("/#clinica"),
  person: url("/#gustavo-platz-boccia"),
  website: url("/#website"),
};

const guarulhos = { "@type": "City", name: "Guarulhos", sameAs: "https://pt.wikipedia.org/wiki/Guarulhos" };

export function clinicNode(servicePages: LandingPageContent[] = []): Node | null {
  const { address, hours } = clinic;
  const whatsapp = whatsappNumber();
  const telephone = clinic.phone ?? (whatsapp ? `+${whatsapp}` : null);
  if (!address || !telephone) return null;

  return {
    "@type": "VeterinaryCare",
    "@id": ids.clinic,
    name: clinic.name,
    alternateName: `${clinic.name} ${clinic.descriptor}`,
    slogan: clinic.tagline,
    description: clinic.summary,
    url: url(),
    image: url("/og-image.jpg"),
    logo: url("/images/logo-platz.png"),
    telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street}, ${address.number}${address.complement ? `, ${address.complement}` : ""}`,
      addressLocality: address.city,
      addressRegion: address.state,
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
      addressCountry: "BR",
    },
    areaServed: guarulhos,
    ...(clinic.vet.name ? { founder: { "@id": ids.person } } : {}),
    employee: [
      ...(clinic.vet.name ? [{ "@id": ids.person }] : []),
      ...clinic.specialists.map((s) => ({ "@id": specialistId(s.name) })),
    ],
    ...(hours
      ? {
          openingHoursSpecification: hours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days.map((d) => SCHEMA_DAYS[d]),
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    ...(servicePages.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Serviços veterinários",
            itemListElement: servicePages.map((page) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: page.breadcrumb, url: url(page.path) },
            })),
          },
        }
      : {}),
    ...(clinic.social.instagram ? { sameAs: [clinic.social.instagram] } : {}),
  };
}

/** Profissionais da clínica: o fundador e os demais veterinários. */
export function peopleNodes(): Node[] {
  const founder: Node[] = clinic.vet.name
    ? [
        {
          "@type": "Person",
          "@id": ids.person,
          name: clinic.vet.name,
          jobTitle: "Médico-veterinário",
          description: clinic.vet.title,
          worksFor: { "@id": ids.clinic },
        },
      ]
    : [];
  const team = clinic.specialists.map((s) => {
    const page = clinic.services.find((service) => service.id === s.serviceId);
    return {
      "@type": "Person",
      "@id": specialistId(s.name),
      name: s.name,
      jobTitle: "Médica-veterinária",
      description: s.title,
      worksFor: { "@id": ids.clinic },
      ...(page ? { knowsAbout: page.name } : {}),
    };
  });
  return [...founder, ...team];
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: url(),
    name: clinic.name,
    inLanguage: "pt-BR",
    publisher: { "@id": ids.clinic },
  };
}

export function serviceNode(page: LandingPageContent): Node {
  return {
    "@type": "Service",
    "@id": url(`${page.path}#servico`),
    name: page.h1,
    serviceType: page.breadcrumb,
    description: page.description,
    url: url(page.path),
    provider: { "@id": ids.clinic },
    areaServed: guarulhos,
    audience: { "@type": "PeopleAudience", audienceType: "Tutores de animais de estimação" },
    keywords: page.entities.join(", "),
  };
}

export function webPageNode(path: string, name: string, description: string, type = "WebPage", about?: string): Node {
  return {
    "@type": type,
    "@id": url(`${path}#pagina`),
    url: url(path),
    name,
    description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": ids.website },
    about: { "@id": about ?? ids.clinic },
  };
}

export function breadcrumbNode(trail: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": url(`${trail[trail.length - 1].path}#trilha`),
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: url(item.path),
    })),
  };
}

export function faqNode(path: string, items: { question: string; answer: string | null }[]): Node | null {
  const answered = items.filter((i): i is { question: string; answer: string } => Boolean(i.answer));
  if (!answered.length) return null;
  return {
    "@type": "FAQPage",
    "@id": url(`${path}#perguntas`),
    mainEntity: answered.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

export function graph(...nodes: (Node | Node[] | null)[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes.flat().filter(Boolean) };
}
