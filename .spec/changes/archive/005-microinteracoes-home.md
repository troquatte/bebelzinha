# 005-microinteracoes-home

## Objetivo

Dar mais vida e personalidade à Home da Bebel com microinterações sutis, sem transformar a interface em algo chamativo ou cansativo.

## Escopo

- remover o selo “B” de “Hoje com a Bebel”;
- remover altura mínima fixa dos cards futuros;
- adicionar entrada suave dos principais blocos;
- adicionar movimento leve em elementos expressivos da marca;
- criar uma piscada sutil da Bebel;
- adicionar respostas discretas a hover onde fizer sentido;
- respeitar `prefers-reduced-motion`.

## Fora de escopo

- novas funcionalidades;
- bibliotecas de animação;
- animações complexas;
- testes unitários;
- mudanças de rotas ou dados.

## Critérios de aceite

- [x] O selo “B” não aparece mais no card “Hoje com a Bebel”.
- [x] Os cards futuros não possuem mais `min-height` fixo.
- [x] A Bebel possui uma piscada visual sutil e periódica.
- [x] Hero, cards, balão e elementos decorativos possuem microinterações moderadas.
- [x] A interface possui fallback para `prefers-reduced-motion: reduce`.
- [x] Nenhuma biblioteca nova foi adicionada.
- [~] Build local pendente por haver alteração de código da aplicação.

## Decisão de implementação

As microinterações foram implementadas somente com CSS para evitar dependência nova e manter o comportamento leve. A piscada é uma sobreposição visual curta posicionada sobre um dos olhos da personagem, sem alterar o asset original.

## Validação

Revisão estática concluída.

Executar localmente:

`npm run build`

Validação visual em mobile e desktop é recomendada, principalmente para confirmar o posicionamento da piscada sobre o rosto da Bebel.
