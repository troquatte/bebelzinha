# Plano de evolução editorial e SEO da Bebel

## Direção autorizada
Biblioteca pública de receitas vinculadas aos vídeos longos do YouTube. Cada receita distinta terá página completa com vídeo, ingredientes, preparo, lista de compras marcável e chamada contextual para o produto. Shorts recebem SEO na plataforma e só apontam para páginas pertinentes já existentes; não geram páginas de dicas automaticamente. Produto pago tem coleção própria e proposta de organização por dia/semana; não publicar automaticamente o catálogo pago como gratuito nem anunciar organização semanal antes de implementá-la.

## Etapas e critérios de conclusão

1. [x] **SSG e compatibilidade de execução — concluída localmente, spec 051.** Pré-renderizar as rotas públicas existentes com conteúdo real e hidratação; preservar CSR em áreas pessoais e nas páginas de venda com experimento ativo; manter hospedagem estática e fallback. Aceite: build estático, HTML inspecionado, rotas pessoais sem conteúdo pago no artefato público e navegação conferida.
2. [x] **SEO técnico — concluído localmente, spec 052.** Origem canônica de produção, títulos/descrições/imagens por página, canonical coerente, sitemap/robots, 404 e redirecionamentos revisados. Aceite: URLs e metadados conferidos no HTML gerado e validação das regras de indexação. Não incluir URLs pessoais/de acesso no sitemap.
3. [x] **Modelo editorial e biblioteca — concluído localmente, spec 053.** Separar dados de vídeo, receita pública e produto pago; vincular vídeo longo a receita por ID/slug; inventariar e revisar o acervo legado; preservar URLs úteis. Aceite: manifesto editorial validado e nenhuma receita incompleta publicada automaticamente.
4. [x] **Primeira página completa de receita — concluída localmente, spec 054.** Conteúdo revisado, vídeo correspondente, rendimento, ingredientes/preparo marcáveis, acessibilidade e estado local por receita. Aceite: página SSG completa, hidratação sem erros e marcações persistentes verificadas.
5. [x] **Chamada de produto em cada receita — concluída localmente, spec 060.** Componente reutilizável e contextual; oferta/preço/destino centralizados; posicionamento sem obstruir o preparo; medir origem da receita e clique até a oferta. Aceite: navegação e medição conferidas, sem afirmar compra a partir de um clique.
6. [ ] **Editorial SEO de YouTube + site.** Pesquisa de intenção e palavras-chave com OpenSEO quando conectado; uma pauta coordenada com títulos próprios para vídeo e página, links internos e clusters. Aceite: primeiro conjunto priorizado por pesquisa real, sem volume/ranking inventado; Shorts respeitam a regra de não criar páginas.
7. [ ] **Busca e experiências com IA.** Dados estruturados Recipe/VideoObject quando aplicáveis, conteúdo acessível e fontes/editoria claras; Search Console e Bing Webmaster Tools. Aceite: marcação válida e acompanhamento configurado; sem prometer posições/citações.
8. [ ] **Piloto e expansão.** Publicar um conjunto revisado de receitas, observar indexação, impressões, cliques, uso de checklist e compras atribuíveis; corrigir antes de ampliar. Aceite: relatório com dados reais e próximas prioridades.

## Regras de execução
Uma etapa implementada e validada por vez. Não redesenhar páginas nem alterar campanhas, preços, checkout ou catálogo pago durante a configuração do SSG. Atualizar este checklist com evidências; itens futuros não são funcionalidades disponíveis. Cada etapa relevante ganha sua própria spec.

## Evidência da etapa 1
Build de produção e pós-build concluídos: três rotas SSG, catálogo no HTML, origem canônica de produção e fallback CSR conferidos. Navegador: biblioteca, cortadores, canal e transição para compras sem erros de console. Alterações locais na branch `feat/ssg-public-pages`; ainda não publicadas. Alterar `public/content/canal/index.json` requer novo build.

## Pendências de manutenção antes de publicar
- [ ] Revisar os sete alertas do `npm audit` (um baixo, um moderado e cinco altos), incluindo ferramentas de desenvolvimento Angular CLI/build e transitivas; planejar atualização coordenada, sem `--force`/`legacy-peer-deps`. A integração manteve a versão instalada 22.2.1.
- [ ] Avaliar o aviso CommonJS de `sweetalert2`, já usado na lista de compras; não bloqueia o build.
- [x] Etapa 2 removeu a geração de shells legados sem rota; 404 noindex substitui o redirecionamento genérico para home.

## Evidência da etapa 2
Sitemap e robots automáticos no build/deploy, cinco URLs públicas atuais. Simulações isoladas de post novo, removido e noindex aprovadas; canonical/metadados inválidos e shell vazio rejeitados. Canonical com barra final alinhado ao 301 real da hospedagem. Navegador: alternância público/compras, página inexistente e retorno, variante A/B sem indexação; sem erros de console. Build de produção e pós-build aprovados. Guia: `doc/seo-publicacao.md`. Entrega local, sem deploy; integração Search Console/Bing pendente na etapa 7.

