/**
 * Mapa do Google incorporado. Com loading="lazy", o navegador só baixa o
 * iframe quando a seção de contato se aproxima da tela.
 */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className="aspect-[16/10] w-full rounded-card border-0 bg-mint"
    />
  );
}
