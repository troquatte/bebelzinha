# Layout comum de receitas

Fonte visual: dinner-plan.component.html/scss do produto. Estilos originais extraídos integralmente para src/app/shared/styles/recipe-layout.scss; SHA256 normalizado: eb112c50bdb5ebbce238a452da72a150d76e31eb3d69a774cf1cfc988775234c. Produto importa a mesma fonte, sem troca de regras. Receita pública também importa a fonte com overrides locais de fundo neutro, H1 e imagem de capa. Compras e ações usam os mesmos componentes ShoppingChecklist/DinnerActions.

A página pública usa card branco de receita e card de compras, ingredientes numerados, passos marcáveis numerados, modos de porção, vídeo/utensílios/fontes recolhíveis, dica e atalhos imprimir/compras. Não usa mais sidebar/bottom-nav nem bolinhas do shell do app. Dados, listas e acesso do produto não são compartilhados.

## Validação — 2026-11-02 14:35
Build de produção e pós-build aprovados: quatro rotas SSG, seis URLs e conteúdo/SEO válidos. Estilo compartilhado manteve o hash da extração inicial. Navegador desktop: card branco rgb(255,253,249), fundo do host sem imagem, zero sidebar. Mobile 390x844, largura útil 375 sem overflow; atalho foca compras e retorna ao topo. Porção 2 atualiza ingredientes/preparo/checklist; marcação persistiu após reload. Fontes abriram no recolhível; sem erros de console. A impressão reutiliza DinnerActions e lógica beforeprint/afterprint do produto; diálogo/impressão física não acionados nesta conferência.

## Correção posterior — spec 057
Referência publicada do produto inspecionada no navegador. Player único agora fica no lugar da capa, no topo do card antes do título, sem autoplay. Removida seção separada de vídeo. Esta decisão substitui a estratégia anterior de ativação por disclosure. Compras mantém switch do produto e preparo mantém checkbox numerado. Fundo neutro e fonte SCSS compartilhada preservados. Build e visual desktop/mobile aprovados, prévia local ?revisao=057, sem deploy.

## Preferências posteriores — spec 058
Canvas bege liso em todas as páginas, inclusive produto, com contraste do header ajustado. Receita volta a ter sidebar no desktop; no mobile não há sidebar/menu inferior do app, somente ações da receita. Botão de adicionar faltantes, link de abrir lista e método de transferência foram removidos; checklist local e listas já existentes preservados. O parágrafo sourceNote não é mais exibido; fontes e proveniência permanecem nos dados. Esta decisão substitui as descrições anteriores sobre transferência e ausência de sidebar desktop.
