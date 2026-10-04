# Tarefa — Ordem dos heroes e tipografia global

## Modo

FULL

## Necessidade

1. Em todos os headers que exibem a imagem da Bebel, deixar a imagem à esquerda e o texto à direita.
2. Padronizar a tipografia da aplicação inteira:
   - `h1` e `h2`: `line-height: 120%`, `margin: 0`, `font-size: 38px` convertido com `rem-calc` e `font-weight: bold`;
   - `h3`, `h4`, `h5` e `h6`: `line-height: 120%`, `margin: 0`, `font-size: 18px` convertido com `rem-calc` e `font-weight: bold`;
   - `p`: `margin: 0.75rem 0 0`, `font-size: 16px` convertido com `rem-calc` e `line-height: 120%`.
3. Fazer esses padrões partirem do SCSS global e remover sobrescritas locais que impedem a consistência.
4. Corrigir labels que estavam usando `p` apenas para estilo, evitando que precisem quebrar a regra global.

Atenção especial para não manter estilos conflitantes ou sem efeito.
