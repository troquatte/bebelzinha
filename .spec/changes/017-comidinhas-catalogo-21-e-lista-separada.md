# 017-comidinhas-catalogo-21-e-lista-separada

## Objetivo

Melhorar a clareza da Lista de compras, ajustar detalhes visuais de Comidinhas e ampliar o catálogo para 21 receitas com imagem própria.

## Escopo

- remover “A Bebel separou” do estado de resultado do fluxo guiado;
- separar a lista de compras em “Falta pegar” e “Já no carrinho”;
- mover automaticamente o item para a seção correta quando o toggle mudar;
- preservar edição, exclusão e contagem atuais;
- aplicar o background padrão do Material ao track no hover sem foco/ativo;
- manter 21 receitas ativas no catálogo local;
- manter um arquivo JSON por receita;
- atribuir uma imagem própria e realista a cada receita.

## Fora de escopo

- mudar a lógica de persistência de Compras;
- criar backend ou CMS;
- alterar o contrato público de Recipe;
- criar calendário semanal;
- adicionar novas dependências.

## Critérios de aceite

- [~] O label “A Bebel separou” não aparece no resultado guiado.
- [~] Itens não comprados aparecem em “Falta pegar”.
- [~] Itens comprados aparecem em “Já no carrinho”.
- [~] Ao alternar o toggle, o item troca de seção imediatamente.
- [~] O track do toggle preserva o background padrão também em hover.
- [~] O catálogo possui exatamente 21 receitas ativas.
- [~] As 21 receitas possuem imagem própria.
- [~] Build local pendente após implementação.

## Validação

Revisão estática do fluxo, catálogo e estilos.

Executar ao final:

`npm run build`

Validar manualmente a tela de compras e o catálogo de Comidinhas em mobile.
