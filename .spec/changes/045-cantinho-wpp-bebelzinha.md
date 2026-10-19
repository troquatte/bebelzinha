# 045-cantinho-wpp-bebelzinha

## Objetivo

Criar uma landing page curta e focada em uma única ação — entrar no canal gratuito da Bebel no WhatsApp — acessível pela rota `/wpp-bebelzinha`, fora do menu do app.

## Contexto Técnico

- Aplicação Angular 22 SPA, standalone components, mobile-first, sem SSR e sem backend (ver [Contexto técnico global](../memory/contexto-tecnico.md)).
- Rotas atuais em `src/app/app.routes.ts`. Nenhuma rota hoje fica fora do shell visual (sidebar/bottom-nav), que é renderizado por `src/app/app.html`.
- O shell é fixo no `App` (`src/app/app.ts`), então é preciso escondê-lo quando a rota ativa for a landing.
- O `OnboardingComponent` (`src/app/modules/onboarding/components/onboarding.component.ts`) aparece no primeiro acesso e bloqueia a tela; na landing ele deve ficar oculto.
- Analytics central em `AnalyticsService` (`src/app/core/analytics.service.ts`): já registra `page_view` a cada navegação. Eventos de negócio são tipados em `BusinessEvent` e enviados via `track()`. Esta mudança adiciona um evento novo de clique no botão do canal.
- SEO central em `SeoService` (`src/app/core/seo.service.ts`), usado pelas demais páginas.
- Tokens visuais da Bebel em `src/app/app.scss` (`--bebel-green`, `--bebel-primary`, `--bebel-orange`, etc.).
- A ilustração usada no restante do app é `public/images/bebel/bebel-roxa.jpg`.

## Referências de Projeto

- [Produto](../memory/produto.md)
- [Contexto técnico global](../memory/contexto-tecnico.md)
- [Estrutura do projeto](../memory/estrutura.md)

## Referências Compartilhadas

- [Como executar](../shared/como-executar.md)
- [Diretrizes de frontend](../shared/diretrizes-de-frontend.md)
- [Regras de nomenclatura](../shared/regras-de-nomenclatura.md)

## Observações Locais

- A rota é `/wpp-bebelzinha` e **não** entra no menu (sidebar/bottom-nav).
- A página deve ter uma única missão: levar a pessoa ao canal do WhatsApp. Sem link para o app de lista de compras ou outras seções.
- O botão de ação deve ficar visível sem rolagem no celular, com cor verde de WhatsApp.
- O link real do canal será conectado pelo responsável; nesta mudança usa-se uma constante com placeholder claramente identificável.
- A ilustração da Bebel aparece no topo; todo o texto é HTML (não imagem) para carregar rápido e ser fácil de ajustar.
- O clique no botão registra um evento de negócio no `AnalyticsService`.

## Tasks

### Tasks - Negócio

- [x] Definir o conteúdo da landing (convite, três destaques e rodapé de aviso) conforme o protótipo aprovado pelo responsável.
  > ✅ 2026-10-19 12:05 — Conteúdo definido conforme protótipo: eyebrow "Um convite especial da Bebel", título "Gostou das dicas da Bebel? Tem mais no WhatsApp!", subtítulo, botão "Quero entrar no canal" ("Gratuito · Abre no WhatsApp"), cards "Receitinhas fáceis", "Dicas que ajudam" e "Achadinhos selecionados", e rodapé com aviso de afiliados e "Feito com carinho pela Bebelzinha".
  > ✅ 2026-10-19 12:20 — Revisão do responsável: texto do botão alterado para "Entrar grátis no canal 💜" (subtítulo passa a "Abre no WhatsApp") para reforçar custo zero. Espaçamento do topo e do herói reduzidos no mobile para manter Bebel, chamada e botão visíveis sem rolagem; no desktop os tamanhos originais são restaurados via media query.

### Tasks - Front-end

- [x] Criar a feature `wpp` em `src/app/modules/wpp/components/` com `wpp-bebelzinha.component.ts`, `.html` e `.scss`, seguindo a estrutura de módulos do projeto.
  > ✅ 2026-10-19 12:05 — Criados `wpp-bebelzinha.component.ts`, `.html` e `.scss` em `src/app/modules/wpp/components/`. Componente standalone OnPush, injeta `SeoService` e `AnalyticsService`. URL do canal em constante `WHATSAPP_CHANNEL_URL` com placeholder destacado (`COLOQUE_O_LINK_REAL_DO_CANAL`).
- [x] Adicionar a rota `wpp-bebelzinha` em `src/app/app.routes.ts` com carregamento lazy, sem entrada no menu.
  > ✅ 2026-10-19 12:05 — Rota `wpp-bebelzinha` adicionada com `loadComponent`, antes do curinga `**`. Nenhuma entrada em sidebar/bottom-nav.
- [x] Esconder o shell visual (sidebar e bottom-nav) e o `OnboardingComponent` quando a rota ativa for a landing.
  > ✅ 2026-10-19 12:05 — `App` agora expõe `isLanding` (signal derivado de `NavigationEnd` via `toSignal`). `app.html` renderiza a shell e o onboarding dentro de `@else`; a landing usa `<main class="app-content app-content--landing">` com `router-outlet` e sem padding de bottom-nav.
- [x] Registrar um evento de analytics de clique no botão do canal, com link que abre o WhatsApp em nova aba.
  > ✅ 2026-10-19 12:05 — O CTA é um `<a target="_blank" rel="noopener noreferrer">`. A visita já é registrada pelo `page_view` do `AnalyticsService`.
  > ✅ 2026-10-19 12:20 — Revisão do responsável: adicionados eventos de negócio `'ChannelLandingView'` (disparado no construtor do componente, mede acesso à página) e `'WhatsAppChannelClick'` (disparado em `onJoin()`, mede clique no botão). O union `BusinessEvent` foi ampliado com os dois.
- [x] Atualizar título e descrição via `SeoService` na landing.
  > ✅ 2026-10-19 12:05 — `SeoService.update` chamado no construtor com title "Cantinho da Bebel — convite especial no WhatsApp", description do convite e `path: 'wpp-bebelzinha'` (canonical).


## Resultado Esperado

- Acessar `http://localhost:4200/wpp-bebelzinha` mostra a landing sem menu lateral, sem bottom-nav e sem onboarding.
- O botão "Quero entrar no canal" abre o canal do WhatsApp em nova aba e registra o clique no analytics.
- As demais rotas continuam com o shell e o comportamento atuais.

> ✅ 2026-10-19 12:05 — `npx ng build` concluído com sucesso (chunk `wpp-bebelzinha-component` gerado). `npx ng test --watch=false` mantém as 3 falhas pré-existentes (`home.component.spec.ts` x2 e `app.spec.ts` x1), sem novas falhas introduzidas.

## Encerramento

Esta spec termina apenas quando todos os itens estiverem marcados e com evidência registrada, no formato definido em [Como executar](../shared/como-executar.md).
