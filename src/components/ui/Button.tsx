import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-cream hover:bg-forest-deep",
  outline: "border border-forest/25 text-forest hover:border-forest hover:bg-forest/[0.04]",
  light: "bg-cream text-forest hover:bg-paper",
  "outline-light": "border border-cream/30 text-cream hover:border-cream hover:bg-cream/[0.06]",
};

export function buttonClass(variant: Variant = "primary", className = ""): string {
  return [
    "group inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6",
    "text-[0.95rem] font-semibold tracking-[-0.005em] whitespace-nowrap",
    "transition-[background-color,border-color,color,transform] duration-300 ease-soft active:scale-[0.98]",
    variants[variant],
    className,
  ].join(" ");
}

type ButtonLinkProps = ComponentProps<"a"> & { variant?: Variant };

export function ButtonLink({ variant, className, children, ...props }: ButtonLinkProps) {
  return (
    <a className={buttonClass(variant, className)} {...props}>
      {children}
    </a>
  );
}
