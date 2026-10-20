import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Fraunces, Manrope } from "next/font/google";
import { clinic } from "@/config/clinic";
import { BRAND_SUFFIX, seo } from "@/content/seo";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { IntroScreen } from "@/components/ui/IntroScreen";
import { BackToTop } from "@/components/client/BackToTop";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

// Usada só na tela de abertura.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = `${seo["/"].title}${BRAND_SUFFIX}`;
const description = seo["/"].description;

export const metadata: Metadata = {
  metadataBase: new URL(clinic.siteUrl),
  title: { default: title, template: `%s | ${clinic.name}` },
  description,
  keywords: seo["/"].keywords,
  applicationName: clinic.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: clinic.name,
    title,
    description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `Fachada da ${clinic.name}` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e6",
};

// Roda antes da primeira pintura: habilita os estados iniciais das animações
// apenas com JS ativo e sem preferência por movimento reduzido. Se o JS da
// página não carregar em 3 s, a classe é removida e o conteúdo aparece.
// A tela de abertura (html.intro-on) aparece a cada carregamento completo da
// página (entrada, F5); navegar pelos links não recarrega, então não repete.
// É removida após 2,1 s; a própria animação CSS já a esconde em 2 s.
const motionBootstrap = `(function(){try{var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('js-anim');setTimeout(function(){if(!window.__platzMotion)d.classList.remove('js-anim')},3000);d.classList.add('intro-on');setTimeout(function(){d.classList.remove('intro-on')},2100);}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${manrope.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body>
        <IntroScreen />
        <a
          href="#conteudo"
          className="sr-only z-[60] rounded-full bg-forest px-5 py-3 font-semibold text-cream focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Pular para o conteúdo
        </a>
        {children}
        <WhatsAppFab />
        <BackToTop />
      </body>
    </html>
  );
}
