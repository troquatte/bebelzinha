# 003-ajustes-copy-cards-home

## Objetivo

Refinar a Home da Bebel removendo textos que ficaram desnecessários e ajustando a hierarquia visual dos cards da seção “Os cantinhos que vêm por aí”.

## Escopo

- remover dois textos do hero;
- alinhar título e tag “Em breve” horizontalmente nos cards;
- deixar títulos dos cards em negrito;
- padronizar o texto descritivo dos cards em 14px e line-height de 110%.

## Fora de escopo

- novas funcionalidades;
- novas rotas;
- mudanças de navegação;
- novas dependências;
- testes unitários.

## Critérios de aceite

- [x] Os dois textos solicitados não aparecem mais na Home.
- [x] Título e tag “Em breve” aparecem na mesma linha com layout flex.
- [x] Os títulos dos cards usam peso bold.
- [x] Os textos descritivos usam `font-size: 14px` e `line-height: 110%`.
- [x] Nenhuma funcionalidade nova foi adicionada.
- [~] Build local pendente por haver alteração em código da aplicação.

## Validação

Revisão estática concluída. Executar localmente:

`npm run build`

Validação visual permanece recomendada e não bloqueante, desde que o build passe e não haja quebra crítica.
