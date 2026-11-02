# 065-busca-filtros-paginacao-blog
## Objetivo
Permitir encontrar e retomar receitas em um blog grande, com busca, categorias e páginas rastreáveis.
## Contexto Técnico e referências
Angular 22/SSG, catálogo público e categorias existentes, sem novos conteúdos. ../../memory/produto.md, ../../memory/contexto-tecnico.md, ../../memory/estrutura.md, ../../shared/diretrizes-de-frontend.md. Guia oficial Google: https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading .
## Escopo e premissas
12 receitas por página, ordenação determinística por publicação decrescente/slug. Busca por título/descrição/ingredientes sem distinção de acento ou caixa, combinada com categoria. Campos q/categoria na query, persistidos em navegação/voltar; pesquisar/trocar categoria volta à página 1. Biblioteca única sem repetir receita em múltiplos grupos. Sem categorias vazias, com identificação nos cards.
Links reais para /comidinhas/ e /comidinhas/pagina/N/, com canonical próprio nas páginas não filtradas. Gerar todas as páginas existentes no SSG a cada build; descoberta automática no sitemap. Nunca depender de botão/scroll para robô encontrar páginas. Busca/filtros noindex e canonical da sequência base; não gerar combinações de filtros no build. Página 1 usa raiz; página inválida/inexistente mostra 404 noindex. Nenhuma receita/draft criada/publicada, sem backend/dependência/deploy. Conteúdo ainda usa catálogo compilado no bundle; paginação reduz DOM/HTML, não divide download de dados neste estágio.
## Critérios de aceite
Busca sem acentos e categoria combináveis, contagem e vazio/reset claros, URL restaura seleção; sequência tem até 12 por página, sem perdas/duplicações; links preservam filtros e levam a páginas válidas. Canonical e robots corretos. Build cria todas as páginas necessárias e links HTML cobrem catálogo. Mobile/teclado sem overflow; breadcrumb/menu/CTA/área paga preservados.
## Tasks
- [x] Criar regras de consulta/paginação e parâmetros SSG com testes para catálogo maior e limites.
  > ✅ 2026-11-02 19:17 UTC — library-navigation.ts implementa busca normalizada por acento/caixa, título/descrição/ingredientes, categoria, ordenação estável e paginação de 12. Cinco testes focados aprovados com fixtures de 25 itens: 12/12/1 sem perdas/duplicações, combinação de filtros, limites, URLs e janela de navegação.
- [x] Integrar busca/filtros/links/estado de URL ao blog e corrigir reconhecimento do shell em rotas paginadas.
  > ✅ 2026-11-02 19:17 UTC — MealsComponent usa query q/categoria e rota de página para estado, busca explícita e links de categoria/paginação. Navegar filtro/busca volta à raiz; números/Anterior/Próxima preservam seleção. Estado vazio/limpar e contagem acessíveis. Shell só reconhece slug completo de receita, não rotas paginadas.
- [x] Gerar sequência SSG, adaptar validações de cobertura/SEO e validar build/testes.
  > ✅ 2026-11-02 19:17 UTC — Rotas SSG geram páginas 2..N conforme tamanho publicado; canonical próprio e index para sequência, filtros/buscas noindex com canonical da sequência base. Primeira tentativa gerou shell de redirect da página 1: removida rota de redirect; alias de página 1 agora CSR noindex/canonical raiz. Build/postbuild aprovados; verificação DOM cobre todas as páginas/receitas/categorias e links sequenciais. Com 1 receita não há página 2 vazia.
- [x] Conferir navegador desktop/mobile, busca/vazio/retorno e documentar limites; revisar encerramento local.
  > ✅ 2026-11-02 19:17 UTC — Navegador confirmou busca limao→receita com limão, combinação Massas, URL/robots/canonical, vazio chocolate, retorno restaurando input/categoria, abertura de receita e página 2 inexistente noindex. Mobile 390x844, width/scrollWidth 375; desktop conferido. Nenhuma receita nova. Modelo e URLs de páginas futuras verificados em fixtures; não se fabricou conteúdo para exibir paginação real no acervo de 1 item.
## Revisão spec
Modo spec aprovado. Paginação tradicional atende pedido sem acumular DOM indefinidamente. Query de filtros não deve criar páginas indexáveis duplicadas; canonical próprio para cada página de sequência. Evitar página 2 vazia com acervo atual de uma receita; teste de catálogo maior usa fixtures somente nos testes. Não alterar coleções/editorial/checkout. Validação autorizada pelo usuário e fluxo existente.
## Encerramento
> ✅ 2026-11-02 19:17 UTC — Revisão local concluída. Validações e limites registrados nas tasks. Memória/plano/guia editorial atualizados; sem commit, push ou deploy. Não houve pesquisa OpenSEO nem criação de novos conteúdos.
