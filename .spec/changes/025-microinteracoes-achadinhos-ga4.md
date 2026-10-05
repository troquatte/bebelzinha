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

- [ ] Cards e CTAs de Achadinhos oferecem feedback visual discreto em hover/press sem alterar funcionalidade.
- [ ] Imagens e elementos decorativos possuem movimento sutil sem comprometer legibilidade.
- [ ] O detalhe do achadinho e o spotlight contextual seguem a mesma linguagem de microinterações.
- [ ] Usuários com `prefers-reduced-motion: reduce` não recebem animações/transições não essenciais.
- [ ] Sem Measurement ID válido, nenhum script do Google Analytics é carregado.
- [ ] Com um Measurement ID válido `G-...`, o app carrega `gtag.js` uma única vez.
- [ ] A navegação entre rotas registra `page_view` sem recarregar a página.
- [ ] Nenhuma nova dependência é adicionada.
- [ ] Build Angular é validado pelo CI.

## Tasks

- [ ] Refinar microinterações da listagem de Achadinhos.
- [ ] Refinar microinterações do detalhe de Achadinhos e spotlight contextual.
- [ ] Criar integração GA4 opcional para SPA.
- [ ] Conectar a integração ao shell da aplicação e documentar o ponto de configuração do Measurement ID.
- [ ] Revisar implementação, segurança e compatibilidade com a spec.
- [ ] Validar o build Angular no CI.
