/**
 * Páginas de SEO local (uma por intenção de busca). Cada página atende uma ou
 * mais "palavras contratadas" — o mapa completo, com volumes e o plano de
 * conteúdo do blog no WordPress, está em docs/seo-palavras-chave.md.
 *
 * Regras do conteúdo:
 *  - Fatos sobre a clínica vêm só de fontes confirmadas (Instagram oficial,
 *    vídeos e dados informados). Preço, marcas de vacina e prazos não entram.
 *  - Informação de saúde é geral e educativa, sempre remetendo à avaliação do
 *    veterinário. Deve ser revisada pelo Dr. Gustavo antes da publicação.
 */

import { clinic, type Photo } from "@/config/clinic";
import { seo, type SeoPath } from "@/content/seo";

const meta = (path: SeoPath) => ({ title: seo[path].title, description: seo[path].description });

/** Categorias usadas nos filtros da página /servicos e no topo de cada página. */
export const categories = {
  clinico: { label: "Atendimento clínico", color: "#2f6b4f" },
  exoticos: { label: "Pets não convencionais", color: "#3f7f8c" },
  prevencao: { label: "Prevenção", color: "#7d8f2f" },
  farmacia: { label: "Farmácia", color: "#c0673f" },
  planos: { label: "Planos de saúde", color: "#b0862a" },
} as const;

export type CategoryId = keyof typeof categories;

/** Data da última revisão do conteúdo (AAAA-MM-DD). */
const UPDATED = "2026-10-18";

export interface LandingSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LandingPageContent {
  /** Caminho público, ex.: "/servicos/vacinacao" */
  path: string;
  /** Segmento usado na rota dinâmica /servicos/[slug] */
  slug: string;
  /** id do serviço em clinic.services (nome, imagens, motivo do formulário) */
  serviceId?: string;
  /** Palavras contratadas que esta página trabalha (a primeira é a principal). */
  keywords: string[];
  title: string;
  description: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: LandingSection[];
  faq: { question: string; answer: string }[];
  /** Caminhos de outras páginas para a seção "Veja também". */
  related: string[];
  /** Foto vertical (cards e listagens). */
  image: Photo;
  /** Imagem horizontal do topo da página. */
  cover: Photo;
  category: CategoryId;
  updatedAt: string;
  /** Quem revisou o conteúdo técnico. Preencher após a revisão do veterinário. */
  reviewedBy: string | null;
  /** Termos e entidades do tópico (usados como `about`/`keywords` no schema). */
  entities: string[];
}

const service = (id: string) => {
  const found = clinic.services.find((s) => s.id === id);
  if (!found) throw new Error(`Serviço não encontrado em clinic.services: ${id}`);
  return found;
};

const where = "na Rua José Pedro da Silva, 36, no Continental 2, em Guarulhos";

