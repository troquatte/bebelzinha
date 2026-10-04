# Estrutura do Projeto

## Estado atual

O repositório começa como uma aplicação Angular 22 simples e deve evoluir incrementalmente.

```text
.
├── .agents/
├── .spec/
├── public/
├── src/
│   ├── app/
│   ├── scss/
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
└── package.json
```

Não antecipar monorepo, múltiplas aplicações, backend ou packages compartilhados sem necessidade concreta.

## SDD

- `.spec/changes` — mudanças ativas e histórico arquivado;
- `.spec/memory` — contexto permanente do produto e da arquitetura;
- `.spec/shared` — regras reutilizáveis;
- `.spec/templates` — modelos para novas specs.

## Frontend

A aplicação fica em `src/app` e deve crescer por domínio/feature quando as funcionalidades surgirem.

Estrutura possível, **somente quando houver necessidade real**:

```text
src/app/
  core/
  shared/
  modules/
    <feature>/
```

### `core`
Responsabilidades realmente globais da aplicação.

### `shared`
Somente código reutilizável, genérico e sem regra de negócio específica.

### `modules/<feature>`
UI, estado e serviços ligados a uma área funcional do produto.

## Estilos

O design system vive em `src/scss/`.

Antes de criar valores novos, verificar tokens, variáveis, mixins e componentes existentes.

## Limites

- componentes visuais não devem concentrar regras de negócio complexas;
- código compartilhado não deve conhecer detalhes de uma feature específica;
- persistência e integrações futuras devem ser adicionadas somente quando uma spec exigir;
- a spec descreve a mudança antes da implementação;
- arquitetura deve refletir o produto atual, não uma escala hipotética.

## Evolução futura

Backend, banco de dados, autenticação, armazenamento de objetos ou packages compartilhados podem ser introduzidos quando uma necessidade de produto justificar.

Até lá, manter a fundação simples.
