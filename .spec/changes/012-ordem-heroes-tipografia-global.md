# 012-ordem-heroes-tipografia-global

## Objetivo

Corrigir a composição dos heroes com a Bebel e consolidar uma única escala tipográfica funcional para toda a aplicação.

## Escopo

- colocar a imagem da Bebel à esquerda e o conteúdo textual à direita na Home;
- aplicar a mesma ordem no hero da Lista de compras;
- definir em `src/styles.scss` a escala global de `h1` a `h6` e `p`;
- utilizar `fn.rem-calc` para converter os tamanhos de 38px, 18px e 16px;
- remover sobrescritas locais de tipografia/margens que conflitem com o padrão global;
- trocar elementos usados apenas como labels/eyebrows de `p` para `span` quando necessário;
- atualizar as diretrizes permanentes de frontend.

## Fora de escopo

- alterar conteúdo funcional das features;
- mudar CRUD ou persistência;
- adicionar dependências;
- alterar animações existentes além do necessário para preservar a composição.

## Critérios de aceite

- [x] Home exibe Bebel à esquerda e texto à direita no hero.
- [x] Lista de compras exibe Bebel à esquerda e texto à direita no hero.
- [x] `h1` e `h2` usam 38px via `rem-calc`, line-height 120%, margin 0 e peso bold.
- [x] `h3` a `h6` usam 18px via `rem-calc`, line-height 120%, margin 0 e peso bold.
- [x] `p` usa 16px via `rem-calc`, line-height 120% e margin `0.75rem 0 0`.
- [x] Labels/eyebrows não dependem de sobrescrever o padrão global de parágrafo.
- [x] Diretriz de frontend registra a nova fonte de verdade tipográfica.
- [~] Build local pendente por alteração em código/estilo.

## Validação

Revisão estática concluída.

Executar localmente:

`npm run build`

Validação visual recomendada na Home e em Lista de compras, em mobile e desktop.
