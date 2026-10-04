# 010-listas-de-compras-locais

## Objetivo

Entregar uma lista de compras útil e recorrente dentro da Bebel, com múltiplas listas e persistência local no dispositivo.

## Escopo

- ativar o menu Compras no desktop e mobile;
- criar rota de listagem em `/compras`;
- criar rota de detalhe em `/compras/:listId`;
- permitir CRUD de múltiplas listas;
- permitir CRUD de itens dentro de cada lista;
- permitir marcar/desmarcar itens com `mat-slide-toggle`;
- manter itens comprados visíveis, riscados e abaixo dos pendentes;
- persistir listas e itens em `localStorage`;
- usar SweetAlert2 nas operações de criação/edição e nas confirmações de exclusão;
- fornecer estados vazios para nenhuma lista e lista sem itens;
- preservar um método simples de adicionar item por `listId` para integração futura com outras features;
- remover Compras da área “Em breve” da Home.

## Fora de escopo

- login;
- sincronização entre dispositivos;
- backend ou banco server-side;
- compartilhamento;
- preço e comparação de preços;
- quantidade avançada e unidade de medida;
- categorização automática;
- IA;
- integração com Comidinhas nesta entrega;
- notificações;
- histórico de compras.

## Modelo local

`ShoppingList`: `id`, `name`, `createdAt`, `updatedAt`, `items`.

`ShoppingItem`: `id`, `name`, `checked`, `createdAt`, `updatedAt`.

Chave: `bebel.shopping-lists.v1`.

## Premissas

- nomes vazios não são aceitos;
- listas podem ter nomes repetidos;
- marcar/desmarcar é imediato por ser reversível;
- criar e editar usam o próprio SweetAlert2 como entrada e confirmação;
- excluir lista ou item exige confirmação;
- dados inválidos no `localStorage` caem para estado vazio.

## Critérios de aceite

- [x] Compras aparece como item funcional e leva para `/compras`.
- [x] Sem listas, existe estado vazio com ação para criar a primeira.
- [x] É possível criar, renomear, visualizar e excluir listas.
- [x] É possível criar, editar, visualizar e excluir itens.
- [x] Itens são marcados/desmarcados com `mat-slide-toggle`.
- [x] Comprados ficam visíveis, riscados e abaixo dos pendentes.
- [x] Listas e itens persistem em `localStorage`.
- [x] SweetAlert2 é usado nas mutações previstas.
- [x] Não foi introduzido backend, conta ou sincronização.
- [~] Build local pendente por alteração em código da aplicação.

## Validação

Revisão estática de rotas, imports, persistência e fluxos concluída.

Executar localmente:

`npm run build`

Validação visual manual recomendada em mobile e desktop.
