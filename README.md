# Bebelzinha

Webapp da **Bebel**, uma ajudante prática para organização da vida doméstica.

> **Bebel é um app gratuito de organização prática da vida doméstica, monetizado por afiliados e futuras ofertas.**

## Stack atual

- Angular 22
- TypeScript 6
- SSG seletivo com navegação SPA
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

O build gera HTML pronto em `/comidinhas`, `/cortadores` e `/wpp-bebelzinha`. Áreas pessoais e produto continuam CSR. A saída para hospedagem estática fica em `dist/bebelzinha/browser`, sem servidor de produção. O pós-build preserva SSG, gera fallback e valida os artefatos. Também gera sitemap.xml e robots.txt automaticamente a partir das páginas publicáveis. Novos posts SSG entram sem editar XML; removidos/noindex ficam fora. Atualizações do catálogo local exigem novo build.

Plano de evolução: [SEO e biblioteca de receitas](doc/plano-seo-editorial.md).

Detalhes do fluxo de publicação e SEO: [guia de SEO automático](doc/seo-publicacao.md).

## Spec Driven Development

O desenvolvimento do projeto é guiado pelo processo SDD documentado em [`.spec/README.md`](.spec/README.md).

Antes de implementar uma mudança relevante:

1. leia `.spec/memory/produto.md`;
2. leia `.spec/memory/contexto-tecnico.md`;
3. crie ou revise a spec correspondente em `.spec/changes/`;
4. implemente somente após a spec estar clara;
5. registre decisões duráveis na memória do projeto.

Regras para agentes estão em [`.agents/AGENTS.md`](.agents/AGENTS.md).

482719

## Biblioteca editorial

Fontes em `content/editorial`; pacote público gerado automaticamente antes de build/start/watch. Legados preservados fora de public; produto pago independente. [Fluxo e contrato](doc/fluxo-editorial-receitas.md) e [inventário revisado](doc/inventario-receitas.md). A etapa atual prepara dados/seletores; primeira página completa é a próxima entrega.
