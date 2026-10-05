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

- [ ] `src/index.html` contém o script oficial `gtag.js?id=G-RL10XLKR71`.
- [ ] O `config` do GA4 usa `send_page_view: false`.
- [ ] `AnalyticsService` não cria nem injeta outro script do Google.
- [ ] Mudanças de rota Angular disparam `page_view`.
- [ ] Home, Compras, Comidinhas e Achadinhos possuem animação de entrada compartilhada.
- [ ] Balão, sparks e retrato apresentam movimento sutil perceptível.
- [ ] `prefers-reduced-motion: reduce` remove movimentos não essenciais.
- [ ] Nenhuma dependência nova é adicionada.
- [ ] Build Angular validado pelo CI.
- [ ] `main` e `development` terminam com a mesma árvore de arquivos.

## Tasks

- [ ] Corrigir bootstrap do GA4 no HTML.
- [ ] Simplificar AnalyticsService para tracking SPA.
- [ ] Reforçar padrão global de microinterações dos heroes.
- [ ] Revisar os quatro heroes e reduced motion.
- [ ] Validar build Angular no CI.
- [ ] Integrar em development.
- [ ] Sincronizar e integrar em main.
- [ ] Confirmar igualdade final entre main e development.
