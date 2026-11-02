# 063-blog-menu-e-copy-produto

## Objetivo
Deixar Comidinhas exclusivamente com o blog, unificar menu desktop e aplicar a copy explícita do usuário no CTA.
## Contexto e referências
Continuação da 062, sem reintroduzir onboarding. ../../memory/produto.md, ../../memory/estrutura.md, ../../shared/diretrizes-de-frontend.md. Shorts, serviço e acervo ficam preservados como dados; somente saem da UI da biblioteca. A instrução atual substitui ordem Shorts/blog da 061.
## Escopo e premissas
Remover seção de Shorts e imports/estilos exclusivos da listagem; atualizar título/description/hero para receitas. Preservar grupos editoriais publicados, player interno e CTA. Menu desktop único de 15rem, removendo override específico da receita; mobile mantém comportamento aprovado. Aplicar texto literal do usuário no título/corpo do card, mantendo preço na configuração, pagamento único e link/tracking existentes. Preço em destaque visual, sem criar segundo h1. Sem publicar, mudar preço, campanhas ou comprar.
## Critérios de aceite
Biblioteca SSG sem Shorts/links de Shorts; receitas continuam visíveis. Sidebar tem mesma largura ao navegar biblioteca/receita na mesma viewport. Copy exata no card e preço R$27 centralizado. Mobile sem overflow, onboarding ausente e regras de indexação preservadas.
## Tasks
- [x] Remover Shorts da listagem e atualizar metadados/validação SSG.
  > ✅ 2026-11-02 18:42 UTC — Retirados Shorts e dependências/estilos exclusivos da UI da biblioteca, acervo preservado. Hero/description descrevem somente receitas; validação SSG exige ausência de Shorts/longos e presença das categorias publicadas.
- [x] Unificar menu e aplicar copy fornecida, preservando links/preço/tracking.
  > ✅ 2026-11-02 18:42 UTC — Token único de sidebar 15rem aplicado a todas as telas com menu. Navegador mediu 240px no blog e na receita; copy literal do usuário aplicada ao banner, preço mantido em MEAL_PRODUCT, sem alterar link/tracking. A apresentação visual foi ampliada pelo pedido posterior 064.
- [x] Validar build/SEO e desktop/mobile/navegação; revisar e encerrar localmente.
  > ✅ 2026-11-02 18:42 UTC — Build/postbuild aprovados; desktop/mobile conferidos, width/scrollWidth 375 no celular, sem erros de console. Receita continua com player/utensílios, site sem onboarding. Revisão implementation aprovada. Sem deploy.
## Revisão spec
Modo spec aprovado. Referências visuais fornecidas mostram 280px versus 240px; usar a largura menor em todas as telas com sidebar, conforme autorização. Texto do usuário prevalece sobre sugestões de copy; nenhuma variante alternativa será aplicada. Critérios vinculados a HTML/medição de elementos no navegador.
## Encerramento
> ✅ 2026-11-02 18:42 UTC — Entrega local revisada e encerrada. Build/postbuild e navegador aprovados; testes A/B/atribuição aprovados na 064. Sem publicação. Relatório registra falhas observadas em produção, que permanecem pendências de deploy e verificação externa, sem serem declaradas corrigidas remotamente. Memória/changelog/plano atualizados; arquitetura técnica sem nova infraestrutura.
