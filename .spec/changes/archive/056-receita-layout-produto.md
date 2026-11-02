# 056 — Receita pública no layout do produto

## Objetivo/contexto
Correção solicitada: a receita pública deve seguir a página do produto Refeição Resolvida, sem bolinhas, título solto ou novo layout autoral. Referência direta: dinner-plan.component.html/scss, ShoppingChecklist e DinnerActions existentes.

## Escopo
Reusar estrutura real: card branco com imagem e conteúdo, metadata, modos de porção, ingredientes numerados, preparo com números e checks, dica, utensílios/vídeo/fontes recolhíveis, compras em card lateral sticky no desktop e abaixo no mobile, ações imprimir/lista como produto. Fundo neutro liso, sem sidebar/bottom-nav do app nesta página. Extrair o SCSS existente do produto para fonte compartilhada mantendo regras idênticas; adicionar só overrides públicos de fundo e tipografia necessária ao H1. Reusar ShoppingChecklist/DinnerActions sem importar dados/estado/acesso pago. Manter porções, listas e persistência da receita pública. Card de compras exclui água, como produto. Preservar pesquisa, fontes, SEO, SSG e drafts noindex. Sem acrescentar conteúdo de conservação não pesquisado. Nenhuma mudança de preço/checkout/receitas pagas. Header público com identidade Bebel e backlink, sem se passar pelo produto pago.

## Referências
../../memory/estrutura.md; ../../shared/diretrizes-de-frontend.md; ../../../doc/plano-seo-editorial.md; componentes dinner-plan, shopping-checklist e dinner-actions.

## Aceite
- [x] AC1: card/ordem/grid/modos/passos e ações seguem referência do produto, fundo liso e título dentro do card.
- [x] AC2: componentes de compras e ações reaproveitados; comportamento de porções/persistência/listas e fontes preservado.
- [x] AC3: desktop/mobile e navegação por atalhos conferidos; SSG/SEO/HTML aprovados e produto pago preservado pela extração sem mudança de regras.
- [x] AC4: plano/memória documentados e prévia entregue localmente, sem deploy.

## Tasks
- [x] Revisar estrutura do produto e registrar correção visual.
  > ✅ 2026-11-02 14:35 — Referência real dinner-plan/component, rotina, ações e checklist lida. Spec explicita correção solicitada, sem recriar design paralelo.
- [x] Compartilhar estilos e adaptar template público com componentes existentes.
  > ✅ 2026-11-02 14:35 — Estilos do produto extraídos integralmente e confirmados por hash; ambos importam fonte única. Público usa mesma estrutura de cards/porções/passos e componentes ShoppingChecklist/DinnerActions. Fundo liso, sem sidebar/bolinhas; conteúdo e estado por porção preservados.
- [x] Validar build, card/compras/passos/atalhos, desktop e mobile.
  > ✅ 2026-11-02 14:35 — Build final e pós-build aprovados (4 SSG, 6 URLs). Validador exige título dentro do card, checklist de preparo e switches de compra completos, sem marcas pessoais no HTML. Navegador desktop/mobile, sem overflow/erros; atalho compras/topo, seleção 2p e persistência do switch após reload conferidos. Fontes abrem no recolhível. Impressão inspecionada/reutilizada, sem acionar diálogo físico.
- [x] Documentar evidências e entregar prévia corrigida.
  > ✅ 2026-11-02 14:35 — Plano, memória e guias atualizados. Hash da fonte compartilhada confirmado contra registro da extração. Nenhum dado/checkout/acesso pago alterado; apenas importação da fonte SCSS compartilhada. Entrega local com prévia, sem deploy.

## Revisão spec
Aceita: usuário autorizou explicitamente seguir a interface do produto. Reuso direto de fonte de estilos evita divergência. Sem alteração de dados/estado pago nem orientação culinária nova. Build autorizado para verificação desta correção.

## Encerramento
Correção implementada e validada localmente em 2026-11-02 14:35. AC1 por estrutura/estilos/navegador; AC2 por reuso e persistência; AC3 por build e verificação responsiva; AC4 por documentação/prévia. Revisão visual final pertence ao usuário; não declarar aprovação. Sem deploy.
