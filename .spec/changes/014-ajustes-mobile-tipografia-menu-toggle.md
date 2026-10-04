# 014-ajustes-mobile-tipografia-menu-toggle

## Objetivo

Corrigir três detalhes visuais observados no mobile sem alterar o comportamento funcional da Lista de compras.

## Escopo

- aplicar 22px via `fn.rem-calc(22)` para `h1` e `h2` até 800px;
- quebrar o rótulo mobile “Lista de compras” em duas linhas;
- centralizar o rótulo do item;
- remover o fundo branco forçado do track do Material slide toggle;
- atualizar a diretriz tipográfica permanente.

## Fora de escopo

- alterar tamanhos desktop;
- alterar cores do handle verde/rosa;
- alterar comportamento do toggle;
- mudar navegação ou rotas.

## Critérios de aceite

- [x] h1/h2 usam 22px no mobile.
- [x] Lista de compras aparece em duas linhas na bottom navigation.
- [x] O texto da bottom navigation fica centralizado.
- [x] O track do slide toggle não recebe mais `background-color: var(--white) !important`.
- [x] O restante das customizações de toggle permanece.
- [~] Build local pendente por alteração em código/estilo.

## Validação

Revisão estática concluída.

Executar:

`npm run build`

Depois validar visualmente a Lista de compras no mobile.
