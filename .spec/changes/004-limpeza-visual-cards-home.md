# 004-limpeza-visual-cards-home

## Objetivo

Simplificar visualmente os cards da seção “Os cantinhos que vêm por aí”.

## Escopo

- remover os ícones dos três cards;
- remover o espaçamento superior de `.feature-card__heading`.

## Fora de escopo

- novas funcionalidades;
- mudanças de conteúdo;
- novas dependências;
- testes unitários.

## Critérios de aceite

- [x] Os ícones dos cards não são mais renderizados.
- [x] `.feature-card__heading` não possui mais `margin-top: 1rem`.
- [x] Título, tag “Em breve” e descrição permanecem intactos.
- [x] Nenhuma funcionalidade nova foi adicionada.
- [~] Build local pendente por haver alteração de código da aplicação.

## Validação

Revisão estática concluída.

Executar localmente:

`npm run build`

Validação visual permanece recomendada e não bloqueante.
