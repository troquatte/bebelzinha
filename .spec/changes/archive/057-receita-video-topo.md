# 057 — Vídeo no topo e comparação real do produto

## Objetivo/contexto
Correção explícita do usuário: vídeo no lugar da capa e fidelidade à interface do produto. Referência publicada aberta no navegador em https://bebelzinha.com.br/jantar-resolvido?dia=1. Tela real confirma switch nas compras e checkbox no preparo; screenshot inspecionada. Página pública deve manter esses componentes e não recriar blocos de vídeo separados. A versão local em 4317 não estava servindo; validação e prévia em 4321.

## Escopo
Player YouTube nocookie direto no topo do card no lugar da imagem/capa, sem autoplay; retirar disclosure duplicado Assistir ao preparo abaixo. Preservar capa apenas como metadata SEO/cartão da biblioteca. Ajustar tipografia do header público para o tamanho da referência, com tema neutro autorizado. Manter ShoppingChecklist e DinnerActions e checkboxes de preparo, conferidos no produto publicado. Preservar porções, pesquisa e progresso. Entregar URL de revisão nova para abrir build atual, sem deploy/alteração de dados pagos.

## Aceite
- [x] AC1: um único iframe no topo do card antes do título, sem autoplay e sem bloco duplicado de vídeo.
- [x] AC2: controles de compras/preparo conferidos com produto publicado e mantidos; porções e estado funcionam.
- [x] AC3: build/SEO/SSG e visual mobile/desktop conferidos, URL de revisão entregue sem publicação remota.

## Tasks
- [x] Conferir produto real e registrar referência.
  > ✅ 2026-11-02 14:41 — Produto publicado aberto e inspecionado por AX e screenshot. Acesso existente do projeto usado para ver tela de uso; referência confirmou switches em compras e checkbox no preparo. Sem alterar estado/receitas do produto.
- [x] Mover player ao topo, remover duplicação e alinhar header.
  > ✅ 2026-11-02 14:41 — Player único youtube-nocookie ocupa posição da capa antes do título, rel=0 sem autoplay. Imagem segue apenas metadata/cartão da biblioteca. Disclosure duplicado removido e header ajustado ao tamanho da referência, com fundo neutro.
- [x] Validar HTML e navegador, registrar evidências e entregar revisão.
  > ✅ 2026-11-02 14:41 — Build e pós-build aprovados: 4 SSG, 6 URLs, um iframe no topo e ausência do disclosure antigo verificados. Desktop e mobile 390x844 inspecionados; largura útil 375 sem overflow. 2p mostra controle 200g; 4p restaurada. Player carregou controles e permaneceu pausado; console sem erros. Canonical remove query de revisão. Prévia nova ?revisao=057 entregue; sem deploy.

## Revisão spec
Aceita. Pedido posterior autoriza iframe inicial e supera a estratégia anterior de carregar vídeo só por clique. Loading lazy e ausência de autoplay preservam controle do usuário. Nenhum conteúdo ou estado pago alterado.

## Encerramento
Correção validada localmente em 2026-11-02 14:41. AC1 por HTML/player/navegador; AC2 por comparação real e porções; AC3 por build/visual responsivo. Aprovação visual do usuário não presumida. Sem deploy.
