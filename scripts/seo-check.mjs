// Verifica os metadados de src/content/seo.ts e gera docs/seo-metadados.md.
// Uso: npm run seo:check            (só verifica)
//      npm run seo:check -- --write (verifica e atualiza o documento)
import { writeFileSync } from "node:fs";
import { seo, BRAND_SUFFIX } from "../src/content/seo.ts";

const MAX_TITLE = 60;
const MAX_DESC = 140;
const KEYWORDS = 5;

const rows = Object.entries(seo).map(([path, m]) => {
  const fullTitle = m.title + BRAND_SUFFIX;
  const problems = [];
  if (fullTitle.length > MAX_TITLE) problems.push(`título com ${fullTitle.length} caracteres (máx. ${MAX_TITLE})`);
  if (m.description.length > MAX_DESC) problems.push(`descrição com ${m.description.length} caracteres (máx. ${MAX_DESC})`);
  if (m.keywords.length !== KEYWORDS) problems.push(`${m.keywords.length} palavras-chave (precisa de ${KEYWORDS})`);
  return { path, fullTitle, ...m, problems };
});

for (const r of rows) {
  const status = r.problems.length ? `ERRO: ${r.problems.join("; ")}` : "ok";
  console.log(`${r.path.padEnd(34)} título ${String(r.fullTitle.length).padStart(2)} · descrição ${String(r.description.length).padStart(3)} · ${r.keywords.length} palavras-chave · ${status}`);
}

if (process.argv.includes("--write")) {
  const doc = [
    "# Platz Vet: metadados de SEO por página",
    "",
    "Gerado a partir de `src/content/seo.ts` com `npm run seo:check -- --write`. Para alterar, edite o arquivo e rode o comando de novo.",
    "",
    `Regras: título completo (com "${BRAND_SUFFIX.trim()}") até ${MAX_TITLE} caracteres · meta description até ${MAX_DESC} caracteres · ${KEYWORDS} palavras-chave por página.`,
    "",
    "| Página | Título | Car. | Descrição | Car. |",
    "|---|---|---|---|---|",
    ...rows.map((r) => `| \`${r.path}\` | ${r.fullTitle} | ${r.fullTitle.length} | ${r.description} | ${r.description.length} |`),
    "",
    "## Palavras-chave por página",
    "",
    ...rows.flatMap((r) => [`### \`${r.path}\``, "", ...r.keywords.map((k, i) => `${i + 1}. ${k}`), ""]),
  ].join("\n");
  writeFileSync(new URL("../docs/seo-metadados.md", import.meta.url), doc);
  console.log("\ndocs/seo-metadados.md atualizado.");
}

if (rows.some((r) => r.problems.length)) process.exit(1);
