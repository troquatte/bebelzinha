# Estrutura do Projeto

## Estado atual

O repositório começa como uma aplicação Angular 22 simples e deve evoluir incrementalmente.

```text
.
├── .agents/
├── .spec/
├── public/
├── src/
│   ├── app/
│   ├── scss/
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
└── package.json
```

Não antecipar monorepo, múltiplas aplicações, backend ou packages compartilhados sem necessidade concreta.

## SDD

- `.spec/changes` — mudanças ativas e histórico arquivado;
- `.spec/memory` — contexto permanente do produto e da arquitetura;
- `.spec/shared` — regras reutilizáveis;
- `.spec/templates` — modelos para novas specs.

## Frontend

A aplicação fica em `src/app` e deve crescer por domínio/feature quando as funcionalidades surgirem.

Estrutura padrão dos módulos:

```text
src/app/
  core/
  shared/
  modules/
    <feature>/
      components/
      shared/
      service/
      enum/
      interface/
      helpers/
      etc/
```

Dentro de `modules/<feature>`, arquivos não devem ficar soltos na raiz da feature. Cada responsabilidade deve viver na subpasta correspondente. Criar somente as subpastas que tenham conteúdo real; diretórios vazios não são necessários.

### `core`
Responsabilidades realmente globais da aplicação.

### `shared`
Somente código reutilizável, genérico e sem regra de negócio específica.

### `modules/<feature>`
UI, estado e serviços ligados a uma área funcional do produto.

Organização:
- `components/` — componentes Angular e seus templates/estilos;
- `service/` — services, stores e orquestração da feature;
- `interface/` — contratos, models e tipos de domínio da feature;
- `enum/` — enums quando existirem;
- `helpers/` — funções auxiliares específicas da feature;
- `shared/` — reutilização interna entre componentes da própria feature;
- outras subpastas podem existir quando uma responsabilidade concreta exigir.

## Estilos

O design system vive em `src/scss/`.

Entradas globais:
- `src/styles.css` — carrega Tailwind CSS;
- `src/styles.scss` — carrega o SCSS global da Bebel e deve vir depois de `styles.css` em `angular.json`.

Antes de criar valores novos, verificar tokens, variáveis, mixins e componentes existentes.

## Conteúdo editorial

Conteúdo estruturado da Bebel que não pertence a componentes pode ficar em `public/content/`.

Fontes de receitas ficam em `content/editorial/`, fora de public. `public/content/editorial/recipes.json` é derivado pelo prebuild apenas de publicações revisadas. Vídeos ficam separados em `public/content/canal/`; o catálogo pago permanece em dinner-plan/products. Legados preservados em `content/editorial/legacy/`.


## SEO e publicação estática

- `src/app/core/seo.service.ts` centraliza title, description, Open Graph, Twitter Card e canonical no runtime.
- `scripts/generate-pages.mjs` preserva SSG e gera shells CSR conhecidos; `scripts/seo-artifacts.mjs` descobre páginas indexáveis e gera sitemap/robots em todo pós-build.
- `.github/workflows/pages.yml` valida o build e publica a saída Angular no GitHub Pages quando Pages estiver habilitado no repositório.
- Assets públicos usados por rotas devem respeitar o `base href`, evitando caminhos absolutos iniciados por `/` quando o app estiver hospedado em subdiretório.

## Limites

- componentes visuais não devem concentrar regras de negócio complexas;
- código compartilhado não deve conhecer detalhes de uma feature específica;
- persistência e integrações futuras devem ser adicionadas somente quando uma spec exigir;
- a spec descreve a mudança antes da implementação;
- arquitetura deve refletir o produto atual, não uma escala hipotética.

## Evolução futura

Backend, banco de dados, autenticação, armazenamento de objetos ou packages compartilhados podem ser introduzidos quando uma necessidade de produto justificar.

Até lá, manter a fundação simples.

## Renderização estática seletiva — spec 051

`src/main.server.ts` e `src/app/app.config.server.ts` inicializam a geração; `src/app/app.routes.server.ts` define três rotas Prerender e catch-all Client. `angular.json` usa `outputMode: static`, sem servidor Node em produção. `provideClientHydration(withEventReplay())` reativa as páginas no navegador.

O catálogo `public/content/canal/index.json` é importado pelo CanalService para manter build e navegador coerentes. Atualizações exigem build/deploy. Onboarding acessa armazenamento após renderização; analytics ignora execução no servidor.

