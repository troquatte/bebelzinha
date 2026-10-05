# 028-corrigir-ga4-e-microinteracoes-hero

## Objetivo

Corrigir a ativação do GA4 e garantir que o padrão de microinterações dos heroes da Bebel seja efetivamente perceptível e reutilizável em produção.

## Contexto

A integração anterior carregava `gtag.js` dinamicamente via Angular. Embora válida em teoria, ela não reproduzia o snippet oficial no documento e ficou mais difícil de detectar/validar. O tracking de SPA deve continuar manual para evitar page views duplicados.

As microinterações foram centralizadas em classes globais, mas ficaram sutis demais e dependentes apenas das classes auxiliares. O padrão deve também atingir diretamente os heroes existentes.

## Escopo

- inserir o snippet oficial do GA4 em `src/index.html`;
- configurar `G-RL10XLKR71` com `send_page_view: false`;
- simplificar `AnalyticsService` para apenas emitir page views de SPA;
- remover carregamento dinâmico de `gtag.js` do service;
- reforçar o CSS compartilhado dos heroes;
- aplicar seletores diretos aos quatro heroes atuais;
- adicionar movimento contínuo sutil no retrato/elementos decorativos;
- preservar reduced motion;
- validar build no CI;
- sincronizar o conteúdo final em `development` e `main`.

## Fora de escopo

- Google Tag Manager;
- eventos de conversão customizados;
- Consent Mode;
- biblioteca de animação;
- redesign dos headers.

## Critérios de aceite

- [x] `src/index.html` contém o script oficial `gtag.js?id=G-RL10XLKR71`.
- [x] O `config` do GA4 usa `send_page_view: false`.
- [x] `AnalyticsService` não cria nem injeta outro script do Google.
- [x] Mudanças de rota Angular disparam `page_view`.
- [x] Home, Compras, Comidinhas e Achadinhos possuem animação de entrada compartilhada.
- [x] Balão, sparks e retrato apresentam movimento sutil perceptível.
- [x] `prefers-reduced-motion: reduce` remove movimentos não essenciais.
- [x] Nenhuma dependência nova é adicionada.
- [x] Build Angular validado pelo CI.
- [ ] `main` e `development` terminam com a mesma árvore de arquivos.

## Tasks

- [x] Corrigir bootstrap do GA4 no HTML.
  > ✅ 2026-10-05 10:41 — `src/index.html` passou a carregar o snippet oficial `gtag.js` com `G-RL10XLKR71` e `send_page_view: false`.
- [x] Simplificar AnalyticsService para tracking SPA.
  > ✅ 2026-10-05 10:41 — `AnalyticsService` não injeta mais script; observa `NavigationEnd` e envia `page_view` com `send_to` para o Measurement ID.
- [~] Reforçar padrão global de microinterações dos heroes.
  > ✅ 2026-10-05 10:47 — CSS global agora mira diretamente os quatro heroes, inclui entrada, flutuação contínua do retrato, balão, sparks e hover sutil. Build aprovado no CI.
- [x] Revisar os quatro heroes e reduced motion.
  > ✅ 2026-10-05 10:41 — Revisão estática confirmou seletores diretos para Home, Compras, Comidinhas e Achadinhos, com fallback `prefers-reduced-motion`.
- [x] Validar build Angular no CI.
  > ✅ 2026-10-05 10:47 — Workflow `Build and deploy GitHub Pages` run `37318043539` concluído com sucesso; build e shells estáticos aprovados.
- [ ] Integrar em development.
- [ ] Sincronizar e integrar em main.
- [ ] Confirmar igualdade final entre main e development.
