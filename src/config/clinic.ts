/**
 * Dados editáveis da Platz Vet: fonte única de conteúdo do site.
 *
 * Regra: nada aqui pode ser inventado. Enquanto um dado não for confirmado
 * pela clínica, ele fica `null` (o site esconde o item ou mostra "a confirmar")
 * ou com `confirmed: false` (o site exibe um selo "a confirmar" quando
 * `showPlaceholderNotes` estiver ligado).
 *
 * Fontes já confirmadas: Instagram oficial (@platzvetclinicaveterinaria),
 * vídeos e posts da clínica, link oficial do WhatsApp Business e endereço
 * informado pelo responsável pelo projeto.
 */

/** 0 = domingo … 6 = sábado */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface OpeningHours {
  days: Weekday[];
  /** "HH:MM", horário de Brasília */
  opens: string;
  closes: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  postalCode?: string;
}

export interface Photo {
  src: string;
  alt: string;
  /** Foto de banco de imagens usada só até a clínica enviar as reais. */
  provisional: boolean;
  /** Enquadramento (CSS object-position), ex.: "center 30%". Padrão: centro. */
  position?: string;
}

export interface Video {
  src: string;
  poster: string;
  /** Descrição curta para leitores de tela. */
  title: string;
  /** O arquivo tem áudio (mostra o botão "Assistir com som"). */
  hasAudio: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  /** Foto vertical usada nos cards (celular/tablet). */
  image: Photo;
  /** Fundo horizontal da vitrine no desktop. */
  backdrop: Photo;
  confirmed: boolean;
}

export interface Specialist {
  name: string;
  /** Como a profissional se apresenta no vídeo da clínica. */
  title: string;
  /** Serviço que ela atende (id em clinic.services). */
  serviceId: string;
}

export interface CareStep {
  title: string;
  description: string;
  image: Photo;
  confirmed: boolean;
}

export interface FaqItem {
  question: string;
  /** `null` = resposta ainda não fornecida pela clínica */
  answer: string | null;
  confirmed: boolean;
}

export interface GalleryItem {
  label: string;
  /** `null` = espaço reservado para foto real que a clínica vai enviar */
  photo: Photo | null;
  orientation: "landscape" | "portrait";
  caption: string;
}

export interface ClinicConfig {
  name: string;
  descriptor: string;
  tagline: string;
  /** Usada em <meta description> e Open Graph. */
  summary: string;
  /** URL pública do site, sem barra final. Pode vir de NEXT_PUBLIC_SITE_URL. */
  siteUrl: string;
  /** Mostra selos "a confirmar" e o aviso de fotos provisórias. Desligar na publicação. */
  showPlaceholderNotes: boolean;
  whatsapp: {
    /**
     * Número oficial, apenas dígitos, no formato internacional exigido pelo
     * wa.me: 55 + DDD + número. É ele que permite abrir a conversa com a
     * mensagem do formulário já preenchida.
     *
     * Obtido do link oficial do WhatsApp Business da clínica
     * (https://wa.me/message/RGEURHLWJSD6F1, "Platzvet clínica veterinária").
     * Links do tipo /message/ não aceitam texto pré-preenchido, por isso o
     * site usa o número.
     */
    number: string | null;
  };
  /** Dados da empresa para a política de privacidade (controlador, LGPD). */
  legal: {
    companyName: string | null;
    /** Ex.: "00.000.000/0001-00" */
    cnpj: string | null;
  };
  /** Telefone fixo para exibição, ex.: "(11) 0000-0000". */
  phone: string | null;
  email: string | null;
  address: Address | null;
  /** Link "Abrir no mapa". Se `null` e houver endereço, é gerado a partir dele. */
  mapsUrl: string | null;
  /** URL de incorporação do Google Maps. Se `null` e houver endereço, é gerada a partir dele. */
  mapEmbedUrl: string | null;
  hours: OpeningHours[] | null;
  social: {
    instagram: string | null;
  };
  heroPhoto: Photo;
  /** Reel exibido no bloco do Instagram. */
  instagramVideo: Video;
  vet: {
    name: string | null;
    /** Como ele se apresenta no vídeo da clínica. */
    title: string;
    /** Ex.: "CRMV-SP 00000" */
    crmv: string | null;
    bio: string | null;
    video: Video;
  };
  /** Outros profissionais que atendem na clínica (fonte: vídeos oficiais). */
  specialists: Specialist[];
  partners: {
    /** "A Platz Vet agora atende clientes Petlove", post oficial. */
    petlove: { confirmed: boolean };
    /** "Farmácia Platz Vet", post oficial. */
    pharmacy: { confirmed: boolean };
  };
  services: Service[];
  careSteps: CareStep[];
  gallery: GalleryItem[];
  faq: FaqItem[];
}

const unsplash = (src: string, alt: string, position?: string): Photo => ({ src, alt, provisional: true, position });
const real = (src: string, alt: string, position?: string): Photo => ({ src, alt, provisional: false, position });

