# 039-corrigir-layout-mobile-e-confirmar-repeticao-lista

## Objetivo

Corrigir os problemas visuais observados no cabeçalho da lista de compras e no card de retorno da Home, além de exigir confirmação antes de duplicar uma lista.

## Critérios de aceite

- [ ] No mobile, “Usar essa lista de novo” ocupa uma linha inteira.
- [ ] No mobile, “Editar lista” e “Adicionar item” ficam equilibrados lado a lado.
- [ ] Botões não estouram, espremem texto nem criam larguras imprevisíveis.
- [ ] No card de retorno da Home, conteúdo e CTA não competem pela mesma coluna em telas pequenas.
- [ ] O ícone contextual do card de retorno fica proporcional ao restante da composição.
- [ ] O título de retorno não deixa emoji isolado em uma linha.
- [ ] Ao tocar “Usar essa lista de novo”, SweetAlert2 pede confirmação antes da cópia.
- [ ] Cancelar a confirmação não cria lista.
- [ ] Confirmar mantém a regra atual: nova lista independente e itens desmarcados.
- [ ] Build Angular validado pelo CI.
- [ ] Entrega publicada em main.
- [ ] main e development equalizadas.

## Fora de escopo

- redesenhar toda a tela de compras;
- alterar lógica de repetição;
- criar novo modal;
- alterar tipografia global.
