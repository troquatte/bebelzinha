# 019-comidinhas-sem-filtros-externos

## Objetivo

Deixar Comidinhas mais direta: a Bebel faz a filtragem pelo fluxo guiado e, abaixo, aparece apenas a lista de receitas.

## Escopo

- remover título/heading do browser de receitas;
- remover busca textual;
- remover chips de Refeição, Tempo e Jeito;
- remover botão “Quero procurar mais...”;
- manter os filtros internos alimentados pelo fluxo da Bebel;
- sem filtro interno ativo, mostrar todas as receitas;
- manter infinite scroll de 10 em 10;
- remover sinais, métodos e CSS sem uso.

## Critérios de aceite

- [~] Após o card da Bebel, aparecem diretamente os cards de receita.
- [~] Não existe busca textual nem chips externos.
- [~] As escolhas da Bebel continuam filtrando a lista.
- [~] Sem escolhas, todas as receitas ficam elegíveis.
- [~] Infinite scroll continua em lotes de 10.
- [~] Código e estilos obsoletos removidos.