`npm run build` executa pós-build: `scripts/generate-pages.mjs` preserva páginas prontas, gera shells CSR conhecidos e fallback noindex; `scripts/validate-prerender.mjs` verifica conteúdo, catálogo, canonical e fallback. A geração legada de shells de receitas sem rota foi removida na spec 052; o wildcard apresenta 404 noindex.

Plano incremental: `doc/plano-seo-editorial.md`.

## SEO automático — spec 052

Configuração comum em `src/app/core/seo.config.json`; SeoService normaliza canonical HTTPS com barra final e sem query/hash, e atualiza robots ao navegar. Páginas privadas/testes são noindex. Sitemap descobre HTML SSG indexável (posts futuros automaticamente), mais home/oferta CSR conhecidas. Sem canonical/metadados/conteúdo válidos, build falha. `scripts/validate-seo.mjs` verifica XML/exclusões e publicação/remoção simuladas. Robots não bloqueia leitura de noindex. A tela shared/components/not-found substitui redirect genérico; 404.html e index.csr.html têm noindex. Guia e limites: `doc/seo-publicacao.md`.

## Biblioteca editorial — spec 053

`content/editorial/index.json` controla categorias, IDs/slugs e status draft/published/archived. `scripts/compile-editorial.mjs` valida as fontes e gera pacote público ignorado no Git; prebuild/prestart/prewatch garantem existência antes dos imports Angular. Não distribuir drafts, dados internos ou legado. `modules/meals/interface/public-recipe.models.ts` e `helpers/recipe-library.ts` oferecem contrato e seletores de publicados para slug/categoria/vídeo e parâmetros SSG. `scripts/validate-editorial.mjs` exige cobertura HTML/sitemap e testa transições/erros. Quatro drafts e zero publicados na entrega inicial. Rota dinâmica/UI de receita ficam na etapa 4. Guia: `doc/fluxo-editorial-receitas.md`.

## Página pública de receita — spec 054

RecipePageComponent em modules/meals/components/recipe-page apresenta publicados do catálogo importado. app.routes.server usa parâmetros publicados e fallback Client; NotFound noindex para outros slugs. Catálogo local tem uma receita conferida e três drafts. Biblioteca aponta aos detalhes, com HTML SSG incluído automaticamente no sitemap.

Contrato permite tempos null (timeNote obrigatório quando total é desconhecido), sourceNote e ingrediente shopping false. Progresso é salvo por ID em armazenamento local após afterNextRender; não prerenderizar estado pessoal. ShoppingStore só é instanciado por ação no navegador, reaproveitando lista e filtrando ingredientes já disponíveis/não compráveis. Guia: doc/fluxo-editorial-receitas.md. CTA do produto e schema continuam nas próximas etapas.

## Porções e referências públicas — spec 055

Fontes HTTPS identificadas são obrigatórias em publicados e aparecem na página. RecipePortion define opções explícitas com ajustes por ID de ingrediente/passo; equipment/tips/sourceNote complementam a execução independente do vídeo. Estado e lista são separados por receita+porção, com migração de leitura da base antiga. A fonte de cada adaptação fica no editorial; quantidade ampliada não equivale a teste culinário. Nenhuma alteração no produto pago.

## Layout comum de receita — spec 056

Fonte visual em shared/styles/recipe-layout.scss, extraída integralmente do SCSS do produto; dinner-plan importa sem alterar regras. Página pública usa mesma estrutura dinner__recipe/dinner__shopping e componentes ShoppingChecklist/DinnerActions, com overrides locais para fundo neutro, imagem e H1. Detalhes públicos são rotas sem shell/sidebar/bottom-nav, evitando bolinhas e colisão de rodapés. Dados e estado não são compartilhados com o produto. Guia: doc/layout-receitas.md.

## Player no topo — spec 057
Página pública mostra um único iframe no topo do card, sem autoplay; substitui capa estática e disclosure de vídeo anterior. Capa permanece metadata/biblioteca. Controles comparados ao produto publicado; nenhum dado/estado pago alterado.

## UI da receita e canvas — spec 058
RecipePage usa app-shell--recipe: sidebar aparece no desktop e menu inferior do app fica oculto na receita para preservar DinnerActions no mobile. Canvas global #fff8f1 sem padrões; canal e produto acompanham o token, com texto do header contrastante. Não há transferência de faltantes à ShoppingStore na receita pública; só checklist local. sourceNote fica nos dados, sem parágrafo na UI. Preferência explícita do usuário substitui decisões visuais anteriores.

