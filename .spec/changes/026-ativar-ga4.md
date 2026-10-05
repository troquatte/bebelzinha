# 026-ativar-ga4

## Objetivo

Ativar a integração Google Analytics 4 já existente na SPA com o Measurement ID real fornecido.

## Contexto

A Spec 025 preparou uma integração GA4 própria para SPA. Ela lê o Measurement ID da meta `google-analytics-id` em `src/index.html`, carrega `gtag.js` somente quando o valor é válido e registra `page_view` nas mudanças de rota Angular.

## Escopo

- preencher a meta `google-analytics-id` com `G-RL10XLKR71`;
- preservar o `AnalyticsService` existente;
- validar build no CI.

## Fora de escopo

- adicionar outro snippet `gtag.js`;
- Google Tag Manager;
- eventos customizados;
- Consent Mode;
- alterações adicionais de tracking.

## Critérios de aceite

- [ ] A meta `google-analytics-id` contém `G-RL10XLKR71`.
- [ ] Não existe um segundo snippet `gtag.js` estático em `src/index.html`.
- [ ] O tracking SPA continua sendo responsabilidade do `AnalyticsService`.
- [ ] Build Angular validado pelo CI.

## Tasks

- [ ] Ativar o Measurement ID do GA4 no ponto de configuração existente.
- [ ] Revisar se não houve duplicação do snippet padrão do Google.
- [ ] Validar build Angular no CI.
