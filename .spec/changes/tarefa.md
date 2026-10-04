# Tarefa — Feature Compras

## Modo

FULL

## Necessidade

Criar a primeira versão funcional da área Compras da Bebel.

A pessoa deve poder criar múltiplas listas de compras, renomear, visualizar e excluir cada lista. Dentro de cada lista, deve poder criar, visualizar, editar, excluir e marcar/desmarcar itens como comprados.

Os dados devem permanecer no dispositivo usando localStorage, sem conta, backend ou sincronização.

O status de comprado deve ser controlado com `mat-slide-toggle`.

A experiência deve ser mobile first, rápida para uso no mercado e ter estados vazios claros.

Confirmações e ações de criar/editar/excluir devem seguir o padrão permanente com SweetAlert2. Marcar/desmarcar item é reversível e não exige confirmação.

A estrutura deve permitir que, futuramente, outra feature como Comidinhas consiga adicionar itens a uma lista existente, sem implementar essa integração agora.
