import { clinic } from "@/config/clinic";

export interface BookingRequest {
  tutor: string;
  pet: string;
  species: string;
  reason: string;
  /** Relato do tutor: o que está acontecendo com o animal. */
  details: string;
}

/** Apenas dígitos; `null` se o número não estiver configurado ou for inválido. */
export function whatsappNumber(): string | null {
  const digits = clinic.whatsapp.number?.replace(/\D/g, "") ?? "";
  return digits.length >= 12 && digits.length <= 13 ? digits : null;
}

/** "5511947745799" → "(11) 94774-5799" */
export function whatsappDisplay(): string | null {
  const n = whatsappNumber();
  if (!n) return null;
  const local = n.slice(2);
  const ddd = local.slice(0, 2);
  const rest = local.slice(2);
  return `(${ddd}) ${rest.slice(0, rest.length - 4)}-${rest.slice(-4)}`;
}

/**
 * Link oficial do WhatsApp (https://wa.me/<número>?text=...).
 * Sem número configurado, gera https://wa.me/?text=... e o usuário escolhe o contato.
 */
export function buildWhatsAppUrl(message: string): string {
  const number = whatsappNumber();
  return `https://wa.me/${number ?? ""}?text=${encodeURIComponent(message)}`;
}

export function buildBookingMessage(r: BookingRequest): string {
  const lines = [
    `Olá! Gostaria de uma consulta na ${clinic.name}.`,
    "",
    `Nome do tutor: ${r.tutor.trim()}`,
    `Nome do animal: ${r.pet.trim()}`,
    `Espécie: ${r.species.trim()}`,
    `Motivo do contato: ${r.reason.trim()}`,
    "",
    "O que está acontecendo:",
    r.details.trim(),
    "",
    "Quando posso levar o meu pet?",
  ];
  return lines.join("\n");
}

export const defaultWhatsAppMessage = `Olá! Vim pelo site da ${clinic.name} e gostaria de mais informações.`;
