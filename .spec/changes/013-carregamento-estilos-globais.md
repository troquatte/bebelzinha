# 013-carregamento-estilos-globais

## Objetivo

Fazer a aplicação realmente consumir os estilos globais definidos em `src/styles.scss`.

## Contexto

A escala tipográfica foi implementada corretamente no arquivo SCSS, porém o Angular não estava carregando esse arquivo. Por isso as regras não chegavam ao CSS final e a interface continuava herdando estilos menores do Tailwind/Material/browser.

## Escopo

- adicionar `src/styles.scss` ao array global de estilos em `angular.json`;
- manter a ordem `material-theme.scss` → `styles.css` → `styles.scss`;
- documentar a responsabilidade de `styles.css` e `styles.scss`;
- manter a escala tipográfica já definida sem duplicá-la.

## Fora de escopo

- alterar novamente os tamanhos tipográficos;
- modificar componentes;
- remover Tailwind;
- alterar tema Material.

## Critérios de aceite

- [x] `src/styles.scss` está configurado como estilo global do Angular.
- [x] `src/styles.scss` é carregado depois de `src/styles.css`.
- [x] Tailwind continua carregado pelo `styles.css`.
- [x] A documentação registra a divisão de responsabilidades.
- [~] Build local pendente para confirmar compilação e resultado visual.

## Validação

Causa confirmada por inspeção de `angular.json`: `styles.scss` não fazia parte de `architect.build.options.styles`.

Executar:

`npm run build`

Depois, validar visualmente Home e Lista de compras.
