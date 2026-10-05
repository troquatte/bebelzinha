# Tarefa — Investigar travadas e reduzir jank no app

## Modo

FULL

## Diagnóstico

Não foi identificado memory leak clássico evidente. Os efeitos de componentes seguem o ciclo de vida do Angular, HostListener é gerenciado pelo framework e as inscrições de Router estão em serviços singleton.

Foram encontrados gargalos de desempenho com potencial real de travar o mobile:

1. `background-attachment: fixed` aplicado no mobile, causando repaints caros durante scroll;
2. handler de `window:scroll` em Comidinhas executado sem limitação por frame;
3. envio de vários ingredientes para Compras grava e serializa todo o estado no localStorage uma vez por ingrediente.

## Escopo

- remover background fixo no mobile;
- limitar processamento do scroll de Comidinhas a no máximo uma vez por frame;
- cancelar frame pendente ao destruir o componente;
- criar inserção em lote de itens no ShoppingStore;
- usar inserção em lote em Receita → Lista e Minha Semana → Lista;
- manter deduplicação e analytics atuais;
- não alterar UX funcional;
- validar build e publicar;
- equalizar main e development.
