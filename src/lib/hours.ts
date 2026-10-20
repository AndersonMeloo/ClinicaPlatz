import type { Address, OpeningHours, Weekday } from "@/config/clinic";

const DAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"] as const;

/** "08:00" → "8h", "08:30" → "8h30" */
export function formatTime(time: string): string {
  const [h, m] = time.split(":");
  return `${Number(h)}h${m && m !== "00" ? m : ""}`;
}

function formatDays(days: Weekday[]): string {
  const sorted = [...days].sort((a, b) => a - b);
  const consecutive = sorted.every((d, i) => i === 0 || d === sorted[i - 1] + 1);
  if (sorted.length > 2 && consecutive) {
    return `${DAY_NAMES[sorted[0]]} a ${DAY_NAMES[sorted[sorted.length - 1]].toLowerCase()}`;
  }
  return sorted.map((d, i) => (i === 0 ? DAY_NAMES[d] : DAY_NAMES[d].toLowerCase())).join(", ");
}

export function formatHours(hours: OpeningHours[]): { days: string; time: string }[] {
  return hours.map((h) => ({ days: formatDays(h.days), time: `${formatTime(h.opens)} às ${formatTime(h.closes)}` }));
}

/** Dia da semana atual no horário de Brasília. */
export function todayInBrazil(now = new Date()): Weekday {
  const short = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "America/Sao_Paulo" }).format(now);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(short) as Weekday;
}

export function hoursForDay(hours: OpeningHours[], day: Weekday): OpeningHours | undefined {
  return hours.find((h) => h.days.includes(day));
}

export function formatAddress(a: Address): { line1: string; line2: string } {
  return {
    line1: `${a.street}, ${a.number}${a.complement ? `, ${a.complement}` : ""}`,
    line2: `${a.district}, ${a.city}/${a.state}${a.postalCode ? ` · CEP ${a.postalCode}` : ""}`,
  };
}

function addressQuery(a: Address): string {
  return `${a.street}, ${a.number}, ${a.district}, ${a.city} - ${a.state}${a.postalCode ? `, ${a.postalCode}` : ""}`;
}

export function mapsSearchUrl(a: Address): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressQuery(a))}`;
}

/** Incorporação simples do Google Maps a partir do endereço (sem chave de API). */
export function mapsEmbedUrl(a: Address): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(addressQuery(a))}&output=embed`;
}
