import type { Metadata } from "next";

/**
 * Metadados de SEO de todas as páginas: fonte única.
 *
 * Regras (verificadas por `npm run seo:check`):
 *  - title: sem o nome da marca (o layout acrescenta " | Platz Vet"); o
 *    título completo deve ter no máximo 60 caracteres;
 *  - description: no máximo 140 caracteres;
 *  - keywords: exatamente 5 palavras-chave.
 *
 * O conteúdo completo, em tabela, fica em docs/seo-metadados.md.
 */

export interface PageSeo {
  title: string;
  description: string;
  keywords: [string, string, string, string, string];
}

export const BRAND_SUFFIX = " | Platz Vet";

export const seo = {
  "/": {
    title: "Clínica Veterinária em Guarulhos",
    description:
      "Clínica veterinária em Guarulhos para cães, gatos e pets não convencionais. Consultas, exames, vacinas e farmácia. Agende no WhatsApp.",
    keywords: [
      "clínica veterinária em guarulhos",
      "veterinário guarulhos",
      "clínica veterinária guarulhos",
      "veterinário continental guarulhos",
      "platz vet",
    ],
  },
  "/servicos": {
    title: "Serviços Veterinários em Guarulhos",
    description:
      "Consulta, exames, vacinação, hidratação, farmácia e pets não convencionais em Guarulhos. Conheça os serviços da Platz Vet e agende.",
    keywords: [
      "serviços veterinários em guarulhos",
      "consulta veterinária guarulhos",
      "vacinação guarulhos",
      "exames veterinários guarulhos",
      "farmácia veterinária guarulhos",
    ],
  },
  "/servicos/consulta-veterinaria": {
    title: "Consulta Veterinária em Guarulhos",
    description:
      "Consulta veterinária em Guarulhos na Platz Vet: avaliação do seu pet e orientação sobre os cuidados. Agende pelo WhatsApp.",
    keywords: [
      "consulta veterinária em guarulhos",
      "veterinário guarulhos",
      "consulta veterinária continental",
      "check-up veterinário guarulhos",
      "clínica veterinária guarulhos",
    ],
  },
  "/servicos/pets-nao-convencionais": {
    title: "Veterinário de Pets Não Convencionais",
    description:
      "Atendimento de roedores, aves, répteis e animais silvestres em Guarulhos com a veterinária Letícia Amaro. Agende na Platz Vet.",
    keywords: [
      "veterinário de pets não convencionais",
      "veterinário de animais silvestres guarulhos",
      "veterinário de aves guarulhos",
      "veterinário de répteis guarulhos",
      "veterinário de roedores guarulhos",
    ],
  },
  "/servicos/vacinacao": {
    title: "Vacina para Cachorro em Guarulhos",
    description:
      "Vacinação para cães em Guarulhos, com calendário orientado pelo veterinário do filhote ao reforço anual. Agende na Platz Vet.",
    keywords: [
      "vacina para cachorro em guarulhos",
      "vacinação em guarulhos",
      "vacinação de filhotes guarulhos",
      "reforço de vacina para cachorro",
      "calendário de vacinação cachorro",
    ],
  },
  "/servicos/exames-veterinarios": {
    title: "Exames Veterinários em Guarulhos",
    description:
      "Exames veterinários em Guarulhos, como exame de sangue para cachorro, para apoiar o diagnóstico do seu pet. Agende na Platz Vet.",
    keywords: [
      "exames veterinários em guarulhos",
      "exame de sangue para cachorro",
      "hemograma cachorro guarulhos",
      "check-up veterinário",
      "exames para pets guarulhos",
    ],
  },
  "/servicos/hidratacao": {
    title: "Hidratação para Cachorro em Guarulhos",
    description:
      "Hidratação para cachorro em Guarulhos com avaliação do veterinário. Saiba os sinais de desidratação e agende na Platz Vet.",
    keywords: [
      "hidratação para cachorro em guarulhos",
      "cachorro desidratado",
      "soro para cachorro",
      "fluidoterapia em cães",
      "gato desidratado",
    ],
  },
  "/servicos/farmacia-veterinaria": {
    title: "Farmácia Veterinária em Guarulhos",
    description:
      "Farmácia veterinária em Guarulhos dentro da Platz Vet: medicamentos e cuidados para o seu pet, com orientação do veterinário.",
    keywords: [
      "farmácia veterinária em guarulhos",
      "remédio para cachorro guarulhos",
      "medicamentos veterinários",
      "farmácia pet continental guarulhos",
      "farmácia veterinária perto de mim",
    ],
  },
  "/petlove": {
    title: "Atendimento Petlove em Guarulhos",
    description:
      "A Platz Vet atende clientes Petlove em Guarulhos. Veja como agendar pelo WhatsApp e os serviços da clínica no Continental 2.",
    keywords: [
      "petlove guarulhos",
      "clínica veterinária petlove guarulhos",
      "plano de saúde pet guarulhos",
      "veterinário petlove",
      "rede credenciada petlove guarulhos",
    ],
  },
  "/consulta": {
    title: "Solicitar Consulta Veterinária em Guarulhos",
    description:
      "Conte o que o seu pet está sentindo e envie pelo WhatsApp: o veterinário da Platz Vet responde e combina o horário. Sem cadastro.",
    keywords: [
      "consulta veterinária pelo whatsapp",
      "agendar consulta veterinária guarulhos",
      "marcar veterinário guarulhos",
      "pedir consulta veterinária",
      "solicitar consulta veterinária",
    ],
  },
  "/contato": {
    title: "Contato: Clínica Veterinária no Continental 2",
    description:
      "Endereço, WhatsApp e mapa da Platz Vet, clínica veterinária na Rua José Pedro da Silva, 36, no Continental 2, em Guarulhos.",
    keywords: [
      "clínica veterinária continental guarulhos",
      "veterinário continental 2",
      "endereço platz vet",
      "veterinário perto de mim",
      "clínica veterinária guarulhos",
    ],
  },
  "/privacidade": {
    title: "Política de Privacidade",
    description:
      "Como a Platz Vet trata os dados pessoais de quem usa o site e os canais de atendimento, conforme a LGPD (Lei 13.709/2018).",
    keywords: ["política de privacidade", "lgpd", "proteção de dados", "dados pessoais", "platz vet"],
  },
} satisfies Record<string, PageSeo>;

export type SeoPath = keyof typeof seo;

/** Metadata completa de uma página (título, descrição, palavras-chave, canônica e redes). */
export function pageMetadata(path: SeoPath, image?: string): Metadata {
  const { title, description, keywords } = seo[path];
  const fullTitle = `${title}${BRAND_SUFFIX}`;
  const images = image ? [image] : undefined;
  return {
    ...(path === "/" ? { title: { absolute: fullTitle } } : { title }),
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, ...(images ? { images } : {}) },
    twitter: { title: fullTitle, description, ...(images ? { images } : {}) },
  };
}
