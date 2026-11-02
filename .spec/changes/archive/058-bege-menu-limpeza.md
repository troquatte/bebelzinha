# 058 — Bege, menu desktop e limpeza

## Escopo autorizado
Retirar da receita botão de adicionar faltantes e link abrir lista, mantendo checklist local e atalhos imprimir/compras/topo. Remover da UI o parágrafo sourceNote citado pelo usuário; manter proveniência interna/fontes. Menu lateral na receita só desktop, mobile conserva tela sem menu do app. Fundo de página bege liso em todas as rotas, incluindo app, canal, vendas e produto; preservar cores de cards/CTAs e ajustar contraste do header do produto. Não apagar listas salvas ou dados de receita. Sem deploy.

## Aceite/tasks
- [x] Remover adição/link e texto indicado sem apagar dados salvos.
  > ✅ 2026-11-02 14:47 — Botão/link/método de transferência removidos da página, sem excluir listas salvas; checklist local permanece. Parágrafo sourceNote removido da UI, fonte/proveniência preservadas nos dados.
- [x] Restaurar sidebar desktop da receita sem duplicar rodapé mobile.
  > ✅ 2026-11-02 14:47 — Receita usa shell com sidebar desktop e classe própria que oculta menu inferior/sidebar no mobile. Ações imprimir/compras/topo permanecem. Desktop sidebar flex; mobile sidebar e bottom-nav none, dois botões de ações, largura útil 375 sem overflow.
- [x] Uniformizar canvas bege e ajustar contraste nas páginas antes roxas.
  > ✅ 2026-11-02 14:47 — App shell/landing, canal e layout do produto usam canvas #fff8f1 sem padrões; header/retorno do produto têm contraste escuro no bege. Cards/CTAs mantêm cores funcionais. Navegador confirmou rgb(255,248,241)/background-image none em início, compras, canal, cortadores e vendas; receita idem.
- [x] Validar build/HTML e desktop/mobile; registrar evidências e prévia.
  > ✅ 2026-11-02 14:47 — Build e pós-build aprovados: 4 SSG, 6 URLs, testes de ausência do botão/link/parágrafo. Desktop/mobile inspecionados. Documentos atualizados e prévia ?revisao=058 preparada. Sem deploy; aviso CommonJS preexistente permanece não bloqueante.

## Revisão spec
Aceita: quatro alterações explícitas do usuário. Mudanças globais de fundo autorizadas neste pedido. Sem alteração de oferta/preço, sem novos conteúdos.

## Encerramento
Quatro ajustes validados localmente em 2026-11-02 14:47. Sem publicação remota.
