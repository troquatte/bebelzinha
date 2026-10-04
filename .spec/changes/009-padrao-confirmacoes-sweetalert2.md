# 009-padrao-confirmacoes-sweetalert2

## Objetivo

Definir SweetAlert2 como padrão transversal de confirmação de ações no produto Bebel.

## Escopo

- registrar a regra nas diretrizes permanentes de frontend;
- registrar SweetAlert2 como dependência aprovada no contexto técnico;
- deixar explícito o uso para salvar, editar, excluir e demais ações sensíveis;
- proibir `window.confirm`, `window.alert` e modais paralelos de confirmação quando SweetAlert2 resolver o caso.

## Fora de escopo

- instalar SweetAlert2 agora;
- alterar código de runtime;
- implementar a feature Compras;
- criar componentes de confirmação.

## Critérios de aceite

- [x] SweetAlert2 está documentado como padrão oficial de confirmação.
- [x] Exclusões e ações destrutivas exigem confirmação.
- [x] Salvar e editar também entram no padrão quando houver confirmação explícita.
- [x] Confirmações nativas do navegador ficam proibidas.
- [x] A instalação da dependência fica adiada até o primeiro uso real.
- [x] Build não é necessário por ser mudança somente documental.

## Validação

Revisão documental concluída.
