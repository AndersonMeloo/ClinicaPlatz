import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { clinic } from "@/config/clinic";
import { categories, findLanding, servicePages, type LandingPageContent } from "@/content/landing-pages";
import { bookingHref } from "@/lib/booking";
import { formatAddress } from "@/lib/hours";
import { buildWhatsAppUrl, defaultWhatsAppMessage, whatsappDisplay } from "@/lib/whatsapp";
import {
  breadcrumbNode,
  clinicNode,
  faqNode,
  graph,
  peopleNodes,
  serviceNode,
  webPageNode,
  websiteNode,
} from "@/lib/structured-data";
import { MotionRoot } from "@/components/client/MotionRoot";
import { Toc } from "@/components/client/Toc";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { JsonLd } from "@/components/ui/JsonLd";
import { BookingCta } from "@/components/sections/BookingCta";
import { FaqSection } from "@/components/sections/Faq";

export function landingTrail(page: LandingPageContent) {
  return [
    { name: "Início", path: "/" },
    ...(page.path.startsWith("/servicos/") ? [{ name: "Serviços", path: "/servicos" }] : []),
    { name: page.breadcrumb, path: page.path },
  ];
}

/** "Quando procurar o veterinário" → "quando-procurar-o-veterinario" */
const toId = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function readingMinutes(page: LandingPageContent) {
  const text = [
    page.intro,
    ...page.sections.flatMap((s) => [s.heading, ...(s.paragraphs ?? []), ...(s.list ?? [])]),
    ...page.faq.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T12:00:00Z`),
  );

function LocalCard() {
  const address = clinic.address ? formatAddress(clinic.address) : null;
  const whatsapp = whatsappDisplay();
  return (
    <div className="rounded-card bg-paper p-6 ring-1 ring-line">
      <p className="text-xs font-bold tracking-[0.14em] text-ink-muted uppercase">
        {clinic.name} · {clinic.address?.city}
      </p>
      {address && (
        <address className="mt-4 flex gap-3 leading-relaxed text-ink-muted not-italic">
          <MapPin className="mt-1 size-4 shrink-0 text-sage" aria-hidden="true" />
          <span>
            {address.line1}
            <br />
            {address.line2}
          </span>
        </address>
      )}
      {whatsapp && (
        <a
          href={buildWhatsAppUrl(defaultWhatsAppMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-3 font-semibold underline decoration-forest/25 underline-offset-4 hover:decoration-forest"
        >
          <WhatsAppIcon className="size-4 text-sage" />
          {whatsapp}
        </a>
      )}
      <Link
        href="/contato"
        className="group mt-5 inline-flex items-center gap-2 border-b border-forest pb-1 text-sm font-semibold"
      >
        Como chegar
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  );
}

/** Modelo das páginas de SEO local (serviços e Petlove), em formato de artigo. */
export function LandingPage({ page }: { page: LandingPageContent }) {
  const service = page.serviceId ? clinic.services.find((s) => s.id === page.serviceId) : undefined;
  const specialist = clinic.specialists.find((s) => s.serviceId === page.serviceId);
  const category = categories[page.category];
  const trail = landingTrail(page);
  const related = page.related.map(findLanding).filter((p): p is LandingPageContent => Boolean(p));
  const sections = page.sections.map((s) => ({ ...s, id: toId(s.heading) }));
  const toc = [...sections.map((s) => ({ id: s.id, label: s.heading })), { id: "perguntas", label: "Perguntas frequentes" }];

  const jsonLd = graph(
    clinicNode(servicePages),
    peopleNodes(),
    websiteNode(),
    {
      ...webPageNode(
        page.path,
        page.title,
        page.description,
        "WebPage",
        service ? `${clinic.siteUrl}${page.path}#servico` : undefined,
      ),
      dateModified: page.updatedAt,
      ...(page.reviewedBy ? { reviewedBy: { "@type": "Person", name: page.reviewedBy } } : {}),
    },
    service ? serviceNode(page) : null,
    breadcrumbNode(trail),
    faqNode(page.path, page.faq),
  );

  return (
    <>
      <main id="conteudo">
        <div className="container-x pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <article aria-labelledby="pagina-titulo" className="min-w-0 lg:col-span-8">
              <header data-reveal>
                <Breadcrumbs trail={trail} />
                <p className="mt-10 flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-ink-muted uppercase">
                  <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: category.color }} />
                  {category.label}
                </p>
                <h1 id="pagina-titulo" className="text-h1 mt-4 max-w-[18ch] text-balance">
                  {page.h1}
                </h1>
                <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-ink-muted">{page.intro}</p>
                <p className="mt-6 text-sm text-ink-muted">
                  {specialist && (
                    <>
                      Atendimento com <span className="font-semibold text-forest">{specialist.name}</span> ·{" "}
                    </>
                  )}
                  {page.reviewedBy && (
                    <>
                      Revisado por <span className="font-semibold text-forest">{page.reviewedBy}</span> ·{" "}
                    </>
                  )}
                  Atualizado em <time dateTime={page.updatedAt}>{formatDate(page.updatedAt)}</time> ·{" "}
                  {readingMinutes(page)} min de leitura
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={bookingHref(page.serviceId)} className={buttonClass("primary")}>
                    <WhatsAppIcon className="size-[1.15rem]" />
                    Agendar pelo WhatsApp
                  </Link>
                  <ButtonLink
                    href={buildWhatsAppUrl(defaultWhatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                  >
                    Tirar dúvidas
                  </ButtonLink>
                </div>
              </header>

              <figure className="mt-12" data-reveal>
                <div className="relative aspect-[16/9] overflow-hidden rounded-media bg-mint">
                  <Image
                    src={page.cover.src}
                    alt={page.cover.alt || page.image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    style={{ objectPosition: page.cover.position }}
                    className="object-cover"
                  />
                </div>
              </figure>

              <div className="mt-16 grid gap-14">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} aria-labelledby={`${section.id}-titulo`} data-reveal>
                    <h2
                      id={`${section.id}-titulo`}
                      className="font-display text-[clamp(1.75rem,1.35rem+1.3vw,2.5rem)] leading-[1.1] tracking-[-0.018em] text-balance"
                    >
                      {section.heading}
                    </h2>
                    {section.list && (
                      <ul className="mt-6 grid gap-3">
                        {section.list.map((item) => (
                          <li key={item} className="flex gap-3 text-lg leading-relaxed text-ink-muted">
                            <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-leaf text-forest">
                              <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="mt-5 max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}
                {/* <p className="text-sm text-ink-muted italic">
                  Conteúdo informativo. Ele não substitui a avaliação do médico-veterinário.
                </p> */}
              </div>

              <div className="mt-14 lg:hidden">
                <LocalCard />
              </div>
            </article>

            <aside className="hidden lg:col-span-4 lg:block" aria-label="Navegação da página e contato">
              <div className="sticky top-28 grid gap-6">
                <Toc items={toc} />
                <LocalCard />
              </div>
            </aside>
          </div>
        </div>

        <FaqSection
          id="perguntas"
          eyebrow="Perguntas frequentes"
          title={`Dúvidas sobre ${page.breadcrumb.toLowerCase()}.`}
          items={page.faq.map((item) => ({ ...item, confirmed: true }))}
        />

        {related.length > 0 && (
          <section aria-labelledby="relacionados-title" className="border-t border-line py-20 md:py-28">
            <div className="container-x">
              <h2 id="relacionados-title" className="text-h2" data-reveal>
                Veja também
              </h2>
              <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
                {related.map((item) => (
                  <li key={item.path}>
                    <Link href={item.path} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-mint">
                        <Image
                          src={item.image.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                          style={{ objectPosition: item.image.position }}
                          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
                        />
                      </div>
                      <p className="mt-5 flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-ink-muted uppercase">
                        <span
                          aria-hidden="true"
                          className="size-2 rounded-full"
                          style={{ backgroundColor: categories[item.category].color }}
                        />
                        {categories[item.category].label}
                      </p>
                      <p className="mt-2 flex items-center justify-between gap-4 font-display text-[1.6rem] leading-tight">
                        {item.h1}
                        <ArrowRight
                          className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </p>
                      <p className="mt-2 leading-relaxed text-ink-muted">{item.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <BookingCta
          serviceId={page.serviceId}
          title="O seu pet precisa de atendimento?"
          text="Conte o que está acontecendo com o seu pet e envie pelo WhatsApp. O veterinário responde e combina o horário com você."
        />
      </main>
      <MotionRoot />
      <JsonLd data={jsonLd} />
    </>
  );
}
