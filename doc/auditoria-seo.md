# Auditoria SEO local

Saída de produção inspecionada; não é auditoria do domínio publicado.

| Item | Resultado |
|---|---|
| Breadcrumbs | Início → Receitas → receita; visível e BreadcrumbList |
| Meta description | Única e específica, conferida no HTML |
| Links internos | Breadcrumb, biblioteca e navegação; sem links para rascunhos |
| XML sitemap | Automático, 8 URLs; lastmod editorial de receitas |
| Robots.txt | Automático, referência ao sitemap e crawl permitido para ler noindex |
| Meta robots / noindex | Receita index,follow; áreas pessoais/testes/drafts fora do índice e sitemap |
| Canonical | HTTPS de produção, barra final, sem parâmetros |
| Schema.org | Recipe, HowToStep, BreadcrumbList e WebPage, sem avaliações/dados inventados |
| Hreflang | Não aplicável: só pt-BR, sem variantes reais; html lang pt-BR presente |
| Afiliados Shopee | Três slots visuais; sem links/produtos ou schema Product/Offer fictícios |

## Tamanho dos artefatos

| Página | HTML bruto | HTML gzip calculado | Assets locais declarados no HTML | Assets brutos | Assets gzip calculado |
|---|---|---|---|---|---|
| /comidinhas/bolo-de-banana-na-airfryer-com-farinha-de-trigo | 133.1 KiB | 22.2 KiB | 13 | 977.7 KiB | 657.4 KiB |
| /comidinhas/abobrinha-recheada-com-carne-moida | 148.9 KiB | 24.8 KiB | 13 | 1028.4 KiB | 706.3 KiB |
| /comidinhas/macarrao-ao-limao-sem-creme-de-leite | 127.8 KiB | 22.3 KiB | 13 | 1019.7 KiB | 696.7 KiB |

Gzip é compressão calculada localmente, não confirmação de transferência/compressão no servidor. Assets contam referências diretas únicas do HTML, não dependências transitivas dos módulos ou recursos carregados depois. YouTube, fontes e analytics externos não estão somados; o peso completo e Core Web Vitals exigem medição de navegação em ambiente publicado. Os tamanhos não são uma tag SEO.

## Validação e limites
JSON-LD parseado e conferido contra o conteúdo visível, âncoras, quantidades da porção-base e datas reais do editorial. Navegação/seleção devem manter o schema coerente e limpá-lo em outras páginas. Rich Results Test remoto, Search Console, rastreamento/indexação e PageSpeed de produção não foram executados. Não há promessa de rich result ou ranking. VideoObject não foi inventado sem metadados editoriais completos de upload.

Fontes: https://developers.google.com/search/docs/appearance/structured-data/recipe e https://developers.google.com/search/docs/appearance/structured-data/breadcrumb e https://developers.google.com/search/docs/specialty/international/localized-versions.
