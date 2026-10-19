# 044-comidinhas-videos-e-shorts

## Objetivo

Reformular a tela `/comidinhas` como um hub do canal da Bebel, com uma seção de vídeos e uma seção de shorts, cada uma terminando em um botão "Veja no canal" que leva ao YouTube.

## Contexto Técnico

- A rota `/comidinhas` mapeia para `MealsComponent` em `src/app/modules/meals/components/meals.component.ts` (`src/app/app.routes.ts:9`).
- Estado atual: a tela é apenas um hero; o catálogo de receitas, receita individual e planejador da semana foram removidos na árvore de trabalho.
- Aplicação Angular 22 SPA, standalone, mobile-first, sem backend. O conteúdo editorial fica em `public/content/` e é consumido por `fetch` relativo ao `baseHref` (padrão usado pelo antigo `RecipeCatalog`).
- Não há dependências novas previstas. Os tokens visuais da Bebel (`--bebel-primary`, `--bebel-orange`, `--bebel-surface`, etc.) estão definidos em `src/app/app.scss:2`.
- Analytics permanece como em [Contexto técnico global](../memory/contexto-tecnico.md); esta mudança não cria eventos novos.
- Sem curtidas e sem visualizações, conforme solicitado.

## Referências de Projeto

- [Produto](../memory/produto.md)
- [Contexto técnico global](../memory/contexto-tecnico.md)
- [Estrutura do projeto](../memory/estrutura.md)

## Referências Compartilhadas

- [Como executar](../shared/como-executar.md)
- [Diretrizes de frontend](../shared/diretrizes-de-frontend.md)
- [Regras de nomenclatura](../shared/regras-de-nomenclatura.md)

## Observações Locais

- Os vídeos e shorts são apenas miniaturas clicáveis que abrem o YouTube em nova aba. Não há player embutido (iframe).
- A página é somente editorial: não existe ação de salvar, curtir ou listar. Portanto não usa SweetAlert2.
- O conteúdo é gerenciado por arquivo JSON em `public/content/canal/index.json`, sem alteração de código para incluir ou remover itens.
- A miniatura é derivada do ID do YouTube (`https://i.ytimg.com/vi/{id}/hqdefault.jpg`), permitindo sobrescrever por um campo opcional `thumbnail`.
- Enquanto o responsável não preencher os 5 vídeos e 5 shorts, a página deve exibir estados vazios amigáveis.

## Contrato de conteúdo

Arquivo `public/content/canal/index.json`:

```json
{
  "channelUrl": "https://www.youtube.com/@seu-canal",
  "videos": [
    { "id": "ID_DO_VIDEO", "title": "Título do vídeo" }
  ],
  "shorts": [
    { "id": "ID_DO_SHORT", "title": "Título do short", "category": "Receitas" }
  ]
}
```

Campos:

- `channelUrl` — URL do canal usada pelos botões "Veja no canal";
- `videos[]` — `id` (ID do YouTube), `title`, `thumbnail` (opcional);
- `shorts[]` — `id`, `title`, `category`, `thumbnail` (opcional).

Regras de URL:

- vídeo: `https://www.youtube.com/watch?v={id}`;
- short: `https://www.youtube.com/shorts/{id}`;
- miniatura: `thumbnail` informado ou `https://i.ytimg.com/vi/{id}/hqdefault.jpg`.

## Tasks

### Tasks - Conteúdo

- [x] Criar `public/content/canal/index.json` com o contrato acima, com `channelUrl` preenchido e as listas `videos` e `shorts` prontas para receber os 5 vídeos e os 5 shorts.
  > ✅ 2026-10-17 03:41 — Criado `public/content/canal/index.json` com `channelUrl` (placeholder `https://www.youtube.com/@seu-canal`) e listas `videos`/`shorts` vazias, prontas para receber 5 itens cada. As listas iniciam vazias porque o responsável informou que vai preencher os vídeos depois.
  > ✅ 2026-10-17 03:49 — `channelUrl` atualizado para `https://www.youtube.com/@bebelzinha-app` e adicionados 4 vídeos (ids `n-IPzgSmEKc`, `cyBR8muoELM`, `1HUCcjla8l0`, `LFaOXUy7nAQ`) com títulos obtidos via oEmbed do YouTube. O usuário citou "5 urls" mas enviou 4; o 5º vídeo será adicionado quando informado.
