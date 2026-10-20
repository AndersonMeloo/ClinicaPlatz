# Platz Vet: palavras contratadas e SEO semântico

Volumes e dificuldade (KD) do Semrush, base Brasil, consultados em outubro de 2026. Para termos locais de cauda longa, o Semrush não tem amostra ("s/d"). Isso é comum em cidade média e não quer dizer que não há busca. Acompanhe esses termos pelo Google Search Console e por um rastreador de posição local.

## Arquitetura

```
Home: pilar "clínica veterinária em Guarulhos"
├── /servicos: hub "serviços veterinários em Guarulhos"
│   ├── /servicos/consulta-veterinaria
│   ├── /servicos/vacinacao
│   ├── /servicos/exames-veterinarios
│   ├── /servicos/hidratacao
│   └── /servicos/farmacia-veterinaria
├── /petlove
├── /consulta: formulário (aceita ?servico=)
└── /contato: NAP + mapa, intenção local e de bairro

Blog no WordPress: posts informativos que linkam para as páginas acima
```

Cada palavra contratada tem uma página dona, para que duas páginas do site não disputem o mesmo termo (canibalização). O conteúdo das páginas fica em `src/content/landing-pages.ts`.

## As 14 palavras contratadas

| # | Palavra | Volume | KD | Página-alvo | Onde aparece |
|---|---|---|---|---|---|
| 1 | clínica veterinária guarulhos | 480 | 16 | `/` | title, H1, schema |
| 2 | clínica veterinária em guarulhos | 480 | 34 | `/` | title, H1, meta description |
| 3 | veterinário guarulhos | 390 | 14 | `/` | seção "O veterinário", schema Person |
| 4 | consulta veterinária em guarulhos | s/d | – | `/servicos/consulta-veterinaria` | title, H1 |
| 5 | vacina para cachorro em guarulhos | s/d | – | `/servicos/vacinacao` | title, meta, H2 |
| 6 | vacinação em guarulhos | s/d | – | `/servicos/vacinacao` | H1, intro |
| 7 | exames veterinários em guarulhos | s/d | – | `/servicos/exames-veterinarios` | title, H1 |
| 8 | exame de sangue para cachorro em guarulhos | s/d (nacional: 260) | – | `/servicos/exames-veterinarios` | meta, H2 |
| 9 | hidratação para cachorro em guarulhos | s/d | – | `/servicos/hidratacao` | title, meta |
| 10 | farmácia veterinária em guarulhos | 10–20 | 0 | `/servicos/farmacia-veterinaria` | title, H1 |
| 11 | petlove guarulhos | 110 | 29 | `/petlove` | title, H1 |
| 12 | clínica veterinária petlove guarulhos | s/d | – | `/petlove` | H1 |
| 13 | clínica veterinária continental guarulhos | s/d | – | `/contato` | title, H2, endereço |
| 14 | serviços veterinários em guarulhos | s/d | – | `/servicos` | title, H1 |

**Termos "perto de mim"** (não contratar, porque dependem da distância de quem busca): "clínica veterinária perto de mim" (5.400), "veterinário perto de mim" (2.400) e "farmácia veterinária perto de mim" (480). Quem ranqueia para eles é o Perfil da Empresa no Google, apoiado pelas páginas `/contato` e `/`.

## Página extra: pets não convencionais

Fonte: vídeo oficial da clínica com a médica veterinária Letícia Amaro (roedores, aves, répteis e animais silvestres, mediante agendamento). Página: `/servicos/pets-nao-convencionais`.

| Palavra | Volume | KD | Onde aparece |
|---|---|---|---|
| veterinário de pets não convencionais em guarulhos | s/d | – | title, H1 |
| veterinário de animais silvestres em guarulhos | s/d (nacional: 110) | – | meta, intro, FAQ |
| veterinário de aves em guarulhos | 20 (nacional: 390) | 0 | lista de espécies, FAQ |

Pautas de blog com potencial: "veterinário de aves" (390 / KD 8), "veterinário para pássaros" (210 / 11), "pets não convencionais" (170 / 12).

## Descartadas

| Termo | Volume | Motivo |
|---|---|---|
| hospital veterinário guarulhos (e variações) | 260 | A Platz Vet é clínica, não hospital |
| veterinário guarulhos gratuito / público | 260 | A clínica não é gratuita nem pública |
| clínica veterinária 24 horas guarulhos | 20–50 | Não atende 24 horas |
| castração guarulhos | 320 | Serviço não confirmado. Entra se a clínica confirmar |
| laboratório veterinário guarulhos | 20 | Não há confirmação de laboratório próprio |

