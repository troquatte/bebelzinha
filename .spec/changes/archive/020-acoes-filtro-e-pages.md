# 020-acoes-filtro-e-pages

## Objetivo

Dar saída clara ao filtro guiado da Bebel e corrigir a configuração do workflow de Pages.

## Critérios de aceite

- [~] Resultado guiado exibe “Filtrar novamente”.
- [~] Resultado guiado exibe “Cancelar filtro”.
- [~] “Filtrar novamente” reabre a primeira pergunta sem introduzir filtros externos.
- [~] “Cancelar filtro” limpa refeição, tempo e contexto e volta a exibir todas as receitas.
- [~] Infinite scroll continua funcionando em lotes de 10.
- [~] Workflow não tenta criar/habilitar o site Pages via token do Actions.
- [~] Deploy continua usando `actions/configure-pages` após a ativação manual de Pages.