export const clinic: ClinicConfig = {
  name: "Platz Vet",
  descriptor: "Clínica Veterinária",
  tagline: "Cuidando de quem faz parte da sua história.",
  summary:
    "Platz Vet, clínica veterinária em Guarulhos para cães, gatos e pets não convencionais. Consultas, exames, vacinação, hidratação e farmácia. Agende pelo WhatsApp.",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  showPlaceholderNotes: true,

  whatsapp: { number: "5511947745799" },
  legal: { companyName: null, cnpj: null },
  phone: null,
  email: null,
  address: {
    street: "Rua José Pedro da Silva",
    number: "36",
    district: "Continental 2",
    city: "Guarulhos",
    state: "SP",
  },
  mapsUrl: null,
  mapEmbedUrl: null,
  hours: null,
  social: { instagram: "https://www.instagram.com/platzvetclinicaveterinaria/" },

  heroPhoto: real(
    "/images/veterinario-paciente.jpg",
    "Gustavo Platz Boccia, veterinário da Platz Vet, abraçando um cão border collie na clínica",
    "center 30%",
  ),
  instagramVideo: {
    src: "/videos/servicos.mp4",
    poster: "/videos/servicos-capa.jpg",
    title: "Reel da Platz Vet mostrando consulta, exames, vacinação e hidratação",
    hasAudio: false,
  },

  vet: {
    name: "Gustavo Platz Boccia",
    title: "Médico veterinário · Fundador da Platz Vet",
    crmv: null,
    bio: null,
    video: {
      src: "/videos/apresentacao.mp4",
      poster: "/videos/apresentacao-capa.jpg",
      title: "Vídeo de apresentação de Gustavo Platz Boccia, veterinário fundador da Platz Vet",
      hasAudio: true,
    },
  },

  // Vídeo oficial: "Sou médica veterinária especializada no atendimento clínico de
  // pets não convencionais e animais silvestres [...] roedor, ave, réptil, via
  // agendamento aqui na Platz Vet."
  specialists: [
    {
      name: "Letícia Amaro",
      title: "Médica veterinária · Pets não convencionais e animais silvestres",
      serviceId: "pets-nao-convencionais",
    },
  ],

  partners: {
    petlove: { confirmed: true },
    pharmacy: { confirmed: true },
  },

  // Serviços anunciados pela própria clínica (reel "Nós temos / Nós realizamos /
  // Aqui nós vacinamos / Aqui nós hidratamos", post da farmácia e vídeo de pets
  // não convencionais).
  services: [
    {
      id: "consulta",
      name: "Consultas",
      description:
        "Avaliação do seu pet com o veterinário, para entender o que ele precisa, tirar dúvidas e orientar os próximos cuidados.",
      image: real("/images/servico-consulta.jpg", "Veterinário examinando um cão de pelo claro na mesa de atendimento", "center 35%"),
      backdrop: real("/images/servico-consulta-fundo.jpg", ""),
      confirmed: true,
    },
    {
      id: "pets-nao-convencionais",
      name: "Pets não convencionais",
      description:
        "Atendimento clínico de roedores, aves, répteis e animais silvestres com a médica veterinária Letícia Amaro, mediante agendamento.",
      image: real(
        "/images/servico-pets-nao-convencionais.jpg",
        "Médica veterinária examinando um papagaio enrolado em uma toalha",
        "center 30%",
      ),
      backdrop: real("/images/servico-pets-nao-convencionais-fundo.jpg", ""),
      confirmed: true,
    },
    {
      id: "exames",
      name: "Exames",
      description: "Coleta e realização de exames para apoiar o diagnóstico e o acompanhamento da saúde do seu pet.",
      image: real("/images/servico-exames.jpg", "Tubos de coleta para exames sobre a bancada da clínica", "center 40%"),
      backdrop: real("/images/servico-exames-fundo.jpg", ""),
      confirmed: true,
    },
    {
      id: "vacinacao",
      name: "Vacinação",
      description:
        "Aplicação de vacinas e acompanhamento do calendário vacinal, para manter a proteção do seu pet em dia.",
      image: real("/images/servico-vacinacao.jpg", "Frascos de vacina sobre a bancada de atendimento", "center 45%"),
      backdrop: real("/images/servico-vacinacao-fundo.jpg", ""),
      confirmed: true,
    },
    {
      id: "hidratacao",
      name: "Hidratação",
      description:
        "Hidratação para pets que precisam repor líquidos, com avaliação e acompanhamento do veterinário.",
      image: real("/images/servico-hidratacao.jpg", "Bolsa de soro e materiais de hidratação na bancada da clínica", "center 45%"),
      backdrop: real("/images/servico-hidratacao-fundo.jpg", ""),
      confirmed: true,
    },
    {
      id: "farmacia",
      name: "Farmácia veterinária",
      description:
        "Medicamentos e cuidados para o seu pet, com mais praticidade e segurança no atendimento veterinário.",
      image: real("/images/servico-farmacia.jpg", "Prateleira da farmácia da Platz Vet com medicamentos veterinários", "center 30%"),
      backdrop: real("/images/servico-farmacia-fundo.jpg", ""),
      confirmed: true,
    },
  ],

  careSteps: [
    {
      title: "Você agenda pelo WhatsApp",
      description:
        "Sem cadastro e sem ligação: você envia o pedido com os dados do seu pet e a clínica responde com os horários disponíveis.",
      image: unsplash("/images/atendimento-1.jpg", "Casal sorrindo ao lado de seu cão"),
      confirmed: true,
    },
    {
      title: "Atendimento próximo",
      description:
        "Uma clínica independente, em que você conversa diretamente com o veterinário que acompanha o seu pet.",
      image: real("/images/paciente-dachshund.jpg", "Gustavo Platz Boccia com um dachshund de roupa rosa no colo", "center 35%"),
      confirmed: false,
    },
    {
      title: "Também para pets não convencionais",
      description:
        "Além de cães e gatos, a clínica atende roedores, aves, répteis e animais silvestres, com a médica veterinária Letícia Amaro, mediante agendamento.",
      image: real("/images/paciente-ave.jpg", "Papagaio enrolado em uma toalha durante o atendimento", "center 25%"),
      confirmed: true,
    },
    {
      title: "Clientes Petlove",
      description:
        "A Platz Vet atende clientes Petlove. Consulte a clínica sobre a cobertura do seu plano antes do atendimento.",
      image: unsplash("/images/atendimento-4.jpg", "Cão deitado em uma caminha em uma sala clara com plantas"),
      confirmed: true,
    },
  ],

  gallery: [
    {
      label: "Fachada",
      photo: real("/images/fachada.jpg", "Fachada da Platz Vet decorada com balões verdes no dia da inauguração"),
      orientation: "landscape",
      caption: "A entrada da clínica no dia da inauguração.",
    },
    {
      label: "Recepção",
      photo: real("/images/clinica-recepcao.jpg", "Recepção da Platz Vet com o logo na parede verde e a farmácia ao lado"),
      orientation: "portrait",
      caption: "Recepção, com a farmácia logo ao lado.",
    },
    {
      label: "Consultório",
      photo: real("/images/clinica-consultorio.jpg", "Consultório da Platz Vet com mesa de atendimento"),
      orientation: "portrait",
      caption: "Consultório de atendimento.",
    },
    {
      label: "Farmácia",
      photo: real("/images/servico-farmacia.jpg", "Prateleira da farmácia da Platz Vet"),
      orientation: "portrait",
      caption: "Farmácia veterinária da clínica.",
    },
    {
      label: "Pacientes",
      photo: real("/images/paciente-maltes.jpg", "Cão branco de roupa azul em pé no consultório"),
      orientation: "portrait",
      caption: "Um dos pacientes da casa.",
    },
    {
      label: "Pets não convencionais",
      photo: real("/images/paciente-serpente.jpg", "Serpente em uma caixa forrada durante o atendimento na clínica"),
      orientation: "portrait",
      caption: "Atendimento de répteis e outros pets não convencionais.",
    },
    {
      label: "Boas-vindas",
      photo: real("/images/clinica-tapete.jpg", "Tapete verde com o logo da Platz Vet na entrada"),
      orientation: "portrait",
      caption: "Detalhe da entrada.",
    },
  ],

  faq: [
    {
      question: "Como funciona o agendamento pelo site?",
      answer:
        "Você preenche um formulário curto e o WhatsApp abre com a mensagem pronta. É só revisar e enviar: a clínica responde com os horários disponíveis.",
      confirmed: true,
    },
    {
      question: "O formulário já garante o meu horário?",
      answer:
        "Não. O formulário apenas prepara a sua solicitação. O horário só fica confirmado depois da resposta da clínica pelo WhatsApp.",
      confirmed: true,
    },
    {
      question: "Vocês atendem clientes Petlove?",
      answer: "Sim. Para saber a cobertura do seu plano, consulte a clínica antes do atendimento.",
      confirmed: true,
    },
    {
      question: "Quais animais são atendidos?",
      answer:
        "Cães e gatos, e também pets não convencionais e animais silvestres, como roedores, aves e répteis. Esses pacientes são atendidos pela médica veterinária Letícia Amaro, em alguns dias da semana, mediante agendamento.",
      confirmed: true,
    },
    { question: "Quais são as formas de pagamento?", answer: null, confirmed: false },
  ],
};

export const navigation = [
  { label: "Início", href: "/" },
  { label: "Agendamento", href: "/agendamento" },
  { label: "Serviços", href: "/servicos" },
  { label: "Contato", href: "/contato" },
] as const;

/** Item ativo: a home só na raiz; os demais também nas subpáginas (ex.: /servicos/vacinacao). */
export const isActivePath = (href: string, pathname: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export const hasProvisionalPhotos = (): boolean =>
  [
    clinic.heroPhoto,
    ...clinic.services.flatMap((s) => [s.image, s.backdrop]),
    ...clinic.careSteps.map((s) => s.image),
    ...clinic.gallery.flatMap((g) => (g.photo ? [g.photo] : [])),
  ].some((p) => p.provisional);
