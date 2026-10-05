# 025-microinteracoes-achadinhos-ga4

## Objetivo

Refinar a sensação de uso da área Achadinhos com microinterações sutis e preparar a aplicação Angular SPA para Google Analytics 4 sem depender de um Measurement ID fictício.

## Contexto

Achadinhos já possui catálogo, detalhe, filtros e recomendações contextuais. A experiência visual já inclui algumas transições básicas, mas ainda pode ganhar feedback de toque/hover e movimento mais consistente com o restante da Bebel.

A propriedade do Google Analytics ainda não foi criada. A configuração deve ficar pronta para ativação posterior sem quebrar a aplicação enquanto o ID estiver ausente.

## Escopo

- adicionar microinterações visuais na listagem de Achadinhos;
- adicionar microinterações no detalhe do achadinho;
- refinar o bloco contextual de Achadinhos usado em outras telas;
- respeitar `prefers-reduced-motion`;
- criar integração GA4 nativa e leve;
- ler o Measurement ID de uma meta tag em `src/index.html`;
- carregar `gtag.js` somente com ID válido no formato `G-...`;
- registrar page views quando a rota SPA mudar;
- manter Analytics inativo quando o ID estiver vazio.

## Fora de escopo

- biblioteca de animação;
- Google Tag Manager;
- eventos customizados de clique/conversão;
- Consent Mode ou banner de cookies;
- backend;
- persistência de dados analíticos no app;
- alteração na lógica de catálogo ou afiliados.

## Premissas

- o Measurement ID será preenchido depois da criação da propriedade GA4;
- o ID público do GA4 não é segredo;
- a ativação deve exigir apenas preencher a meta tag `google-analytics-id`;
- a navegação continua sendo SPA Angular.

## Critérios de aceite

- [x] Cards e CTAs de Achadinhos oferecem feedback visual discreto em hover/press sem alterar funcionalidade.
- [x] Imagens e elementos decorativos possuem movimento sutil sem comprometer legibilidade.
- [x] O detalhe do achadinho e o spotlight contextual seguem a mesma linguagem de microinterações.
- [x] Usuários com `prefers-reduced-motion: reduce` não recebem animações/transições não essenciais.
- [x] Sem Measurement ID válido, nenhum script do Google Analytics é carregado.
- [x] Com um Measurement ID válido `G-...`, o app carrega `gtag.js` uma única vez.
- [x] A navegação entre rotas registra `page_view` sem recarregar a página.
- [x] Nenhuma nova dependência é adicionada.
- [x] Build Angular é validado pelo CI.

## Tasks

- [x] Refinar microinterações da listagem de Achadinhos.
  > ✅ 2026-10-05 10:04 — Implementado e validado em `findings.component.html` e `findings.component.scss`: entrada escalonada, hover/press de filtros, cards, imagens e CTAs, com fallback de reduced motion. Build do CI aprovado.
- [x] Refinar microinterações do detalhe de Achadinhos e spotlight contextual.
  > ✅ 2026-10-05 10:04 — Implementado e validado em `finding.component.scss` e `finding-spotlight.component.scss`: entrada, feedback de imagem/CTA/card e reduced motion. Build do CI aprovado.
- [x] Criar integração GA4 opcional para SPA.
  > ✅ 2026-10-05 10:04 — Criado e validado `AnalyticsService` com validação de `G-...`, carregamento único de `gtag.js`, `send_page_view: false` e page views por `NavigationEnd`. Sem ID válido, o serviço não carrega script. Build do CI aprovado.
- [x] Conectar a integração ao shell da aplicação e documentar o ponto de configuração do Measurement ID.
  > ✅ 2026-10-05 10:04 — Serviço inicializado no `App` e meta `google-analytics-id` adicionada vazia em `src/index.html`, com instrução de preenchimento. Build do CI aprovado.
- [x] Revisar implementação, segurança e compatibilidade com a spec.
  > ✅ 2026-10-05 09:56 — Revisão estática concluída. Branch está 0 commits atrás de `development`, alterações restritas ao escopo, sem segredo, sem dependência nova e sem Measurement ID fictício.
- [x] Validar o build Angular no CI.
  > ✅ 2026-10-05 10:04 — Workflow `Build and deploy GitHub Pages` run `37313760662` concluído com sucesso; etapa `Build` e geração dos shells estáticos aprovadas.


## Encerramento

> ✅ 2026-10-05 10:06 — Spec revisada, validada e encerrada após integração do PR #45 em `development`.

### Validações finais

- revisão estática da implementação: aprovada;
- workflow `Build and deploy GitHub Pages` run `37313760662`: concluído com sucesso;
- etapa `Build`: concluída com sucesso;
- geração dos shells estáticos: concluída com sucesso;
- testes unitários: não executados, conforme regra operacional do projeto.

### Memória atualizada

- `.spec/memory/contexto-tecnico.md`: registrada a integração GA4 opcional da SPA;
- `.spec/memory/produto.md`: nenhuma alteração necessária;
- `.spec/memory/estrutura.md`: nenhuma alteração necessária;
- `.spec/memory/changelog.md`: registrada a Spec 025.

### Entrega

- PR de implementação: #45;
- merge em `development`: `9210e55edb5556a05c5f0c6d180d70a2e792e163`;
- Measurement ID permanece intencionalmente vazio até a propriedade GA4 ser criada.

### Observações

- para ativar o GA4, preencher a meta `google-analytics-id` em `src/index.html` com o valor real `G-...`;
- nenhuma pendência conhecida dentro do escopo da spec.
