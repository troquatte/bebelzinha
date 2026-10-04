# 006-padronizacao-tipografica-global

## Objetivo

Criar uma base tipográfica consistente para a aplicação Bebel.

## Escopo

- definir peso global bold para `h1` a `h5`;
- definir `0.875rem` e `110%` como padrão global de parágrafos;
- remover sobrescritas locais atuais de tamanho/altura de linha dos parágrafos da Home;
- registrar a regra nas diretrizes permanentes de frontend.

## Fora de escopo

- troca de família tipográfica;
- mudanças de conteúdo;
- novas dependências;
- testes unitários.

## Critérios de aceite

- [x] `h1` a `h5` possuem `font-weight: 700` como base global.
- [x] `p` possui `font-size: 0.875rem` e `line-height: 110%` como base global.
- [x] A Home não sobrescreve mais tamanho/altura de linha dos parágrafos existentes.
- [x] A regra está registrada nas diretrizes de frontend.
- [~] Build local pendente por haver alteração de código/estilo da aplicação.

## Validação

Revisão estática concluída.

Executar localmente:

`npm run build`

Validação visual permanece recomendada e não bloqueante.