## Pendentes de confirmação com a clínica

- **Atendimento de gatos:** liberaria "veterinário para gatos em Guarulhos" e "vacina para gato em Guarulhos".
- **Bairro:** o Google mostra "Jardim Betel, 07084-300" para o endereço. Se a clínica confirmar, inclua o bairro e o CEP em `clinic.address`.
- **Vacinas aplicadas:** quais a clínica aplica (V8, V10, antirrábica, gripe). A página hoje fala delas só de forma educativa.
- **Credenciamento Petlove:** se é rede credenciada, o que permitiria usar "clínica credenciada Petlove".
- **Revisão técnica:** o Dr. Gustavo deve revisar os textos de saúde das páginas de serviço.

## SEO semântico já implementado

- **Grafo de entidades (JSON-LD):** todas as páginas descrevem a mesma clínica (`VeterinaryCare`, com o mesmo `@id`), ligada a:
  - `Person` (Gustavo Platz Boccia, fundador);
  - `WebSite`;
  - `City` Guarulhos (com `sameAs` na Wikipedia).

  Cada página acrescenta as entidades dela:
  - `Service` (provider = clínica, areaServed = Guarulhos);
  - `FAQPage`;
  - `BreadcrumbList`;
  - `CollectionPage`, no hub de serviços.
- **Catálogo de serviços:** `hasOfferCatalog` da clínica aponta para as URLs dos serviços.
- **Termos do tópico:** cada página cobre os termos e as entidades relacionados (ex.: vacinação → V8, V10, antirrábica, cinomose, parvovirose, reforço anual, filhote). Eles também entram em `keywords` no schema.
- **Headings:**
  - um H1 por página, com a palavra principal;
  - H2 por subtópico;
  - perguntas frequentes como H3 dentro de `<details>`.
- **Links internos:**
  - **Vitrine da home:** link "Saiba mais" com âncora descritiva.
  - **Rodapé:** coluna "Serviços em Guarulhos", presente em todas as páginas.
  - **Páginas de serviço:** bloco "Veja também" no fim de cada uma.
  - **Navegação:** trilha de navegação no topo de cada página.
- **Nome, endereço e telefone iguais em todo o site:** o cartão com essas informações aparece em todas as páginas de serviço, no rodapé e no contato.
- **Conversão:** cada página de serviço leva a `/consulta?servico=<id>`, que abre o formulário com o serviço já selecionado.
- **Formato de artigo:** cada página tem trilha de navegação, categoria, data de atualização (`dateModified` no schema), tempo de leitura e índice "Nesta página" com âncoras por seção. O campo `reviewedBy` mostra "Revisado por" e entra no schema assim que o veterinário revisar o texto.

## Blog no WordPress: plano de conteúdo

Volumes nacionais (Semrush BR). Cada post ataca um termo informativo e passa autoridade para a página-alvo.

