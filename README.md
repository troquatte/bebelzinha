# Bebelzinha

Webapp da **Bebel**, uma ajudante prática para organização da vida doméstica.

> **Bebel é um app gratuito de organização prática da vida doméstica, monetizado por afiliados e futuras ofertas.**

## Stack atual

- Angular 22
- TypeScript 6
- SPA
- Standalone Components
- Angular Router
- Signals
- Angular Material
- Tailwind CSS 4
- Vitest
- SCSS

## Desenvolvimento

```bash
npm install
npm start
```

Aplicação local: `http://localhost:4200`.

## Build e testes

```bash
npm run build
npm test
```

## Spec Driven Development

O desenvolvimento do projeto é guiado pelo processo SDD documentado em [`.spec/README.md`](.spec/README.md).

Antes de implementar uma mudança relevante:

1. leia `.spec/memory/produto.md`;
2. leia `.spec/memory/contexto-tecnico.md`;
3. crie ou revise a spec correspondente em `.spec/changes/`;
4. implemente somente após a spec estar clara;
5. registre decisões duráveis na memória do projeto.

Regras para agentes estão em [`.agents/AGENTS.md`](.agents/AGENTS.md).