export const servicePages: LandingPageContent[] = [
  {
    path: "/servicos/consulta-veterinaria",
    slug: "consulta-veterinaria",
    serviceId: "consulta",
    keywords: ["consulta veterinária em guarulhos"],
    ...meta("/servicos/consulta-veterinaria"),
    breadcrumb: "Consulta veterinária",
    eyebrow: "Serviço",
    h1: "Consulta veterinária em Guarulhos",
    intro: `Na Platz Vet, a consulta é o momento de entender o paciente e ouvir o responsável: o médico-veterinário avalia o seu pet, esclarece dúvidas e orienta os próximos cuidados. A clínica fica ${where}.`,
    sections: [
      {
        heading: "O que acontece em uma consulta veterinária",
        paragraphs: [
          "A consulta começa por uma conversa sobre o histórico do animal: rotina, alimentação, vacinas, comportamento e o motivo da visita. Essa etapa, chamada de anamnese, ajuda o veterinário a entender o contexto antes de examinar.",
          "Em seguida vem o exame físico, que costuma incluir peso, temperatura, mucosas, hidratação, pele, pelagem, ouvidos e a escuta do coração e dos pulmões. Quando necessário, o veterinário indica exames complementares ou um tratamento.",
        ],
      },
      {
        heading: "Quando marcar uma consulta",
        list: [
          "Check-up de rotina, mesmo quando o pet parece bem",
          "Primeira consulta do filhote ou de um animal recém-adotado",
          "Mudanças de apetite, de comportamento, no xixi ou no cocô",
          "Vômito, diarreia, tosse, coceira ou feridas na pele",
          "Acompanhamento de pets idosos ou em tratamento",
        ],
      },
      {
        heading: "Consulta com hora marcada",
        paragraphs: [
          "O agendamento é feito pelo WhatsApp: você envia o pedido com o nome do pet e o motivo do contato, e a clínica responde com os horários disponíveis. Assim você já chega com o horário confirmado.",
          "Se o seu pet tem plano Petlove, informe ao agendar: a Platz Vet atende clientes Petlove.",
        ],
      },
    ],
    faq: [
      {
        question: "Preciso agendar a consulta?",
        answer:
          "Sim. O agendamento é feito pelo WhatsApp: você envia o pedido e a clínica confirma o horário disponível.",
      },
      {
        question: "Quanto custa a consulta veterinária?",
        answer: "Os valores são informados pela clínica no WhatsApp, junto com os horários disponíveis.",
      },
      {
        question: "O que levar na consulta?",
        answer:
          "Se tiver, leve a carteira de vacinação e exames anteriores do seu pet. Anote também as dúvidas e os sintomas que você observou.",
      },
      {
        question: "A Platz Vet atende clientes Petlove?",
        answer: "Sim. Para saber a cobertura do seu plano, consulte a clínica antes do atendimento.",
      },
    ],
    related: ["/servicos/vacinacao", "/servicos/pets-nao-convencionais", "/petlove"],
    image: service("consulta").image,
    cover: service("consulta").backdrop,
    category: "clinico",
    updatedAt: UPDATED,
    reviewedBy: null,
    entities: ["consulta veterinária", "médico-veterinário", "anamnese", "exame físico", "check-up", "Guarulhos"],
  },
  {
    path: "/servicos/pets-nao-convencionais",
    slug: "pets-nao-convencionais",
    serviceId: "pets-nao-convencionais",
    keywords: [
      "veterinário de pets não convencionais em guarulhos",
      "veterinário de animais silvestres em guarulhos",
      "veterinário de aves em guarulhos",
    ],
    ...meta("/servicos/pets-nao-convencionais"),
    breadcrumb: "Pets não convencionais",
    eyebrow: "Serviço",
    h1: "Veterinário de pets não convencionais em Guarulhos",
    intro: `A Platz Vet também atende pets não convencionais e animais silvestres, como roedores, aves e répteis. O atendimento clínico é feito pela médica veterinária Letícia Amaro, mediante agendamento, ${where}.`,
    sections: [
      {
        heading: "Quais animais são atendidos",
        list: [
          "Roedores, como hamsters e porquinhos-da-índia",
          "Aves, como calopsitas, periquitos e papagaios",
          "Répteis, como serpentes, lagartos e jabutis",
          "Outros animais silvestres e pets não convencionais",
        ],
        paragraphs: [
          "Tem um pet de outra espécie? Fale com a clínica pelo WhatsApp antes de agendar para confirmar o atendimento.",
        ],
      },
      {
        heading: "Por que procurar atendimento especializado",
        paragraphs: [
          "Cada espécie tem anatomia, alimentação e necessidades de ambiente próprias, como temperatura, umidade e luz. Por isso, os cuidados que funcionam para cães e gatos nem sempre servem para uma ave, um roedor ou um réptil.",
          "Muitos desses animais também costumam esconder sinais de doença, o que torna as consultas de rotina ainda mais importantes para perceber mudanças cedo.",
        ],
      },
      {
        heading: "Como é o atendimento",
        paragraphs: [
          "A consulta inclui avaliação física e orientação ao tutor sobre os cuidados do dia a dia, para que o seu pet tenha bem-estar e qualidade de vida.",
          "O atendimento é feito mediante agendamento. Ao agendar, informe a espécie do seu pet e pergunte à clínica como transportá-lo com segurança até a clínica.",
        ],
      },
      {
        heading: "Animais silvestres como pet",
        paragraphs: [
          "No Brasil, animais silvestres mantidos como pets precisam ter origem legal, com a documentação do criadouro ou do comerciante autorizado. Guarde esses documentos e leve-os à consulta, se tiver.",
        ],
      },
    ],
    faq: [
      {
        question: "A Platz Vet atende animais silvestres?",
        answer:
          "Sim. A clínica atende pets não convencionais e animais silvestres, como roedores, aves e répteis, mediante agendamento.",
      },
      {
        question: "Quem faz o atendimento?",
        answer:
          "A médica veterinária Letícia Amaro, que atende pets não convencionais e animais silvestres na Platz Vet.",
      },
      {
        question: "Preciso agendar?",
        answer:
          "Sim, o atendimento desses pacientes é feito mediante agendamento. Envie o pedido pelo WhatsApp informando a espécie do seu pet.",
      },
      {
        question: "Meu pet não está na lista. Vocês atendem?",
        answer: "Fale com a clínica pelo WhatsApp e informe a espécie para confirmar se o atendimento é possível.",
      },
    ],
    related: ["/servicos/consulta-veterinaria", "/servicos/exames-veterinarios", "/servicos/hidratacao"],
    image: service("pets-nao-convencionais").image,
    cover: service("pets-nao-convencionais").backdrop,
    category: "exoticos",
    updatedAt: UPDATED,
    reviewedBy: null,
    entities: [
      "pets não convencionais",
      "animais silvestres",
      "animais exóticos",
      "roedores",
      "aves",
      "répteis",
      "clínica de animais silvestres",
      "Guarulhos",
    ],
  },
  {
    path: "/servicos/vacinacao",
    slug: "vacinacao",
    serviceId: "vacinacao",
    keywords: ["vacina para cachorro em guarulhos", "vacinação em guarulhos"],
    ...meta("/servicos/vacinacao"),
    breadcrumb: "Vacinação",
    eyebrow: "Serviço",
    h1: "Vacinação veterinária em Guarulhos",
    intro: `A vacinação é uma das formas mais importantes de prevenção na vida do seu pet. Na Platz Vet, ${where}, você agenda a vacina pelo WhatsApp e o veterinário orienta o calendário ideal para a idade e a rotina do animal.`,
    sections: [
      {
        heading: "Por que vacinar o seu cachorro",
        paragraphs: [
          "As vacinas estimulam o sistema imunológico a reconhecer agentes de doenças infecciosas antes de o animal ter contato com eles. Muitas dessas doenças são graves, transmitidas com facilidade entre animais e, no caso da raiva, também podem afetar pessoas.",
          "Manter a vacinação em dia protege o seu pet e ajuda a reduzir a circulação dessas doenças entre os animais da vizinhança.",
        ],
      },
      {
        heading: "Vacinas mais comuns para cães",
        list: [
          "Polivalentes, como a V8 e a V10, que protegem contra doenças como cinomose, parvovirose, hepatite infecciosa canina e leptospirose",
          "Antirrábica, contra a raiva",
          "Outras vacinas, como a da gripe canina, indicadas conforme a rotina e o contato com outros cães",
        ],
        paragraphs: [
          "Quais vacinas são indicadas e quais estão disponíveis na clínica é definido no atendimento. Consulte a clínica pelo WhatsApp.",
        ],
      },
      {
        heading: "Filhotes e reforço anual",
        paragraphs: [
          "Filhotes recebem uma série de doses nas primeiras semanas de vida, com intervalos definidos pelo veterinário. Depois disso, a maioria das vacinas precisa de reforço periódico, geralmente anual.",
          "Gatos também têm vacinas próprias, como as polivalentes felinas e a antirrábica. Em qualquer caso, o calendário exato depende da idade, do histórico e da avaliação do animal.",
        ],
      },
    ],
    faq: [
      {
        question: "A partir de quando o filhote pode ser vacinado?",
        answer:
          "O protocolo costuma começar nas primeiras semanas de vida. O veterinário define a idade e o intervalo de cada dose depois de avaliar o filhote.",
      },
      {
        question: "Precisa vacinar todo ano?",
        answer:
          "Na maioria dos casos, sim: as vacinas exigem reforço periódico, geralmente anual. O veterinário indica o calendário do seu pet.",
      },
      {
        question: "Quais vacinas a Platz Vet aplica?",
        answer: "Consulte a clínica pelo WhatsApp para saber as vacinas disponíveis e os valores.",
      },
      {
        question: "Preciso levar a carteira de vacinação?",
        answer: "Se o seu pet já tiver, leve: ela mostra o histórico e ajuda o veterinário a seguir o calendário certo.",
      },
    ],
    related: ["/servicos/consulta-veterinaria", "/servicos/exames-veterinarios", "/petlove"],
    image: service("vacinacao").image,
    cover: service("vacinacao").backdrop,
    category: "prevencao",
    updatedAt: UPDATED,
    reviewedBy: null,
    entities: ["vacinação", "vacina V8", "vacina V10", "vacina antirrábica", "cinomose", "parvovirose", "leptospirose", "reforço anual", "filhote"],
  },
  {
    path: "/servicos/exames-veterinarios",
    slug: "exames-veterinarios",
    serviceId: "exames",
    keywords: ["exames veterinários em guarulhos", "exame de sangue para cachorro em guarulhos"],
    ...meta("/servicos/exames-veterinarios"),
    breadcrumb: "Exames",
    eyebrow: "Serviço",
    h1: "Exames veterinários em Guarulhos",
    intro: `Os exames ajudam o veterinário a enxergar o que não aparece na consulta. A Platz Vet, ${where}, realiza exames para apoiar o diagnóstico e o acompanhamento da saúde do seu pet.`,
    sections: [
      {
        heading: "Exame de sangue para cachorro",
        paragraphs: [
          "O hemograma e os exames bioquímicos estão entre os mais pedidos. O hemograma avalia as células do sangue (glóbulos vermelhos, brancos e plaquetas); os bioquímicos ajudam a acompanhar o funcionamento de órgãos como fígado e rins.",
          "O resultado é sempre interpretado junto com a consulta e o histórico do animal. Por isso, quem indica quais exames fazer é o veterinário.",
        ],
      },
      {
        heading: "Quando os exames são indicados",
        list: [
          "Check-ups periódicos, principalmente em pets idosos",
          "Investigação de sintomas como apatia, perda de apetite, vômito ou emagrecimento",
          "Acompanhamento de doenças e de tratamentos em andamento",
          "Avaliação antes de procedimentos",
        ],
      },
      {
        heading: "Preparo para o exame",
        paragraphs: [
          "Alguns exames pedem jejum ou outros cuidados. Ao agendar pelo WhatsApp, pergunte à clínica sobre o preparo do exame indicado.",
        ],
      },
    ],
    faq: [
      {
        question: "Quais exames a Platz Vet realiza?",
        answer:
          "A clínica realiza diferentes exames. Consulte a clínica pelo WhatsApp para saber quais estão disponíveis para o caso do seu pet.",
      },
      {
        question: "O exame de sangue precisa de jejum?",
        answer: "Depende do exame. Pergunte à clínica sobre o preparo ao agendar.",
      },
      {
        question: "Quanto tempo demora o resultado?",
        answer: "O prazo varia conforme o exame. Pergunte à clínica a previsão para o exame do seu pet.",
      },
      {
        question: "Posso fazer exames sem consulta?",
        answer:
          "O ideal é que o exame seja indicado pelo veterinário, que vai interpretar o resultado junto com a avaliação clínica do seu pet.",
      },
    ],
    related: ["/servicos/consulta-veterinaria", "/servicos/hidratacao", "/servicos/vacinacao"],
    image: service("exames").image,
    cover: service("exames").backdrop,
    category: "clinico",
    updatedAt: UPDATED,
    reviewedBy: null,
    entities: ["exames veterinários", "exame de sangue", "hemograma", "exame bioquímico", "check-up", "diagnóstico"],
  },
  {
    path: "/servicos/hidratacao",
    slug: "hidratacao",
    serviceId: "hidratacao",
    keywords: ["hidratação para cachorro em guarulhos"],
    ...meta("/servicos/hidratacao"),
    breadcrumb: "Hidratação",
    eyebrow: "Serviço",
    h1: "Hidratação para pets em Guarulhos",
    intro: `Quando o pet perde mais líquido do que consegue repor, a hidratação feita com acompanhamento veterinário ajuda a recuperar o equilíbrio do organismo. A Platz Vet, ${where}, realiza hidratação com avaliação do veterinário.`,
    sections: [
      {
        heading: "Sinais de desidratação em cães e gatos",
        list: [
          "Gengivas secas ou pegajosas",
          "Apatia, cansaço e falta de apetite",
          "Olhos fundos",
          "Pele que demora a voltar ao lugar quando levemente puxada",
          "Pouca urina ou urina muito concentrada",
        ],
        paragraphs: [
          "Ao notar esses sinais, procure um veterinário. Não dê medicamentos ou soro por conta própria.",
        ],
      },
      {
        heading: "Causas mais comuns",
        paragraphs: [
          "Vômito e diarreia, calor intenso, febre, pouca ingestão de água e algumas doenças, como as renais, estão entre as causas frequentes de desidratação. Filhotes e pets idosos costumam desidratar mais rápido.",
        ],
      },
      {
        heading: "Como funciona a hidratação veterinária",
        paragraphs: [
          "O veterinário avalia o grau de desidratação e a causa, e define a forma e o volume da reposição de líquidos, chamada de fluidoterapia. Ela pode ser feita de diferentes formas, como por via subcutânea ou intravenosa, conforme a avaliação.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso dar soro caseiro para o meu cachorro?",
        answer:
          "Não sem orientação veterinária. A quantidade e o tipo de líquido dependem da causa e do grau de desidratação, que só o veterinário consegue avaliar.",
      },
      {
        question: "Desidratação é uma emergência?",
        answer:
          "Pode ser, principalmente em filhotes, idosos ou quando há vômito e diarreia persistentes. Procure atendimento o quanto antes.",
      },
      {
        question: "Quanto tempo leva a hidratação?",
        answer: "Depende do estado do animal e da forma de reposição indicada. O veterinário orienta no atendimento.",
      },
    ],
    related: ["/servicos/consulta-veterinaria", "/servicos/exames-veterinarios", "/servicos/farmacia-veterinaria"],
    image: service("hidratacao").image,
    cover: service("hidratacao").backdrop,
    category: "clinico",
    updatedAt: UPDATED,
    reviewedBy: null,
    entities: ["hidratação", "desidratação", "fluidoterapia", "soro", "vômito", "diarreia", "cachorro desidratado", "gato desidratado"],
  },
  {
    path: "/servicos/farmacia-veterinaria",
    slug: "farmacia-veterinaria",
    serviceId: "farmacia",
    keywords: ["farmácia veterinária em guarulhos"],
    ...meta("/servicos/farmacia-veterinaria"),
    breadcrumb: "Farmácia veterinária",
    eyebrow: "Serviço",
    h1: "Farmácia veterinária em Guarulhos",
    intro: `Na Farmácia Platz Vet você encontra medicamentos e cuidados para o seu pet, com mais praticidade e segurança no atendimento veterinário. Ela fica na própria clínica, ${where}.`,
    sections: [
      {
        heading: "Praticidade depois da consulta",
        paragraphs: [
          "Saiu da consulta com uma prescrição? Você pode verificar ali mesmo se o item indicado está disponível na farmácia da clínica, sem precisar procurar em outro lugar.",
          "Para saber a disponibilidade de um produto antes de ir, fale com a clínica pelo WhatsApp.",
        ],
      },
      {
        heading: "Medicamento para pet é com orientação",
        paragraphs: [
          "Não medique o seu pet por conta própria. Remédios de uso humano podem ser tóxicos para cães e gatos, e a dose certa depende do peso, da idade e da condição de cada animal.",
          "Dúvidas sobre dose, horário ou a melhor forma de dar o remédio devem ser esclarecidas com o veterinário.",
        ],
      },
    ],
    faq: [
      {
        question: "Preciso de receita para comprar?",
        answer:
          "Medicamentos de uso controlado exigem receita. Para os demais, a orientação do veterinário continua sendo a forma mais segura de garantir o produto e a dose certos.",
      },
      {
        question: "Como sei se um produto está disponível?",
        answer: "Fale com a clínica pelo WhatsApp e informe o nome do produto ou envie a foto da receita.",
      },
    ],
    related: ["/servicos/consulta-veterinaria", "/servicos/vacinacao", "/servicos/hidratacao"],
    image: service("farmacia").image,
    cover: service("farmacia").backdrop,
    category: "farmacia",
    updatedAt: UPDATED,
    reviewedBy: null,
    entities: ["farmácia veterinária", "medicamentos veterinários", "prescrição", "automedicação", "Guarulhos"],
  },
];

export const petlovePage: LandingPageContent = {
  path: "/petlove",
  slug: "petlove",
  keywords: ["petlove guarulhos", "clínica veterinária petlove guarulhos"],
  ...meta("/petlove"),
  breadcrumb: "Petlove",
  eyebrow: "Planos de saúde pet",
  h1: "Clínica veterinária que atende Petlove em Guarulhos",
  intro: `A Platz Vet agora atende clientes Petlove. Se o seu pet tem plano Petlove, você pode agendar o atendimento na clínica, ${where}.`,
  sections: [
    {
      heading: "Como agendar sendo cliente Petlove",
      list: [
        "Confira no app ou no site da Petlove a cobertura do seu plano",
        "Envie o pedido de agendamento pelo WhatsApp e informe que é cliente Petlove",
        "A clínica confirma o horário e os detalhes do atendimento",
      ],
    },
    {
      heading: "O que você encontra na Platz Vet",
      paragraphs: [
        "Consultas, exames, vacinação, hidratação, farmácia veterinária e atendimento de pets não convencionais, com agendamento simples pelo WhatsApp. A cobertura de cada serviço depende do seu plano.",
      ],
    },
  ],
  faq: [
    {
      question: "A Platz Vet atende clientes Petlove?",
      answer: "Sim, conforme divulgado no Instagram oficial da clínica.",
    },
    {
      question: "Meu plano cobre todos os serviços?",
      answer:
        "Depende do plano contratado. Consulte a cobertura no app da Petlove ou fale com a clínica antes do atendimento.",
    },
  ],
  related: ["/servicos/consulta-veterinaria", "/servicos/vacinacao", "/servicos/exames-veterinarios"],
  image: {
    src: "/images/paciente-dachshund.jpg",
    alt: "Gustavo Platz Boccia com um dachshund de roupa rosa no colo",
    provisional: false,
    position: "center 35%",
  },
  cover: {
    src: "/images/petlove-capa.jpg",
    alt: "Gustavo Platz Boccia abraçando um cão border collie na clínica",
    provisional: false,
  },
  category: "planos",
  updatedAt: UPDATED,
  reviewedBy: null,
  entities: ["Petlove", "plano de saúde pet", "rede credenciada", "clínica veterinária", "Guarulhos"],
};

export const landingPages: LandingPageContent[] = [...servicePages, petlovePage];

export const findLanding = (path: string) => landingPages.find((p) => p.path === path);
