import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { clinic } from "@/config/clinic";
import { formatAddress } from "@/lib/hours";
import { buildWhatsAppUrl, defaultWhatsAppMessage, whatsappDisplay } from "@/lib/whatsapp";
import { MotionRoot } from "@/components/client/MotionRoot";
import { Toc } from "@/components/client/Toc";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PendingBadge, PendingText } from "@/components/ui/Placeholder";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como a ${clinic.name} trata os dados pessoais de quem usa o site e os canais de atendimento, de acordo com a LGPD (Lei 13.709/2018).`,
  alternates: { canonical: "/privacidade" },
};

/** Data da última revisão desta política (AAAA-MM-DD). */
const UPDATED = "2026-10-19";

const link = "font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest";

/*
 * Texto escrito a partir do funcionamento real do site:
 *  - o formulário de agendamento não envia dados a servidor; monta uma
 *    mensagem que só é enviada se a pessoa a enviar no WhatsApp;
 *  - o único armazenamento no navegador é o rascunho do formulário
 *    (sessionStorage, chave "platz:agendamento"); não há cookies próprios,
 *    analytics ou publicidade;
 *  - fontes e imagens são servidas pelo próprio site; o único conteúdo de
 *    terceiros carregado automaticamente é o mapa do Google na página Contato.
 * Se algo disso mudar (ex.: incluir Google Analytics ou Meta Pixel), a
 * política precisa ser atualizada. Recomenda-se revisão jurídica antes da
 * publicação.
 */
export default function PrivacyPage() {
  const address = clinic.address ? formatAddress(clinic.address) : null;
  const whatsapp = whatsappDisplay();
  const updated = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${UPDATED}T12:00:00Z`),
  );

  const contactChannel = (
    <>
      pelo WhatsApp{" "}
      <a href={buildWhatsAppUrl(defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer" className={link}>
        {whatsapp ?? "da clínica"}
      </a>
      {clinic.email && (
        <>
          {" "}
          ou pelo e-mail{" "}
          <a href={`mailto:${clinic.email}`} className={link}>
            {clinic.email}
          </a>
        </>
      )}
    </>
  );

  const sections: { id: string; title: string; body: ReactNode }[] = [
    {
      id: "quem-somos",
      title: "1. Quem é o responsável pelos seus dados",
      body: (
        <>
          <p>
            Esta Política de Privacidade explica como a <strong>{clinic.name}</strong> trata os dados pessoais de quem
            visita este site e entra em contato com a clínica, conforme a Lei Geral de Proteção de Dados Pessoais (LGPD,
            Lei nº 13.709/2018) e o Marco Civil da Internet (Lei nº 12.965/2014).
          </p>
          <p>
            Para os fins da LGPD, a {clinic.name} é a <strong>controladora</strong> dos dados, ou seja, quem decide como
            eles são tratados.
          </p>
          <ul>
            <li>
              <strong>Razão social:</strong>{" "}
              {clinic.legal.companyName ?? <PendingText>Razão social a informar</PendingText>}
            </li>
            <li>
              <strong>CNPJ:</strong> {clinic.legal.cnpj ?? <PendingText>CNPJ a informar</PendingText>}
            </li>
            {address && (
              <li>
                <strong>Endereço:</strong> {address.line1}, {address.line2}
              </li>
            )}
            <li>
              <strong>Contato para assuntos de privacidade:</strong> {contactChannel}
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "dados",
      title: "2. Quais dados tratamos",
      body: (
        <>
          <h3>a) Formulário de agendamento</h3>
          <p>
            No formulário você informa seu nome, o nome e a espécie do animal, o motivo do contato, a preferência de
            horário e, se quiser, observações. <strong>Esses dados não são enviados a nenhum servidor do site.</strong>{" "}
            Eles são usados só para montar uma mensagem que abre no seu WhatsApp, e chegam à clínica apenas se você
            decidir enviá-la.
          </p>
          <h3>b) Atendimento pelo WhatsApp e na clínica</h3>
          <p>
            Ao conversar com a clínica, tratamos os dados que você nos envia: seu nome, número de telefone, mensagens e
            informações sobre o seu animal. No atendimento veterinário, também são registradas informações de saúde do
            animal no prontuário e os seus dados de tutor e responsável.
          </p>
          <h3>c) Dados técnicos de navegação</h3>
          <p>
            Como qualquer site, o servidor que hospeda esta página registra dados técnicos de acesso, como endereço IP,
            data e hora, página acessada e tipo de navegador. A guarda desses registros é uma obrigação legal (art. 15 do
            Marco Civil da Internet).
          </p>
          <p>
            <strong>O site não usa ferramentas de análise de audiência, publicidade ou rastreamento</strong>, como Google
            Analytics ou Meta Pixel.
          </p>
        </>
      ),
    },
    {
      id: "finalidades",
      title: "3. Para que usamos os dados e com qual base legal",
      body: (
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Finalidade</th>
                <th>Base legal (LGPD, art. 7º)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Responder ao seu contato, informar horários e agendar o atendimento</td>
                <td>Procedimentos preliminares a contrato, a seu pedido (inciso V)</td>
              </tr>
              <tr>
                <td>Realizar o atendimento veterinário, emitir documentos e cobrar pelos serviços</td>
                <td>Execução de contrato (inciso V)</td>
              </tr>
              <tr>
                <td>Manter o prontuário do animal e cumprir exigências fiscais e sanitárias</td>
                <td>Cumprimento de obrigação legal ou regulatória (inciso II)</td>
              </tr>
              <tr>
                <td>Guardar os registros de acesso ao site</td>
                <td>Cumprimento de obrigação legal: Marco Civil da Internet, art. 15 (inciso II)</td>
              </tr>
              <tr>
                <td>Defender a clínica em processos judiciais, administrativos ou arbitrais</td>
                <td>Exercício regular de direitos (inciso VI)</td>
              </tr>
              <tr>
                <td>Enviar lembretes sobre o seu animal, como retorno ou vacina</td>
                <td>Legítimo interesse (inciso IX), com opção de recusar a qualquer momento</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: "armazenamento",
      title: "4. Cookies e armazenamento no navegador",
      body: (
        <>
          <p>
            <strong>Este site não usa cookies próprios.</strong> Para que você não perca o que já preencheu, o formulário
            de agendamento guarda um rascunho no <em>armazenamento de sessão</em> do seu navegador. Esse rascunho:
          </p>
          <ul>
            <li>fica apenas no seu dispositivo e não é enviado à clínica;</li>
            <li>é apagado automaticamente quando você fecha a aba;</li>
            <li>pode ser apagado a qualquer momento pela opção “Limpar formulário”.</li>
          </ul>
          <p>
            A página <Link href="/contato" className={link}>Contato</Link> exibe um mapa do Google Maps. Ao carregar o
            mapa, o Google pode coletar dados e usar cookies próprios, conforme a{" "}
            <a href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noopener noreferrer" className={link}>
              Política de Privacidade do Google
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: "compartilhamento",
      title: "5. Com quem compartilhamos",
      body: (
        <>
          <p>A {clinic.name} não vende dados pessoais. Os dados podem ser compartilhados apenas com:</p>
          <ul>
            <li>
              <strong>WhatsApp (Meta):</strong> quando você conversa com a clínica pelo aplicativo, que segue a{" "}
              <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={link}>
                política de privacidade do WhatsApp
              </a>
              ;
            </li>
            <li>
              <strong>Google:</strong> ao exibir o mapa na página Contato;
            </li>
            <li>
              <strong>Provedor de hospedagem do site:</strong> que armazena os registros de acesso;
            </li>
            <li>
              <strong>Operadoras de planos de saúde pet:</strong> como a Petlove, quando você optar por usar o seu plano,
              para autorizar o atendimento;
            </li>
            <li>
              <strong>Laboratórios e prestadores de serviço:</strong> quando necessários para exames ou procedimentos
              do seu animal;
            </li>
            <li>
              <strong>Autoridades públicas:</strong> quando houver obrigação legal ou ordem judicial.
            </li>
          </ul>
          <p>
            Alguns desses parceiros, como o WhatsApp e o Google, podem armazenar dados em servidores fora do Brasil. Essa
            transferência internacional ocorre nas hipóteses permitidas pelo art. 33 da LGPD.
          </p>
        </>
      ),
    },
    {
      id: "retencao",
      title: "6. Por quanto tempo guardamos",
      body: (
        <ul>
          <li>
            <strong>Conversas de agendamento:</strong> pelo tempo necessário para organizar o atendimento.
          </li>
          <li>
            <strong>Prontuário e dados do atendimento veterinário:</strong> pelo prazo exigido pelas normas do Conselho
            Federal de Medicina Veterinária e pela legislação fiscal.
          </li>
          <li>
            <strong>Registros de acesso ao site:</strong> por 6 meses, como determina o art. 15 do Marco Civil da
            Internet.
          </li>
          <li>
            <strong>Rascunho do formulário:</strong> até você fechar a aba do navegador.
          </li>
        </ul>
      ),
    },
    {
      id: "seguranca",
      title: "7. Como protegemos os dados",
      body: (
        <p>
          Adotamos medidas técnicas e administrativas razoáveis para proteger os dados contra acessos não autorizados,
          perda ou uso indevido, como conexão segura (HTTPS) no site e acesso restrito às informações da clínica. Nenhum
          sistema é totalmente imune a falhas. Se ocorrer um incidente de segurança com risco relevante, comunicaremos os
          titulares afetados e a Autoridade Nacional de Proteção de Dados (ANPD), conforme o art. 48 da LGPD.
        </p>
      ),
    },
    {
      id: "direitos",
      title: "8. Seus direitos",
      body: (
        <>
          <p>Pelo art. 18 da LGPD, você pode solicitar a qualquer momento:</p>
          <ul>
            <li>a confirmação de que tratamos seus dados e o acesso a eles;</li>
            <li>a correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>a anonimização, o bloqueio ou a eliminação de dados desnecessários ou tratados em desacordo com a lei;</li>
            <li>a portabilidade dos dados a outro fornecedor;</li>
            <li>a eliminação dos dados tratados com base no seu consentimento;</li>
            <li>informações sobre com quem compartilhamos os seus dados;</li>
            <li>a revogação do consentimento, quando ele for a base do tratamento;</li>
            <li>a oposição a tratamentos feitos com base no legítimo interesse, como lembretes.</li>
          </ul>
          <p>
            Alguns dados, como o prontuário, precisam ser mantidos por obrigação legal mesmo após um pedido de
            eliminação. Nesse caso, explicaremos o motivo.
          </p>
        </>
      ),
    },
    {
      id: "como-exercer",
      title: "9. Como exercer seus direitos",
      body: (
        <p>
          Envie o seu pedido {contactChannel}. Responderemos no prazo previsto na LGPD. Se não ficar satisfeito com a
          resposta, você também pode apresentar uma reclamação à{" "}
          <a href="https://www.gov.br/anpd/pt-br" target="_blank" rel="noopener noreferrer" className={link}>
            Autoridade Nacional de Proteção de Dados (ANPD)
          </a>
          .
        </p>
      ),
    },
    {
      id: "menores",
      title: "10. Crianças e adolescentes",
      body: (
        <p>
          O site e o agendamento são destinados a tutores maiores de idade. Não coletamos intencionalmente dados de
          crianças. Se um menor de idade nos enviar dados, eles serão tratados no melhor interesse da criança ou do
          adolescente, conforme o art. 14 da LGPD.
        </p>
      ),
    },
    {
      id: "alteracoes",
      title: "11. Alterações nesta política",
      body: (
        <p>
          Esta política pode ser atualizada, por exemplo, se o site passar a usar novas ferramentas. A versão em vigor é
          sempre a publicada nesta página, com a data da última atualização indicada no topo.
        </p>
      ),
    },
  ];

  return (
    <>
      <main id="conteudo" className="container-x pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <article aria-labelledby="pagina-titulo" className="min-w-0 lg:col-span-8">
            <header>
              <Breadcrumbs
                trail={[
                  { name: "Início", path: "/" },
                  { name: "Política de privacidade", path: "/privacidade" },
                ]}
              />
              <p className="eyebrow mt-10 flex items-center gap-3 text-sage">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                Privacidade · LGPD
              </p>
              <h1 id="pagina-titulo" className="text-h1 mt-5">
                Política de Privacidade
              </h1>
              <p className="mt-6 text-sm text-ink-muted">
                Última atualização: <time dateTime={UPDATED}>{updated}</time>
              </p>
              {clinic.showPlaceholderNotes && (
                <p className="mt-4">
                  <PendingBadge label="revisar com assessoria jurídica antes de publicar" />
                </p>
              )}
            </header>

            <div className="legal mt-12 grid gap-14">
              {sections.map((section) => (
                <section key={section.id} id={section.id} aria-labelledby={`${section.id}-titulo`}>
                  <h2 id={`${section.id}-titulo`}>{section.title}</h2>
                  {section.body}
                </section>
              ))}
            </div>
          </article>

          <aside className="hidden lg:col-span-4 lg:block" aria-label="Navegação da página">
            <div className="sticky top-28">
              <Toc items={sections.map((s) => ({ id: s.id, label: s.title.replace(/^\d+\.\s*/, "") }))} />
            </div>
          </aside>
        </div>
      </main>
      <MotionRoot />
    </>
  );
}
