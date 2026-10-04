# 011-consistencia-visual-lista-de-compras

## Objetivo

Fazer a Lista de compras parecer parte natural da mesma aplicação da Home, reforçando personagem, movimento e consistência tipográfica.

## Escopo

- alterar o texto “Bebel diz”;
- renomear Compras para “Lista de compras” na navegação;
- adicionar retrato da Bebel, brilhos e balão no hero da listagem;
- adicionar microinterações sutis na listagem e detalhe;
- respeitar `prefers-reduced-motion`;
- centralizar escala de `h1` a `h5` e parágrafos em `src/styles.scss`;
- remover sobrescritas tipográficas locais redundantes;
- atualizar diretrizes permanentes de frontend.

## Fora de escopo

- alterar CRUD;
- mudar persistência;
- adicionar novas dependências;
- mudar rotas;
- reintroduzir piscada da Bebel.

## Critérios de aceite

- [x] O texto lateral foi substituído por uma frase coerente com a voz da Bebel.
- [x] A navegação exibe “Lista de compras”.
- [x] O hero de Lista de compras utiliza a mesma imagem da Bebel da Home.
- [x] A área de compras possui microinterações moderadas.
- [x] Usuários com redução de movimento não recebem animações decorativas.
- [x] `h1` a `h5` e `p` possuem padrão global em `src/styles.scss`.
- [x] Home e Compras deixam de duplicar regras tipográficas globais onde não são necessárias.
- [x] A diretriz de frontend registra a tipografia global como fonte de verdade.
- [~] Build local pendente por alteração em código/estilo.

## Validação

Revisão estática concluída.

Executar localmente:

`npm run build`

Recomenda-se validação visual em mobile e desktop, principalmente do hero com a Bebel e do texto “Lista de compras” na navegação mobile.
