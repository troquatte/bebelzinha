# 059 — Auditoria SEO, breadcrumb/schema e utensílios

## Objetivo/escopo
Auditar lista solicitada: description, links internos, sitemap/robots automáticos, meta robots/noindex, canonical, tamanho e dados estruturados. Completar breadcrumb visível Início/Receitas/receita e JSON-LD Recipe/BreadcrumbList/WebPage, com limpeza ao navegar e sincronização com porção selecionada. Usar só dados reais; sem estrelas, nutrição ou datas de vídeo inventadas. Hreflang não aplicável a site apenas pt-BR; manter html lang. Medir HTML/local assets raw e gzip como artefato, sem chamar de tráfego real ou Core Web Vitals. Incluir lastmod de receitas pelas datas editoriais conhecidas. Atualizar meta título/descrição para opções 1/2/4 existentes.

Pedido adicional: seção Utensílios que ajudam igual referência, com Potes/Formas/Etiquetas e espaços reservados a afiliados Shopee. Sem produtos/preços/links inventados ou Product/Offer schema. Área também permanece em impressão. Não recolocar adição à lista ou texto removido. Não alterar os cards/layout aprovados além do breadcrumb e da seção pedida.

## Referências
../../memory/estrutura.md; ../../shared/diretrizes-de-frontend.md; https://developers.google.com/search/docs/appearance/structured-data/recipe; https://developers.google.com/search/docs/appearance/structured-data/breadcrumb; https://developers.google.com/search/docs/specialty/international/localized-versions.

## Aceite/tasks
- [x] Registrar auditoria inicial e escopo sem marcar itens existentes como ausentes.
- [x] Implementar breadcrumb e JSON-LD dinâmico coerente com conteúdo/porção, sem vazar para outras rotas.
- [x] Gerar lastmod confiável e relatório de tamanho, mantendo sitemap/robots/noindex/canonical corretos.
- [x] Adicionar os três espaços de utensílios no padrão pedido, sem links falsos.
- [x] Validar build/artefatos/navegação e documentar aplicabilidade/limitações da auditoria.

## Revisão spec
Aceita. Continuação autorizada do SEO e pedido explícito de utensílios. Manter layout recente. Dados estruturados avaliados localmente; teste remoto Rich Results e indexação após deploy não serão declarados executados.

## Encerramento
Concluída localmente. Build e postbuild aprovados, git diff --check limpo. HTML SSG e auditoria automática aprovados; navegador confirmou schema para duas porções, restauração e remoção ao navegar para biblioteca, sem erros. Três cards conferidos visualmente. HTML 118,4 KiB raw/20,6 KiB gzip calculado; recursos locais diretos 591,2/282,8 KiB, excluindo externos e dependências transitivas. Sem deploy ou validação remota no Google.