## Decisões da revisão 059
RecipeStructuredData é derivado do modelo editorial e da porção selecionada; SeoService gerencia um único script JSON-LD e o limpa nas demais rotas. Breadcrumb visível coincide com BreadcrumbList. Datas de sitemap vêm do editorial; audit-recipe-seo.mjs roda no postbuild e produz doc/auditoria-seo.md. Site só pt-BR: sem hreflang artificial. RecipeToolsComponent mantém três espaços de afiliados Shopee sem links/produtos inventados, inclusive na impressão. Preservar preferências da 058.

## CTA contextual das receitas — spec 060
RecipeProductCtaComponent pertence a products e é composto pelo template público de receita. Nome/preço/destino em MEAL_PRODUCT. Atribuição interna usa venda/receita, sem UTMs; publicRecipeSource valida no catálogo público. AnalyticsService aceita RecipeProductClick, e a oferta mantém source_recipe nos eventos de visita/checkout. São eventos de interesse, sem confirmação de compra; não encaminhar códigos ou query livre.

## Preferências vigentes — revisões 062–064
App abre diretamente sem onboarding. Sidebar desktop usa token único de 15rem, sem override de largura por receita. Comidinhas contém somente blog agrupado por categorias publicadas; Shorts/longos não aparecem na listagem. Esta decisão substitui a apresentação da 061. Player permanece na receita. CTA do produto é banner de largura inteira após ficha/compras, com imagem/retrato e copy do usuário, sem mudar atribuição. A/B continua renderizando variantes na mesma URL; rotas dedicadas são prévias, sem redirecionamento automático.

## Biblioteca paginada e ficha — revisões 065/066
Library-navigation centraliza página de 12, busca normalizada, ordenação por publishedAt/slug e geração de parâmetros SSG. /comidinhas/ é página 1; /comidinhas/pagina/N/ tem canonical próprio e HTML SSG por build. q/categoria persistem seleção na URL, são noindex no navegador e não geram combinações SSG; canonical aponta à sequência base. Alias página 1 não ganha shell SSG de redirect. Catálogo completo ainda é importado no bundle: paginação limita DOM, não divide download do acervo.
RecipePage usa capa/play local e só monta iframe após clique. RecipePortion pode fornecer equipment; compilação preserva/valida utensílios por variante. Macarrão público passa a base 2 e opção 4 já pesquisadas; vídeo original é referência de 1 porção. Rendimento/schema seguem quantidade exibida, sem inventar tempo de execução. Marcação antiga não é apagada.

## Receita de abobrinha e metadados opcionais — 067
PublicRecipe.recipe.storage fornece orientações de conservação com title/text; compilador valida e preserva só esses campos. RecipePage renderiza disclosure usando estilos existentes, sem adicionar seção em receitas sem dados. PublicRecipe.video opcional fornece metadados conferidos para Recipe.video e VideoObject. Sem metadados, não gerar VideoObject.
Abobrinha preenchida, ainda draft, sem publishedAt. Revisão é documental; não equivale a teste culinário. Prévia isolada em .videos/output/seo/abobrinha-implementacao, sem promover manifesto.

## Preferência de entrega de receitas — 2026-11-02
Toda ficha concluída e revisada deve entrar também na biblioteca Comidinhas, com card, rota e artefatos SEO gerados juntos. Não entregar só prévia isolada se a ficha já está completa. Publicação no catálogo local não equivale a deploy. Fontes incompletas continuam draft.

## Entrega 068 — 2026-11-02 UTC
Concluída localmente: play rosa #ea225d; Falta pegar/Já no carrinho com rolagem independente, cabeçalhos externos, foco de teclado e impressão sem recorte. Bolo de banana na airfryer com farinha de trigo incluído na listagem e detalhe, com fontes e imagem ilustrativa, sem vídeo. videoId null permitido e sem player/link/VideoObject; receitas sem variantes exibem rendimento próprio (bolo:10 porções).
Validação: build/postbuild completos (3 publicadas,8 URLs no sitemap),2 testes de schema,desktop e mobile390px sem overflow horizontal; ambas as listas com conteúdo excedente e itens movidos/restaurados. Pesquisa OpenSEO documentada; volume histórico reutilizado, SERP exata checada. Sem teste culinário, commit,push ou deploy.

Preferência do usuário (2026-11-02): não expor nas receitas observações internas como piloto ou não testado pela Bebel. Manter orientações práticas apoiadas nas fontes e referências, sem inventar alegação de teste próprio. Auditoria documental permanece interna.


