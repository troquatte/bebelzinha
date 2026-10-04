# 015-comidinhas-guiadas

## Objetivo

Transformar Comidinhas em uma experiência prática para decidir o que cozinhar, explorar receitas, guardar favoritas, planejar a semana e conectar ingredientes à Lista de compras.

## Contexto

A Bebel precisa ir além de um blog de receitas. A proposta é reduzir a decisão “o que eu faço de comida hoje?” com um fluxo curto e guiado, mantendo um catálogo navegável para quem já sabe o que procura.

## Escopo

- ativar Comidinhas na navegação desktop e mobile;
- criar rota principal `/comidinhas` e detalhe `/comidinhas/:slug`;
- criar catálogo local estruturado, versionado e separado do estado da pessoa;
- criar contrato TypeScript para Recipe, Ingredient e RecipeStep;
- carregar receitas a partir de arquivos locais;
- oferecer busca por texto e filtros simples;
- oferecer fluxo guiado pela Bebel com poucas perguntas e até 3 sugestões;
- permitir pedir outras sugestões e alterar escolhas;
- criar página de receita com imagem, introdução, tempo, rendimento, ingredientes, preparo e dica da Bebel;
- salvar/desalvar receitas no localStorage;
- adicionar/remover receitas da Minha semana no localStorage;
- exibir áreas de receitas salvas e Minha semana;
- permitir selecionar ingredientes e enviar para Lista de compras;
- permitir escolher lista existente ou criar uma nova durante o envio;
- evitar duplicação simples por nome de ingrediente quando seguro;
- preservar quantidade/unidade no payload e apresentar texto legível na Lista de compras;
- manter integração sem IA, backend, banco ou conta.

## Modelo de conteúdo

`Recipe`:
- id
- slug
- title
- description
- mealTypes
- tags
- prepTimeMinutes
- servings
- image
- intro
- ingredients
- steps
- bebelTip
- active

`Ingredient`:
- id
- name
- quantity
- unit
- note opcional

`RecipeStep`:
- order
- text

## Persistência local

Chave de estado: `bebel.meals.v1`.

Estado mínimo:
- `savedRecipeIds`;
- `weeklyRecipeIds`.

O catálogo não deve ser misturado ao estado pessoal.

## Fluxo guiado

1. A pessoa escolhe uma necessidade principal, como almoço, janta, café/lanche, doce, rápido ou barato.
2. A Bebel pode refinar com tempo e/ou preferência simples.
3. O sistema filtra o catálogo local.
4. Exibe até 3 sugestões.
5. A pessoa pode abrir uma receita, pedir outras ou mudar escolhas.

Sem IA. A sensação de progressão vem do fluxo de escolha.

## Integração com Compras

- ingrediente individual, seleção ou todos;
- escolha de lista existente;
- criação de nova lista durante o fluxo;
- texto inicial do item: `Nome — quantidade unidade`;
- não somar/converter unidades;
- não duplicar ingrediente pelo mesmo nome-base quando já existir.

## Fora de escopo

- IA ou chatbot real;
- backend, banco, autenticação ou sincronização;
- CMS;
- comentários, avaliações e compartilhamento social;
- calorias e nutrição avançada;
- alergias e substituições automáticas;
- cálculo de porções ou conversão de unidades;
- calendário semanal completo;
- pontos, moedas, níveis, streaks ou rankings.

## Critérios de aceite

- [~] Comidinhas está disponível na navegação e abre a experiência principal.
- [~] A pessoa consegue buscar e filtrar receitas do catálogo local.
- [~] A pessoa consegue usar o fluxo guiado e receber até 3 sugestões compatíveis.
- [~] A pessoa consegue abrir uma receita pelo slug e ler todos os dados principais.
- [~] A pessoa consegue salvar/desalvar uma receita e manter o estado após recarregar.
- [~] A pessoa consegue adicionar/remover receita de Minha semana e manter o estado após recarregar.
- [~] A pessoa consegue enviar um, vários ou todos os ingredientes para Compras.
- [~] A pessoa consegue escolher uma lista existente ou criar uma nova durante o envio.
- [~] Ingredientes já presentes por nome-base não são duplicados.
- [~] Catálogo e estado pessoal permanecem separados.
- [~] Nenhum backend, IA ou calendário complexo foi introduzido.
- [~] Interface segue voz, identidade visual e responsividade da Bebel.
- [~] Build local pendente após implementação.

## Validação

Revisão estática, comparação com a spec e build local.

Executar ao final:

`npm run build`

Validação manual recomendada em mobile e desktop para fluxo guiado, busca/filtro, salvar, semana e integração com Compras.
