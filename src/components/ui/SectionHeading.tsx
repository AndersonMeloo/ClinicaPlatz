import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  /** "split": no desktop, título à esquerda e texto de apoio à direita. */
  layout?: "stack" | "split";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  tone = "light",
  layout = "stack",
  className = "",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  const split = layout === "split";
  return (
    <div
      className={`${split ? "lg:grid lg:grid-cols-12 lg:items-end lg:gap-10" : "max-w-2xl"} ${className}`}
      data-reveal
    >
      <div className={split ? "max-w-2xl lg:col-span-7" : undefined}>
        <p className={`eyebrow flex items-center gap-3 ${dark ? "text-leaf" : "text-sage"}`}>
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
        <h2 id={id} className="text-h2 mt-5 text-balance">
          {title}
        </h2>
      </div>
      {intro && (
        <p
          className={`mt-6 max-w-[52ch] text-lg leading-relaxed ${dark ? "text-cream/75" : "text-ink-muted"} ${
            split ? "lg:col-span-4 lg:col-start-9 lg:mt-0 lg:pb-2" : ""
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
