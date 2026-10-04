# 016-cores-slide-toggle

## Objetivo

Corrigir as cores visuais do Material slide toggle para manter o track legível e alinhar o handle selecionado à cor primária da Bebel.

## Escopo

- definir o background de `.mdc-switch__track::after` com a variável padrão de track não selecionado;
- aplicar o mesmo background ao track no estado de foco sem clique ativo;
- trocar o handle selecionado de `var(--green)` para `var(--primary)`;
- preservar bordas, ícones e estado não selecionado atuais.

## Fora de escopo

- alterar comportamento do toggle;
- trocar a cor do handle não selecionado;
- alterar componentes Angular;
- mudar outros estilos do Material.

## Critérios de aceite

- [~] O track recebe `var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant))`.
- [~] O mesmo background é preservado no estado `:focus:not(:active)`.
- [~] O handle selecionado usa `var(--primary) !important`.
- [~] O handle não selecionado continua usando a configuração atual.
- [~] Build local pendente por alteração de SCSS.

## Validação

Revisão estática da folha de estilos concluída.

Executar:

`npm run build`

Depois validar visualmente o toggle nos estados selecionado, não selecionado e foco.
