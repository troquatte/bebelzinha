# Tarefa — Corrigir layout mobile e confirmar repetição de lista

## Modo

FULL

## Problemas

1. O cabeçalho da lista de compras fica visualmente desequilibrado no mobile quando aparecem as ações “Usar essa lista de novo”, “Editar lista” e “Adicionar item”.
2. O card de retorno da Home fica espremido no mobile, com título/ícone/CTA competindo pelo mesmo espaço.
3. “Usar essa lista de novo” duplica imediatamente, sem confirmação explícita.

## Escopo

- organizar ações do cabeçalho da lista em layout mobile previsível;
- manter desktop equilibrado;
- reorganizar card de retorno da Home para mobile;
- reduzir destaque exagerado do ícone no card de retorno;
- evitar emoji órfão/quebra visual no título do retorno;
- usar SweetAlert2 antes de repetir lista;
- não alterar regra de negócio da duplicação;
- validar build e publicar;
- equalizar main e development.