Entrega 069 concluída localmente: bolo de cenoura pequeno com calda,8porções,13ingredientes e6passos; foto WebP146196bytes; sem vídeo. Card, ficha, SSG e sitemap gerados juntos. Fontes ReceitasGlobo e HealthCanada conferidas. Reutilizada demanda OpenSEO4400/mês KD0; sem nova compra de pesquisa.
Validações: npm run build/postbuild aprovados,4receitas/9URLs; Recipe/Breadcrumb/canonical; foto carregada,semiframe/play/VideoObject; desktop1280/mobile390 sem overflow; utensílios e compras com scroll; progresso e persistência testados e restaurados. Impressão mantém componente e estilos existentes sem alterações; sem teste de diálogo de impressão nesta entrega. git diff --check sem erros.
Fila: .videos/output/seo/fila-conteudo-bebel.json. Próxima: bolinho de arroz na airfryer. Sem commit,push ou deploy.

## Entrega070 — lote de3 concluído localmente
Bolinho de arroz airfryer(7bolinhos),batata rústica airfryer(6porções pequenas),bolo de fubá cremoso(12pedaços). Fotos realistas próprias;3fichas/card/SSG/sitemap juntos. recipe-yield compartilha unidades entre interface/schema; auditoria confere igualdade. Categorias airfryer/acompanhamentos criadas com conteúdo; banana incluída no filtro airfryer. Dados OpenSEO recentes reutilizados, sem nova compra.
Validação:build/postbuild7receitas/12URLs;3testes de schema/rendimento;desktop1280/mobile390 nas3fichas;fotos,checkboxes,compras,progresso,persistência,scroll e filtro conferidos. Sem vídeo compatível,sem player vazio. Impressão mantém regras existentes;diálogo de impressão não testado. git diff --check sem erros.
Fila persistente e prompt atualizados para N receitas por execução,sem pedir confirmação entre elas.6candidatas remanescentes precisam validar fontes/SERP antes de executar. Lotes6/12 só após novo pedido. Sem commit,push,deploy ou agendamento.


## Entrega071 — lote de5 concluído localmente em2026-11-03UTC
Brigadeiro limão25unidades,sobrecoxa3porções,berinjela2porções,sardinha2porções,pão de leite5pães. Cinco fotos WebP originais,utensílios,ingredientes,preparo,dicas,conservação,compras e fontes. Sem vídeo correspondente. Plurais pão/pães e brigadeiro/brigadeiros compartilhados interface/schema/auditoria; testes ampliados.
Build/postbuild aprovados:12receitas/17URLs.3testes unitários aprovados. As5fichas inspecionadas desktop1280x900/mobile390x844,sem overflow,fotos carregadas,sem player vazio,marcação/progresso/persistência testados e restaurados. Água do pão fora das compras. Sem executar diálogo de impressão; regras/componentes anteriores preservados.
SERPexata5/5sucesso BR2076/ptdepth10,resultId047006c5-5041-47be-b065-71f057f7ffba,consulta2026-11-02UTC. Métricas anteriores reutilizadas. Berinjela exataunknown;2400refere-se à busca ampla. Nestlé2fontes recuperadas da busca,direto403. Referência de mofo USDA recuperada de arquivo institucional UCDavis,diretoUSDA403. Dados internos não aparecem como avisos de piloto/teste na página.
Fila .videos/output/seo/fila-conteudo-bebel.json atualizada. Pesquisa+fontes+browserchecks em .videos/output/seo/lote-5-2026-11-03. Relatório OpenSEO privado ce14dbac-0c7a-4cab-801b-edeba27e825a. Sem commit,push,deploy,indexação comprovada ou agendamento.


