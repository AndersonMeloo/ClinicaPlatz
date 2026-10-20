/**
 * Link da página de agendamento. Com `serviceId`, o formulário já abre com o
 * serviço selecionado, ex.: /agendamento?servico=vacinacao (útil na bio do
 * Instagram, em posts do blog e em campanhas).
 */
export function bookingHref(serviceId?: string): string {
  return serviceId ? `/agendamento?servico=${encodeURIComponent(serviceId)}` : "/agendamento";
}
