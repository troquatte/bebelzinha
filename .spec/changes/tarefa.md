# Tarefa — Ajustar cores do slide toggle

## Modo

FULL

## Necessidade

1. O track do Material slide toggle deve usar o background padrão não selecionado:
   `var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant))`
   tanto em `.mdc-switch__track::after` quanto no estado de foco `.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after`.

2. O handle do toggle selecionado deve usar `var(--primary) !important` em vez de `var(--green) !important`.

3. Preservar o restante das customizações existentes do componente.
