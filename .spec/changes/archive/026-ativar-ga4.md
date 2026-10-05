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

- [x] A meta `google-analytics-id` contém `G-RL10XLKR71`.
- [x] Não existe um segundo snippet `gtag.js` estático em `src/index.html`.
- [x] O tracking SPA continua sendo responsabilidade do `AnalyticsService`.
- [x] Build Angular validado pelo CI.

## Tasks

- [x] Ativar o Measurement ID do GA4 no ponto de configuração existente.
  > ✅ 2026-10-05 10:10 — `src/index.html` atualizado para `G-RL10XLKR71` no ponto de configuração já existente.
- [x] Revisar se não houve duplicação do snippet padrão do Google.
  > ✅ 2026-10-05 10:10 — Revisão estática confirmou que `src/index.html` não contém um segundo `gtag.js`; o `AnalyticsService` permanece responsável pelo carregamento e pelos page views da SPA.
- [x] Validar build Angular no CI.
  > ✅ 2026-10-05 10:14 — Workflow `Build and deploy GitHub Pages` run `37314315976` concluído com sucesso; build e geração dos shells estáticos aprovados.


## Encerramento

> ✅ 2026-10-05 10:15 — Spec revisada, validada e encerrada após integração do PR #47 em `development`.

### Validações finais

- revisão estática: aprovada;
- workflow `Build and deploy GitHub Pages` run `37314315976`: concluído com sucesso;
- build Angular: concluído com sucesso;
- geração dos shells estáticos: concluída com sucesso;
- testes unitários: não executados, conforme regra operacional do projeto.

### Memória atualizada

- `.spec/memory/produto.md`: nenhuma alteração necessária;
- `.spec/memory/contexto-tecnico.md`: nenhuma alteração necessária, pois a integração GA4 já estava documentada;
- `.spec/memory/estrutura.md`: nenhuma alteração necessária;
- `.spec/memory/changelog.md`: registrada a Spec 026.

### Entrega

- PR de implementação: #47;
- merge em `development`: `1d96436819213b316fd9415de159ebec6d0932c6`;
- Measurement ID ativo: `G-RL10XLKR71`.

### Observações

- o snippet bruto fornecido pelo Google não foi duplicado;
- o `AnalyticsService` continua responsável pelo tracking de navegação SPA;
- nenhuma pendência conhecida dentro do escopo da spec.
