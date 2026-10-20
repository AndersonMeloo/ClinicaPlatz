/**
 * Traço contínuo com um coração: assinatura gráfica inspirada no desenho em
 * linha do logo. Quando houver o logo vetorial, o path pode vir dele.
 * `data-signature` permite ao MotionRoot desenhá-lo (DrawSVG).
 */
export function SignatureLine({ className = "", trigger = "load" }: { className?: string; trigger?: "load" | "scroll" }) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      data-signature={trigger}
    >
      <path
        d="M4 176C84 180 162 166 206 136C184 120 158 100 164 76C170 52 200 50 206 74C212 50 242 52 248 76C254 100 228 120 206 136C252 162 338 166 396 112"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
