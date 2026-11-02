# Auditoria SEO local

Saída de produção inspecionada; não é auditoria do domínio publicado.

| Item | Resultado |
|---|---|
| Breadcrumbs | Início → Receitas → receita; visível e BreadcrumbList |
| Meta description | Única e específica, conferida no HTML |
| Links internos | Breadcrumb, biblioteca e navegação; sem links para rascunhos |
| XML sitemap | Automático, 6 URLs; lastmod editorial de receitas |
| Robots.txt | Automático, referência ao sitemap e crawl permitido para ler noindex |
| Meta robots / noindex | Receita index,follow; áreas pessoais/testes/drafts fora do índice e sitemap |
| Canonical | HTTPS de produção, barra final, sem parâmetros |
| Schema.org | Recipe, HowToStep, BreadcrumbList e WebPage, sem avaliações/dados inventados |
| Hreflang | Não aplicável: só pt-BR, sem variantes reais; html lang pt-BR presente |
| Afiliados Shopee | Três slots visuais; sem links/produtos ou schema Product/Offer fictícios |

## Tamanho dos artefatos

| Página | HTML bruto | HTML gzip calculado | Assets locais declarados no HTML | Assets brutos | Assets gzip calculado |
|---|---|---|---|---|---|
| /comidinhas/macarrao-ao-limao-sem-creme-de-leite | 127.0 KiB | 22.1 KiB | 13 | 1002.1 KiB | 692.1 KiB |

Gzip é compressão calculada localmente, não confirmação de transferência/compressão no servidor. Assets contam referências diretas únicas do HTML, não dependências transitivas dos módulos ou recursos carregados depois. YouTube, fontes e analytics externos não estão somados; o peso completo e Core Web Vitals exigem medição de navegação em ambiente publicado. Os tamanhos não são uma tag SEO.

## Validação e limites
JSON-LD parseado e conferido contra o conteúdo visível, âncoras, quantidades da porção-base e datas reais do editorial. Navegação/seleção devem manter o schema coerente e limpá-lo em outras páginas. Rich Results Test remoto, Search Console, rastreamento/indexação e PageSpeed de produção não foram executados. Não há promessa de rich result ou ranking. VideoObject não foi inventado sem metadados editoriais completos de upload.

Fontes: https://developers.google.com/search/docs/appearance/structured-data/recipe e https://developers.google.com/search/docs/appearance/structured-data/breadcrumb e https://developers.google.com/search/docs/specialty/international/localized-versions.