| Post sugerido | Termo principal (vol. / KD) | Termos de apoio | Linkar para | Âncora sugerida |
|---|---|---|---|---|
| Vacina V10: para que serve e quando aplicar | vacina v10 (6.600 / 33) | vacina v10 preço (2.400) | `/servicos/vacinacao` | vacina para cachorro em Guarulhos |
| V8 ou V10: qual a diferença? | vacina v8 (2.900 / 16) | vacina v10 | `/servicos/vacinacao` | vacinação em Guarulhos |
| Vacina para filhote de cachorro: calendário e cuidados | vacina para filhote de cachorro (880 / 19) | quando vacinar filhote (110), calendário de vacinação (70) | `/servicos/vacinacao` | vacinar seu filhote na Platz Vet |
| Vacina de raiva para cachorro: quando reforçar | vacina de raiva para cachorro (590 / 14) | antirrábica | `/servicos/vacinacao` | vacina para cachorro em Guarulhos |
| Gripe canina: quando a vacina é indicada | vacina gripe cachorro (390 / 19) | tosse dos canis | `/servicos/vacinacao` | vacinação veterinária |
| Exame de sangue em cachorro: o que o hemograma mostra | exame de sangue cachorro (260 / 9) | hemograma cachorro (170), preço (70) | `/servicos/exames-veterinarios` | exame de sangue para cachorro em Guarulhos |
| Cachorro desidratado: sinais e o que fazer | cachorro desidratado o que fazer (90 / 17) | soro para cachorro desidratado (90), hidratação cachorro (70) | `/servicos/hidratacao` | hidratação para cachorro em Guarulhos |
| Gato desidratado: como identificar | gato desidratado (170 / 15) | sintomas de desidratação | `/servicos/hidratacao` | hidratação veterinária |
| Fluidoterapia em cães: como funciona | fluidoterapia em cães (90 / 11) | soro subcutâneo | `/servicos/hidratacao` | hidratação para pets em Guarulhos |
| Quanto custa uma consulta veterinária? O que influencia o valor | consulta veterinária preço (110 / 11) | consulta veterinária (320) | `/servicos/consulta-veterinaria` | consulta veterinária em Guarulhos |
| Por que não medicar o pet por conta própria | farmácia veterinária (5.400 / 27) | farmácia veterinária perto de mim (480) | `/servicos/farmacia-veterinaria` | farmácia veterinária em Guarulhos |
| Rede credenciada Petlove: como usar o plano | rede credenciada petlove (1.000 / 36) | petlove saúde (1.900), plano de saúde pet (14.800) | `/petlove` | atendimento Petlove em Guarulhos |
| Vacinação de gatos: V4, V5 e antirrábica *(só após confirmar gatos)* | vacinação de gatos (720 / 22) | vacina v5 gato (210), v4 (90) | `/servicos/vacinacao` | vacinação em Guarulhos |

### Link de agendamento

O formulário fica em `/consulta`. Com `?servico=`, ele já abre com o serviço escolhido:

| Uso | Link |
|---|---|
| Bio do Instagram, Perfil da Empresa no Google | `/consulta` |
| Posts de vacinação | `/consulta?servico=vacinacao` |
| Posts de exames | `/consulta?servico=exames` |
| Posts de hidratação | `/consulta?servico=hidratacao` |
| Posts de consulta | `/consulta?servico=consulta` |
| Posts da farmácia | `/consulta?servico=farmacia` |

Use esse link no botão de chamada (CTA) ao final de cada post do blog. Os links de conteúdo (âncoras com a palavra contratada) continuam apontando para as páginas de serviço.

### Regras de link do WordPress para o site

1. **Links, não redirecionamentos:** os posts do WordPress devem **linkar** para as páginas do site, e não ser redirecionados (301) para elas. Um post redirecionado deixa de existir para o Google e não passa relevância de conteúdo.
2. **Quantidade por post:** 2 a 3 links, sendo um para a página-alvo (âncora com a palavra contratada), um para a home ("clínica veterinária em Guarulhos") e, quando fizer sentido, um para `/contato`.
3. **Âncoras variadas:** cerca de 1/3 exatas ("vacina para cachorro em Guarulhos"), 1/3 parciais ("vacinar o cachorro em Guarulhos") e 1/3 de marca ou naturais ("na Platz Vet").
4. **Endereço do blog:** de preferência em `blog.` no mesmo domínio, ou em `/blog` com proxy reverso. Se ficar em outro domínio, os links funcionam como backlinks externos.
5. **Links entre posts:** cada post linka para pelo menos um post do mesmo cluster.
6. **Rodapé ou sidebar do blog:** repita o nome, o endereço e o WhatsApp exatamente como estão no site.

## Perfil da Empresa no Google (essencial para "perto de mim")

- Categoria principal "Veterinário", com nome, endereço e telefone idênticos aos do site.
- Serviços cadastrados com os mesmos nomes das páginas, e o link do site apontando para a home. Use UTM para separar esse tráfego.
- Fotos reais: fachada, recepção, consultório e farmácia.
- Postagens semanais reaproveitando os posts do blog.
- Pedido de avaliação aos tutores após o atendimento. Responder a todas.
- Horários preenchidos. No site, eles entram em `clinic.hours` e geram o schema automaticamente.

## Antes de publicar

- [ ] Definir `NEXT_PUBLIC_SITE_URL` com o domínio final. Hoje canônicas, sitemap e schema usam `http://localhost:3000`.
- [ ] Trocar `showPlaceholderNotes` para `false` em `src/config/clinic.ts`.
- [ ] Cadastrar o site no Google Search Console e enviar `/sitemap.xml`.
- [ ] Validar o schema no Rich Results Test e no Schema Markup Validator.
- [ ] Preencher os horários e revisar os textos de saúde com o veterinário.