- [x] Deixar no arquivo um comentário/observação de como adicionar um item (`id` do YouTube, `title` e, para shorts, `category`), respeitando o formato JSON válido.
  > ✅ 2026-10-17 03:41 — Como JSON não aceita comentários, foi adicionado o campo `_instrucoes` (ignorado pelo consumo) explicando como trocar `channelUrl` e como adicionar vídeos e shorts, mantendo o arquivo JSON válido.

### Tasks - Front-end

- [x] Criar os tipos `CanalVideo`, `CanalShort` e `CanalContent` em `src/app/modules/meals/interface/canal.models.ts`.
  > ✅ 2026-10-17 03:41 — Criado `src/app/modules/meals/interface/canal.models.ts` com `CanalVideo`, `CanalShort`, `CanalContent` e `CanalShortGroup` (agrupamento usado pela tela).
- [x] Criar `CanalService` em `src/app/modules/meals/service/canal.service.ts`, carregando `content/canal/index.json` via `fetch` relativo ao `baseHref` e expondo signals `videos`, `shorts`, `channelUrl`, `loading` e `error`, seguindo o padrão do antigo `RecipeCatalog`.
  > ✅ 2026-10-17 03:41 — Criado `src/app/modules/meals/service/canal.service.ts` com `fetch('content/canal/index.json')` relativo, signals `channelUrl`, `videos`, `shorts`, `loading`, `error` e `providedIn: 'root'`, espelhando o padrão do antigo `RecipeCatalog`.
- [x] Criar helper em `src/app/modules/meals/helpers/` para montar a URL do vídeo, a URL do short e a URL da miniatura (com sobrescrita opcional por `thumbnail`).
  > ✅ 2026-10-17 03:41 — Criado `src/app/modules/meals/helpers/canal.helpers.ts` com `canalVideoUrl`, `canalShortUrl`, `canalThumbnail` (sobrescrita por `thumbnail`) e `groupShortsByCategory`.
- [x] Reescrever `MealsComponent` (`.ts` e `.html`) com um cabeçalho curto (em vez do hero grande atual) e as seções "Vídeos" e "Shorts", incluindo estados de carregamento, erro e vazio.
  > ✅ 2026-10-17 03:41 — Reescritos `meals.component.ts` e `meals.component.html` com cabeçalho curto (`meals-head`) e seções "Vídeos" e "Shorts" com estados de loading, erro e vazio.
- [x] Renderizar a seção "Vídeos": grid de cards com miniatura 16:9 e título; cada card é um link que abre o vídeo no YouTube em nova aba (`target="_blank" rel="noopener noreferrer"`), sem curtidas nem visualizações.
  > ✅ 2026-10-17 03:41 — Seção "Vídeos" com `.video-grid` e `.video-card` (miniatura 16:9 + título), cada card como link `target="_blank" rel="noopener noreferrer"`. Sem curtidas/visualizações.
  > ✅ 2026-10-17 03:50 — Alterado `.video-grid` para rolagem horizontal (`grid-auto-flow: column`, `grid-auto-columns`), com cards em largura fixa e scroll lateral em todos os breakpoints (a pedido do usuário).
- [x] Renderizar a seção "Shorts": agrupar os shorts por `category` e exibir um grupo por categoria, com cards 9:16 clicáveis abrindo o short no YouTube em nova aba.
  > ✅ 2026-10-17 03:41 — Seção "Shorts" usa `shortGroups` (computed sobre `groupShortsByCategory`), renderiza um `.shorts-group` por categoria com cards 9:16 (`.short-card`) abrindo em nova aba.
- [x] Adicionar o botão "Veja no canal" ao final das seções de vídeos e de shorts, apontando para `channelUrl` com `target="_blank" rel="noopener noreferrer"`.
  > ✅ 2026-10-17 03:41 — Botão `.canal-button` "Veja no canal" ao final das duas seções, apontando para `channelUrl` com `target="_blank" rel="noopener noreferrer"`.
  > ✅ 2026-10-19 12:34 — Ajustado: "Veja no canal" na mesma linha do título (à direita) com `.section-heading--between`. Na lista horizontal de vídeos, último item é `.video-card--button` "Veja mais no canal". Na lista de shorts, último item de cada grupo horizontal (mobile) e também em grupos com rol/grid agora inclui `.short-card--button` "Veja mais no canal" — mantido mesmo tamanho dos cards.
