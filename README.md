# Platz Vet: site institucional

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, SplitText, DrawSVG) · Lucide.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run lint
npm run typecheck
```

## Onde editar o conteúdo

Todos os dados da clínica ficam em `src/config/clinic.ts`: nome, WhatsApp, telefone, endereço, horários, redes sociais, serviços, etapas do atendimento, galeria e perguntas frequentes.

- Valores ainda não confirmados ficam `null` ou com `confirmed: false`. O site esconde o item ou mostra o selo "a confirmar".
- **WhatsApp:** preencha `whatsapp.number` só com dígitos, no formato `55` + DDD + número. Enquanto for `null`, o formulário abre o WhatsApp sem destinatário (modo demonstração).
- **Mapa:** o link "Abrir no mapa" e o mapa incorporado são gerados a partir do endereço. O mapa aparece direto e só é baixado quando a seção de contato se aproxima da tela. Para usar outra URL, preencha `mapsUrl` ou `mapEmbedUrl`.
- **Publicação:** troque `showPlaceholderNotes` para `false` antes de publicar. Isso remove os selos e os avisos de fotos provisórias.
- **URL do site:** defina `NEXT_PUBLIC_SITE_URL`. Ela é usada em metadata, sitemap e robots.
- **Dados estruturados:** o JSON-LD de negócio local é gerado com endereço e telefone (o do WhatsApp, se não houver fixo). Os horários entram assim que `hours` for preenchido.

## Páginas de SEO

As páginas de serviço (`/servicos/*`), o hub `/servicos` e `/petlove` são geradas a partir de `src/content/landing-pages.ts`. O mapa das palavras contratadas, as palavras descartadas e o plano do blog no WordPress estão em [docs/seo-palavras-chave.md](docs/seo-palavras-chave.md).

## Imagens e vídeos

Ficam em `public/images/` e `public/videos/`.

- **Do Instagram da clínica:** fachada, farmácia, quadros dos vídeos (recepção, consultório, pacientes, materiais dos serviços) e os dois vídeos (`apresentacao.mp4` e `servicos.mp4`, comprimidos para web).
- **`servico-*-fundo.jpg`:** montagens com fundo desfocado, usadas na vitrine de serviços do desktop.
- **Banco de imagens (Unsplash):** três fotos do bloco "Como é o atendimento" ainda são de banco e estão marcadas como `provisional: true`.
- **Logo:** é um recorte de 150 px. Substitua pelo arquivo vetorial oficial quando ele chegar.
- **Vídeos originais:** os arquivos `platzvetclinicaveterinaria_*.mp4` na raiz de `public/` não são usados pelo site e podem ser movidos para fora da pasta.
