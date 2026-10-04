# Tarefa — Corrigir carregamento dos estilos globais

## Modo

FULL

## Problema

A tipografia definida em `src/styles.scss` não aparece na aplicação. Home e Lista de compras continuam com headings e parágrafos pequenos mesmo após a padronização global.

## Causa identificada

`angular.json` carrega apenas:

- `src/material-theme.scss`;
- `src/styles.css`.

O arquivo `src/styles.scss`, que contém as regras globais de `h1` a `h6` e `p`, não está incluído no build da aplicação.

## Necessidade

1. carregar `src/styles.scss` globalmente;
2. manter `src/styles.css` para Tailwind;
3. garantir que `styles.scss` seja carregado depois de `styles.css`, para a tipografia da Bebel prevalecer;
4. registrar essa organização no SDD para evitar regressão.