## Entrega072 — 2026-11-03T00:48:00.941Z
10receitas:brigadeiro-morango,pudim-leite,pão-queijo-airfryer,banana-airfryer,legumes-airfryer,bolo-chocolate,arroz-doce,mousse-maracujá,salada-grão,cuscuz-marroquino.10fotosWebP originais,ingredientes/compras/utensílios/preparo/dicas/conservação/fontes. Sem vídeo público correspondente;227arrozdoceaguardarevisãoeIDnull. Rendimento real da fórmula:40docinhos/12porções/30pães/2bananas/2porções/1bolo/8porções/8porções/2porções/6porções.
Filtros em uma linha com overflow-x:auto,linkssemquebra,tecladoetouch nativos. Busca+categoria preservadas. Catálogo22receitas/2páginas(12+10);sitemap28URLs. Build/postbuild aprovados;8testesunitáriospassaram.10/10fichas em1280x900e390x844 semoverflow,fotocarregada,compras/preparo/persistênciatestadose restaurados. Viewport resetado. Impressão preservada,nãoexecutado diálogo de impressão.
RelatórioOpenSEOprivado c7e5b1fc-095f-442c-9084-84611c61112a;10termoscom métricas explícitas.9SERPsnovas BR2076/ptdepth10,pudimrankhistórico6set2026(TG1/Receiteria4),semextrapolarKD0. Métricas6reutilizadas+4hidratadas; custos/saldonãoretornados. FontesNestlé/CanalAirfryer recuperadasporbuscaondeaberturadiretafalhou. Histórico300rowsdeconcorrentesreutilizado,nãorecomprado.
Registros:.videos/output/seo/lote-10-2026-11-03. Fila atualizada concluida_localmente. Sem commit,push,deployouagendamento. Não declararindexação/visitas/vendascomprovadas.


## Entrega local 073 — 03/11/2026 UTC

Dez fichas completas: Mandioca na airfryer dourada com manteiga; Couve-flor na airfryer com mel e páprica; Pastel na airfryer com carne e queijo; Pão de alho na airfryer com pão francês; Cookie na airfryer com gotas de chocolate; Panqueca de banana com aveia para uma pessoa; Bolo de laranja de liquidificador com glacê; Torta salgada de liquidificador com abobrinha e bacon; Mousse de limão com 3 ingredientes, sem gelatina; Pudim de pão em camadas com açúcar e canela. Catálogo com 32 receitas publicadas no manifesto local, em 3 páginas (12/12/8). Todas com foto própria WebP, fontes, quantidades, utensílios, preparo, conservação e lista de compras. Sem vídeo confirmado: nenhum player ou VideoObject inventado.

Pesquisa: sete métricas novas BR/pt, três reaproveitadas e dez SERPs; dificuldade desconhecida preservada para bolo de laranja e mousse. Volume é estimativa da consulta, não previsão de tráfego. Custo/saldo não retornados.

Validação: build e pós-build aprovados; 39 URLs no sitemap; 5 testes de navegação aprovados. As dez páginas foram conferidas em 1280 e 390 px, sem overflow, com persistência de preparo e compras. Catálogo, busca, filtro horizontal e terceira página conferidos. Sem deploy, commit ou push.

Relatório: https://app.openseo.so/p/d9786bbb-b04d-4eaa-adf8-337b47b3010a/reports/1a0b0a31-7bf7-4672-86e1-d951359daa48


## Entrega074 — oito receitas concluídas localmente em3nov2026UTC

Brownie com chocolate branco e meio amargo; Bolinho de chuva com açúcar e canela; Canjica com leite de coco, laranja e mel; Beijinho de coco para enrolar; Abóbora na airfryer com cominho e mel; Milho na airfryer com manteiga de alho e salsinha; Crepioca simples com parmesão e orégano; Geleia de morango caseira com limão. Oito fotos ilustrativas originais geradas pela ferramenta integrada image_gen e otimizadas em WebP; fichas, cards, fontes, quantidades, utensílios, preparo, conservação e compras completos. Sem vídeo público correspondente: videoId:null, sem player vazio.

Pesquisa: seis métricas novas BR2076/pt e duas reutilizadas (brownie301000/bolinho368000, KD/CPCunknown); oito SERPs atuais resultId d08ed6dc-ee73-4249-b437-caa4214e5dd0. Custo/saldo não retornados.

Build/postbuild aprovados:40receitas publicadas no manifesto,42fontes incluindo2rascunhos,46rotas estáticas,48URLs sitemap. Desktop1280/mobile390 nas8fichas sem overflow,fotos carregadas,compras/preparo persistiram e foram restaurados. Quarta página37–40/4cards,busca geleia1resultado/noindex e filtrosnowrap/scroll conferidos. Impressão preservada,sem executar diálogo; sem mudança funcional nem novos testesunitários neste lote. git diff --check aprovado.

Geleia refrigerada para consumo próximo,sem promessa de conserva de prateleira. Beijinho80ml=1/3xicara240ml,fonteHelô na ficha. Sem commit,push,deployouagendamento. Fila atualizada concluida_localmente; ampliar somente após novo pedido.

Relatório privado: https://app.openseo.so/p/d9786bbb-b04d-4eaa-adf8-337b47b3010a/reports/da17736a-265d-4b11-8f6a-b74ddf808252
