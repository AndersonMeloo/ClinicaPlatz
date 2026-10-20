import type { ReactNode } from "react";
import { clinic, type Photo } from "@/config/clinic";

/** Selo "a confirmar" para conteúdo ainda não validado pela clínica. */
export function PendingBadge({ tone = "light", label = "a confirmar" }: { tone?: "light" | "dark"; label?: string }) {
  if (!clinic.showPlaceholderNotes) return null;
  const colors = tone === "dark" ? "border-leaf/60 text-leaf" : "border-clay-deep/50 text-clay-deep";
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border border-dashed px-2 py-0.5 align-middle text-[0.62rem] font-bold tracking-[0.12em] uppercase ${colors}`}
    >
      {label}
    </span>
  );
}

/** Texto provisório entre colchetes, ex.: [Nome do veterinário]. */
export function PendingText({ children }: { children: ReactNode }) {
  return <span className="text-ink-muted/80 italic">[{children}]</span>;
}

/** Etiqueta sobre fotos de banco de imagens. */
export function ProvisionalTag({ photo, label = "" }: { photo: Photo; label?: string }) {
  if (!photo.provisional || !clinic.showPlaceholderNotes) return null;
  return (
    <span className="absolute top-4 left-4 z-10 rounded-full bg-paper/85 px-3 py-1 text-[0.68rem] font-semibold tracking-wide text-forest backdrop-blur-sm">
      {label}
    </span>
  );
}
