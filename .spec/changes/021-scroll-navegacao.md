# 021-scroll-navegacao

## Objetivo

Corrigir o CTA da hero de Comidinhas e padronizar o scroll ao navegar entre páginas.

## Escopo

- substituir o link de fragmento da hero por ação local de scroll;
- rolar suavemente até `#bebel-escolhe`;
- configurar o Angular Router para restaurar o topo em toda mudança de rota;
- manter suporte a anchor scrolling do Router;
- não alterar filtros, receitas ou estado persistido.

## Critérios de aceite

- [~] “Bebel, me ajuda a escolher” não muda de rota.
- [~] O CTA leva visualmente ao card da Bebel.
- [~] Ao trocar Home, Comidinhas, receita, Compras ou detalhe de lista, a nova rota começa no topo.
- [~] Infinite scroll continua restrito à página atual.