## Evidência da etapa 3
21 legados preservados e inventariados fora da pasta pública, integridade confirmada por hash; quatro rascunhos ligados aos quatro vídeos longos. Modelo, categorias e seletores tipados prontos; prebuild gera apenas receitas publicadas completas e revisadas. Testes de transição/erros, exclusão de drafts e build SSG/SEO aprovados; nenhuma receita promovida automaticamente. Produto pago sem diff. Guias: `doc/fluxo-editorial-receitas.md` e `doc/inventario-receitas.md`. Próximo: primeira página completa, rota dinâmica e vínculo visual à biblioteca.

## Evidência da etapa 4
Macarrão ao limão: descrição oficial e transcrição do vídeo conferidas, uma porção e medidas preservadas; execução ilustrada/não testada e tempo variável explicitados. Página dinâmica SSG com capa/vídeo, ingredientes e preparo marcáveis; estado local por receita. Biblioteca inclui link e sitemap gerado tem seis URLs. Compras envia só faltantes compráveis e reutiliza lista sem duplicar. Navegador confirmou persistência/reload, cinco itens esperados, teclado, âncoras, rascunho 404/noindex e mobile sem overflow. Build completo aprovado: quatro rotas SSG, uma receita publicada no catálogo local e três drafts. Sem deploy. Próxima etapa: CTA contextual do produto.

## Complementação pesquisada da etapa 4 — spec 055
Ficha de macarrão ao limão ampliada com referências Panelinha, Cozinha Prática/GNT e Barilla, utensílios, orientações e tempo estimado da base. Seleção 1/2/4 com quantidades e preparo explícitos; água/sal ajustados conforme referência e panela, tempo não multiplicado. Listas e marcações isoladas por porção, incluindo migração da base anterior. Fontes visíveis e obrigatórias para novas publicações. Build e integração aprovados; navegador confirmou persistência e lista de quatro porções com 400g, sem duplicação e sem perder marcações antigas. Permanece próxima a etapa 5: chamada contextual do Refeição Resolvida. Sem deploy.

## Correção visual solicitada — spec 056
Página pública refeita sobre a estrutura do produto: receita dentro do card branco, compras no card lateral, ingredientes numerados, passos com número/check, porções no mesmo padrão e seções recolhíveis. ShoppingChecklist e DinnerActions são os mesmos componentes. Estilos extraídos integralmente para fonte compartilhada e importados pelo produto e pela página pública; público recebe fundo liso e sem shell com bolinhas. Mobile/desktop, atalho compras/topo, porções, persistência e fontes conferidos; build completo aprovado. Prévia local, sem deploy.

## Revisão de apresentação — spec 057
Após comparar com a versão publicada do produto, vídeo foi colocado no topo do card no lugar da capa, sem seção duplicada nem autoplay. Header e controles conferidos visualmente; tema público neutro. Validado em desktop/mobile e build. Revisão local em ?revisao=057; sem deploy.

## Preferências de UI — spec 058
Fundo de página bege liso padronizado; receita com sidebar desktop e mobile preservado. Removidos adição à lista, link e parágrafo indicado. Checklist local e atalhos continuam. Build/HTML e verificação responsiva aprovados; prévia local revisão 058, sem deploy.

## Auditoria e utensílios — spec 059
Description/canonical/robots/noindex e sitemap automáticos já existiam e foram revalidados. Adicionados breadcrumb visível e JSON-LD Recipe/BreadcrumbList/WebPage sincronizado com porções; lastmod editorial e auditoria automática com medidas de HTML/recursos locais. Três espaços de utensílios para futuros afiliados Shopee, sem produtos/links fictícios. Build/postbuild e navegação aprovados. Etapa 7 permanece aberta: VideoObject quando houver dados suficientes, teste remoto e integração Search Console/Bing após publicação. CTA da etapa 5 ainda pendente. Prévia local revisão 059, sem deploy.

## Chamada contextual do produto — spec 060
Card reutilizável com preço centralizado, CTA para oferta e origem por receita pública. RecipeProductClick, ProductSalesView e ProductCheckoutClick carregam source_recipe validado, sem UTMs em links internos e sem afirmar compra. Build/postbuild, três testes focados, DOM SSG e navegação desktop/mobile/teclado/retorno aprovados. Preservadas marcações e preferências visuais. Sem deploy ou validação de ingestão de eventos remotos. Próximo: publicação/revisão em produção e integrações da etapa 7; editorial da etapa 6 depende da pesquisa OpenSEO.

## Biblioteca reorganizada — spec 061
Comidinhas apresenta Shorts primeiro e receitas do blog depois, por categorias com conteúdo publicado. Listagem independente de vídeos longos removida; player permanece dentro da ficha. Hero/metadados atualizados. SSG/SEO e desktop/mobile aprovados, sem deploy.

## Revisões 062–064 e pendências reais de publicação
Onboarding removido, biblioteca somente blog, menu padronizado e banner visual atualizado; A/B existente conferido sem mudar sorteio/rotas. Produção observada em 02/11 ainda diverge: receita/sitemap 404 e jantar interno com index,follow, inclusive renderizado. A aptidão técnica das revisões locais não comprova elegibilidade publicada nem indexação/citações. Prioridades detalhadas em doc/auditoria-producao-ia-indexacao.md: publicar e verificar HTTP/noindex, Search Console/Bing, Rich Results e desempenho móvel. Sem deploy efetuado.