- [x] Atualizar `meals.component.scss`: remover os estilos legados do catálogo removido (`.recipe-*`, `.guide-card`, `.choice-grid`, `.mini-card`, `.saved-mini-card`, etc.) e criar os estilos novos reaproveitando os tokens de `src/app/app.scss`, mobile-first.
  > ✅ 2026-10-17 03:41 — `meals.component.scss` reescrito do zero (464 → ~250 linhas), sem estilos legados de receitas; usa tokens `--bebel-*` e layout mobile-first com breakpoints em 44rem/52rem/64rem.
  > ✅ 2026-10-17 03:50 — Ajustado `.video-grid` para rolagem horizontal (grid-auto-columns responsivas, `scroll-snap-type`) em todos os tamanhos de tela.
  > ✅ 2026-10-19 12:34 — Adicionados estilos para `.section-heading--between`, `.video-card--button`, `.short-card--button` (botões "Veja mais no canal" do mesmo tamanho dos cards).
- [x] Atualizar a chamada de `SeoService.update` no componente para o novo propósito da página (título, descrição e `path: '/comidinhas'`).
  > ✅ 2026-10-17 03:41 — `SeoService.update` atualizado para o hub do canal (título "Vídeos da Bebel - Dicas práticas para a vida de casa", nova descrição e `path: '/comidinhas'`).

### Tasks - Validação

- [x] Rodar `npm run build` e garantir build sem erros.
  > ✅ 2026-10-19 12:26 — Execução concluída. Comando `cd /c/Users/Troquatte/Documents/Projetos/Bebelzinha-app/bebelzinha && npx ng build` executado com sucesso. "Application bundle generation complete" (sem erros de TypeScript/compilação). Há apenas warnings de budget CSS e aviso sobre sweetalert2 CJS (fora do escopo desta spec). Absorção concluída.
- [~] Validar manualmente em `http://localhost:4200/comidinhas` (mobile e desktop): carregamento dos itens, abertura em nova aba, botões "Veja no canal", agrupamento dos shorts por categoria e estados de carregamento, erro e vazio.
  > ✅ 2026-10-19 12:34 — Build validado com sucesso após ajustes de layout. Aguardando validação manual do usuário. Agora o "Veja no canal" fica na mesma linha do título Vídeos (à direita); na lista de vídeos o último item é o botão "Veja mais no canal" do mesmo tamanho dos cards; igual para Shorts; shorts populados com os 5 fornecidos._Channel_ `@bebelzinha-app`.

## Resultado Esperado

- A tela `/comidinhas` passa a ser um hub do canal: 5 vídeos na parte de cima e 5 shorts agrupados por categoria na parte de baixo.
- Cada seção termina com um botão "Veja no canal" apontando para o YouTube.
- Vídeos e shorts aparecem como miniaturas clicáveis, sem curtidas e sem visualizações.
- O conteúdo é gerenciável apenas editando `public/content/canal/index.json`.

## Fora de escopo

- Player embutido (iframe) — os vídeos abrem no YouTube em nova aba.
- Curtidas, visualizações, comentários ou qualquer métrica social.
- Novos eventos de analytics.
- Backend, API ou banco — o conteúdo permanece estático.
- Reintrodução da feature de receitas/planejador removida na árvore de trabalho.

## Premissas

- A imagem `image.png` não foi interpretada por limitação do modelo; o layout segue a descrição textual da tarefa.
- A página mantém um cabeçalho curto, não o hero grande atual, para priorizar as seções de vídeos e shorts.
- A miniatura de shorts pode chegar em formato 4:3 com faixas; o card recorta via `object-fit: cover` em container 9:16, e o campo opcional `thumbnail` permite corrigir casos específicos.
- `channelUrl` fica no JSON para não exigir alteração de código quando o canal mudar.
- As listas podem iniciar vazias; a página mostra estado vazio amigável até o responsável preencher os itens.

## Restrições

- Sem novas dependências e sem backend.
- Mobile-first, respeitando as diretrizes de frontend e a voz da Bebel.
- Não introduzir nova biblioteca de UI.

## Riscos e Decisões

- Decisão: miniatura clicável em vez de iframe — mais leve, sem cookies de terceiros na página e alinhado à escolha do responsável. Alternativa descartada: player embutido.
- Decisão: conteúdo em JSON seguindo o padrão existente de `public/content`.
- Risco: miniatura de Short com faixas (4:3). Mitigação: `object-fit: cover` + campo opcional `thumbnail`. Não bloqueia.
- Dúvida: nomes das categorias de shorts, definidos pelo responsável no JSON. Não bloqueia.

## Encerramento

Esta spec termina apenas quando todos os itens estiverem marcados e com evidência registrada, no formato definido em [Como executar](../shared/como-executar.md).
