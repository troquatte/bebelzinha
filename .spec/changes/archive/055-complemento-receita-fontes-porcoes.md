# 055 — Receita pesquisada e porções

## Objetivo/contexto
Complementar a receita pública com ficha pesquisada no nível funcional do produto pago: fontes visíveis, porções, quantidades, utensílios e orientações para executar sem depender do vídeo. Pedido atual autoriza complementar a receita, sem alterar o produto pago.

## Referências
../../memory/estrutura.md; ../../shared/diretrizes-de-frontend.md; ../../../doc/plano-seo-editorial.md; https://panelinha.com.br/receita/macarrao-com-limao; https://receitas.globo.com/receitas-da-tv/cozinha-pratica/macarrao-com-limao-e-queijo-parmesao-gnt.ghtml; https://www.barilla.com/pt-br/ajuda-com/dicas-de-massa-e-cozinha/como-cozinhar-macarrao.

## Decisões/escopo
Base 1 porção concorda com Panelinha/GNT e vídeo. Tempo total 30 min é estimativa editorial referenciada ao GNT, não cronômetro nem regra para lotes maiores. Variantes explícitas para 2/4: massa/molho proporcionais; água 2L para 1/2 e 4L para 4 (referência Barilla ~1L/100g, mantendo base do vídeo); sal mantém concentração original. Reserva de água é limite de disponibilidade, não obrigação de uso. Caldo medido em colher, nunca suco inteiro. Steps/notes sobrescritos explicitamente por variante para não manter números da base. Distinguir vídeo para 1 de adaptação editorial para 2/4, sem alegar teste culinário. Incluir utensílios, dicas e fontes HTTPs com papel da referência. Progresso/lista por receita+porção, com leitura do progresso legado da base; sem duplicar listas nem manter quantidades antigas em outra porção. Sem escala arbitrária, armazenamento alimentar ou alegações nutricionais. Conteúdo completo no SSG da base, fontes visíveis e porções hidratadas. CTA do produto continua próxima etapa.

## Aceite
- [x] AC1: fontes conferidas e creditadas na página; ficha completa e orientações independentes do vídeo, estimativa identificada.
- [x] AC2: 1/2/4 porções atualizam ingredientes/notas/preparo de forma coerente; valores e escolhas editoriais validados.
- [x] AC3: compras e estado separados por porção, preservação da base, sem quantidades defasadas/duplicação ao alternar.
- [x] AC4: build/SSG/SEO e testes de contrato/variante/navegador aprovados; docs atualizados, sem deploy.

## Tasks
- [x] Revisar fontes e registrar decisões/especificação.
  > ✅ 2026-11-02 14:25 — Fontes primárias Panelinha/GNT/Barilla abertas e lidas. Base coincide com vídeo; limite de tempo e natureza editorial da ampliação registrados. Spec revisada antes de alterar.
- [x] Ampliar contrato/compilador e complementar ficha com variantes explícitas e fontes.
  > ✅ 2026-11-02 14:25 — Contrato e compilador validam fontes obrigatórias, equipamento/dicas e variantes com IDs existentes. Ficha inclui base 1, opções 2/4, tempo estimado e atribuição visível. Preservada distinção de adaptação sem teste culinário.
- [x] Implementar seleção de porções, instruções e listas/estado correspondentes.
  > ✅ 2026-11-02 14:25 — Seleção atualiza ingredientes, notas e passos; listas/progresso por receita+porção, com leitura do estado legado da base. Template mostra utensílios, orientações e fontes mesmo sem carregar vídeo. Produto pago sem diff.
- [x] Validar casos positivos/negativos e navegador, documentar e encerrar localmente.
  > ✅ 2026-11-02 14:25 — Build de produção aprovado (4 SSG, 6 URLs), pós-build e testes negativos de fontes/variantes aprovados. Navegador: 2p=200g e 4p=400g, água/instruções correspondentes, 4p restaura após reload; lista de 4p tem seis itens e 400g, repetição sem duplicação. Retorno à base preservou ingrediente/passo antigos, 2p ficou sem marcas; zero erros de console. Docs/plano/memória atualizados; sem deploy.

## Revisão spec
Aceita: complementação do conteúdo existente, sem fundir versões com manteiga/creme, sem alteração de oferta. Quantidades principais são adaptação proporcional, água ajustada por referência técnica, limites visíveis. Build autorizado para validar a alteração como nas etapas anteriores.

## Encerramento
Validação local concluída em 2026-11-02 14:25. AC1 por pesquisa/fontes/HTML; AC2 por contrato/testes/browser; AC3 por testes de listas/migração; AC4 por build e documentação. Próxima etapa continua CTA contextual do produto. Sem publicação no domínio nem teste culinário alegado.
