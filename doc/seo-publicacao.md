# SEO e publicação automática

## Fluxo
O comando npm run build compila o Angular e executa automaticamente o postbuild. O workflow pages.yml já usa esse comando antes de enviar a pasta dist/bebelzinha/browser ao GitHub Pages. Não editar sitemap.xml ou robots.txt à mão e não copiar arquivos antigos por cima da saída.

1. Angular gera páginas SSG públicas com conteúdo e metadados.
2. generate-pages.mjs gera somente shells das rotas CSR conhecidas e fallback 404 noindex. Mantém o corpo/hidratação do Angular; não cria páginas a partir do catálogo legado sem rota.
3. seo-artifacts.mjs descobre todos os index.html indexáveis reais, valida metadados e gera sitemap.xml e robots.txt na raiz da saída.
4. validate-prerender.mjs e validate-seo.mjs conferem artefatos, XML, exclusões e simulação isolada de inclusão/remoção de um post. Qualquer falha interrompe o build/deploy.

## Ao adicionar um post nas próximas etapas
Criar o conteúdo público revisado e sua rota Angular, habilitar Prerender (incluindo parâmetros dos slugs quando necessário) e chamar SeoService.update com título, descrição e caminho próprios. Uma imagem específica pode ser passada em image. Com isso, o HTML SSG indexável entra automaticamente no sitemap no mesmo build; não há registro manual de URLs por post. O pipeline rejeita shells vazios e páginas sem metadados/canonical coerentes. Posts em rascunho devem ficar fora do prerender publicado ou usar indexable: false; a exclusão foi testada. Ao remover uma rota/conteúdo do build limpo, a URL sai do sitemap automaticamente.

O modelo editorial, o manifesto de publicações e as páginas completas de receitas serão criados nas etapas 3/4. Esta etapa não publica os JSONs antigos como artigos.

## Política
- Origem, imagem padrão, rotas pessoais e metadata das exceções CSR ficam em src/app/core/seo.config.json.
- Páginas canônicas usam HTTPS, domínio de produção, barra final e nenhum query/hash. O endereço /comidinhas foi consultado por HEAD e retornou 301 para /comidinhas/, confirmando o formato da hospedagem. Assets como sitemap.xml não recebem barra final.
- Home e oferta principal continuam CSR, com shells próprios indexáveis e previews sociais. Não foram convertidas para SSG nesta etapa, por personalização/A-B.
- Compras e subrotas, jantar pago, acesso e variantes A/B são noindex,follow e não entram no sitemap. Variantes apontam o canonical à oferta principal. noindex não é controle de acesso.
- Robots permite rastreamento e aponta o sitemap. Não bloquear essas páginas no robots: o robô precisa ler noindex. JS, CSS e imagens também ficam disponíveis.
- Não são inventados lastmod, priority ou changefreq. Datas editoriais confiáveis poderão alimentar lastmod na etapa de conteúdo.
- Endereços inexistentes mostram uma tela 404 com retorno às receitas. O fallback estático vem noindex e sem canonical da home; a resposta HTTP 404 é responsabilidade do host. Confirmar após deploy: subrotas pessoais dinâmicas ainda usam o fallback estático.

## Validação local
npm run build gera e valida a saída inteira. npm run postbuild repete somente processamento/checagem de um build existente; para refletir exclusão de posts, usar build completo (que limpa dist). Visualizar a pasta dist por servidor estático para conferir a versão publicável; npm start não gera sitemap/robots em tempo real.

## Limites de publicação
Automação é vinculada a build/deploy. Não existe CMS/serviço editorial conectado disparando builds externos. robots e sitemap só ficam atualizados no domínio depois de publicar a nova saída. Search Console/Bing e inspeção de HTTP 404 no domínio novo ficam para a etapa de integração; não houve submissão remota nem deploy nesta entrega.

## Fontes
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

## Fontes editoriais após a etapa 3
O modelo e manifesto estão em `content/editorial/`; não editar `public/content/recipes` (legado movido para revisão). `npm run build` agora começa gerando o catálogo público revisado. Consultar `doc/fluxo-editorial-receitas.md` para status, campos e ligação com getPrerenderParams na primeira página. Publicado sem página SSG/sitemap causa falha no pós-build.

## Revisão 059 — marcação e auditoria automática
Breadcrumb visível Início/Receitas/receita, mais JSON-LD WebPage/BreadcrumbList/Recipe no HTML SSG. O helper recipe-structured-data.ts usa dados editoriais reais; porções e ingredientes acompanham a seleção restaurada no navegador. SeoService remove a marcação ao atualizar outra rota. Sem avaliações, nutrição ou datas de vídeo inventadas; VideoObject depende de metadados completos.

Sitemap recebe lastmod das receitas a partir de updatedAt editorial. O postbuild executa audit-recipe-seo.mjs e gera doc/auditoria-seo.md, verificando metadados, canonical, indexação, breadcrumb, ingredientes/passos e links. Tamanhos são HTML e recursos locais diretamente declarados, raw/gzip calculado: não representam transferência total, recursos externos ou Core Web Vitals. Hreflang não se aplica enquanto existir apenas português brasileiro; html lang permanece pt-BR.

RecipeToolsComponent reserva três cards para Potes/Formas/Etiquetas e mantém os espaços na impressão. Sem produtos ou links comerciais fictícios. Ao cadastrar itens reais da Shopee, incluir identificação de afiliado e rel sponsored nos links (mais noopener/noreferrer ao abrir nova aba), revisar disponibilidade/destino e dados reais antes de qualquer Product/Offer.

Build e postbuild aprovados localmente; navegador confirmou seleção/restauração de porções, limpeza de JSON-LD ao navegar e ausência de erros. Ainda sem deploy, teste remoto Rich Results, Search Console/Bing ou aferição de desempenho em produção.

## CTA editorial — revisão 060
RecipeProductCtaComponent aparece no template de todas as receitas publicadas, depois do preparo/dicas/fontes e antes dos utensílios. Nome/preço/destino vêm de MEAL_PRODUCT; card fica oculto em impressão.

Link interno usa venda=blog-receita e receita=slug. Não há UTMs internos: a aquisição original não é substituída. publicRecipeSource só aceita slugs do catálogo público; ausentes, rascunhos ou inválidos são omitidos. A consulta não transporta códigos nem dados pessoais.

Eventos no AnalyticsService: RecipeProductClick (product_id, source_recipe, sales_campaign, cta_position=after-preparation); ProductSalesView e ProductCheckoutClick mantêm source_recipe junto à variante/campanha. Recarregar/trocar origem não conserva um slug antigo indevidamente. source_recipe representa contexto de clique/visita, não prova de compra. Na análise, filtrar sales_campaign=blog-receita e agrupar por source_recipe. GA4 no localhost segue desativado; não houve validação de ingestão remota ou configuração de dimensão no painel. Esses eventos serão enviados pelas integrações existentes no ambiente publicado quando disponíveis.
