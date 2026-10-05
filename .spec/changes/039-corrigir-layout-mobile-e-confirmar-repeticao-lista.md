# 039-corrigir-layout-mobile-e-confirmar-repeticao-lista

## Objetivo

Corrigir os problemas visuais observados no cabeçalho da lista de compras e no card de retorno da Home, além de exigir confirmação antes de duplicar uma lista.

## Critérios de aceite

- [x] No mobile, “Usar essa lista de novo” ocupa uma linha inteira.
- [x] No mobile, “Editar lista” e “Adicionar item” ficam equilibrados lado a lado.
- [x] Botões não estouram, espremem texto nem criam larguras imprevisíveis.
- [x] No card de retorno da Home, conteúdo e CTA não competem pela mesma coluna em telas pequenas.
- [x] O ícone contextual do card de retorno fica proporcional ao restante da composição.
- [x] O título de retorno não deixa emoji isolado em uma linha.
- [x] Ao tocar “Usar essa lista de novo”, SweetAlert2 pede confirmação antes da cópia.
- [x] Cancelar a confirmação não cria lista.
- [x] Confirmar mantém a regra atual: nova lista independente e itens desmarcados.
- [x] Build Angular validado pelo CI.
- [ ] Entrega publicada em main.
- [ ] main e development equalizadas.

## Fora de escopo

- redesenhar toda a tela de compras;
- alterar lógica de repetição;
- criar novo modal;
- alterar tipografia global.


## Evidências de implementação

- cabeçalho mobile usa grid de duas colunas; repetição ocupa a linha inteira;
- desktop volta a layout flexível;
- card de retorno usa uma coluna no mobile e duas em telas maiores;
- ícone contextual recebeu tamanho e container próprios;
- título de retorno não inclui mais emoji no texto;
- `repeatList()` usa SweetAlert2 e só executa a duplicação após confirmação positiva;
- revisão estática concluída; workflow `37340694465` com build e shells estáticos aprovados.
