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

Estrutura padrão dos módulos:

```text
src/app/
  core/
  shared/
  modules/
    <feature>/
      components/
      shared/
      service/
      enum/
      interface/
      helpers/
      etc/
```

Dentro de `modules/<feature>`, arquivos não devem ficar soltos na raiz da feature. Cada responsabilidade deve viver na subpasta correspondente. Criar somente as subpastas que tenham conteúdo real; diretórios vazios não são necessários.

### `core`
Responsabilidades realmente globais da aplicação.

### `shared`
Somente código reutilizável, genérico e sem regra de negócio específica.

### `modules/<feature>`
UI, estado e serviços ligados a uma área funcional do produto.

Organização:
- `components/` — componentes Angular e seus templates/estilos;
- `service/` — services, stores e orquestração da feature;
- `interface/` — contratos, models e tipos de domínio da feature;
- `enum/` — enums quando existirem;
- `helpers/` — funções auxiliares específicas da feature;
- `shared/` — reutilização interna entre componentes da própria feature;
- outras subpastas podem existir quando uma responsabilidade concreta exigir.

## Estilos

O design system vive em `src/scss/`.

Entradas globais:
- `src/styles.css` — carrega Tailwind CSS;
- `src/styles.scss` — carrega o SCSS global da Bebel e deve vir depois de `styles.css` em `angular.json`.

Antes de criar valores novos, verificar tokens, variáveis, mixins e componentes existentes.

## Conteúdo editorial

Conteúdo estruturado da Bebel que não pertence a componentes pode ficar em `public/content/`.

Comidinhas usa `public/content/recipes/`, com um `index.json` e um arquivo JSON por receita. A interface consome um contrato próprio e não deve depender da futura origem dos dados.


## SEO e publicação estática

- `src/app/core/seo.service.ts` centraliza title, description, Open Graph, Twitter Card e canonical no runtime.
- `scripts/generate-pages.mjs` gera shells HTML estáticos para rotas públicas relevantes durante o deploy, preservando metadata específica sem SSR.
- `.github/workflows/pages.yml` valida o build e publica a saída Angular no GitHub Pages quando Pages estiver habilitado no repositório.
- Assets públicos usados por rotas devem respeitar o `base href`, evitando caminhos absolutos iniciados por `/` quando o app estiver hospedado em subdiretório.

## Limites

- componentes visuais não devem concentrar regras de negócio complexas;
- código compartilhado não deve conhecer detalhes de uma feature específica;
- persistência e integrações futuras devem ser adicionadas somente quando uma spec exigir;
- a spec descreve a mudança antes da implementação;
- arquitetura deve refletir o produto atual, não uma escala hipotética.

## Evolução futura

Backend, banco de dados, autenticação, armazenamento de objetos ou packages compartilhados podem ser introduzidos quando uma necessidade de produto justificar.

Até lá, manter a fundação simples.
