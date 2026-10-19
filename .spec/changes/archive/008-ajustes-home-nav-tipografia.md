# 008-ajustes-home-nav-tipografia

## Objetivo

Simplificar a Home removendo a piscada e o item Casa da navegação, além de reforçar a hierarquia tipográfica dos títulos.

## Escopo

- remover animação de piscada da Bebel;
- remover “Casa” da sidebar desktop;
- remover “Casa” da bottom navigation mobile;
- padronizar `h1` a `h5` em `font-weight: 950`;
- alinhar estilos locais atuais e diretriz permanente de frontend.

## Critérios de aceite

- [x] A Bebel não possui mais piscada periódica.
- [x] “Casa” não aparece na navegação desktop.
- [x] “Casa” não aparece na navegação mobile.
- [x] Títulos `h1` a `h5` usam peso global 950.
- [x] Sobrescritas locais atuais de títulos relevantes foram alinhadas para 950.
- [x] A diretriz de frontend foi atualizada.
- [~] Build local pendente por alteração em código/estilo.

## Validação

Revisão estática concluída.

Executar localmente:

`npm run build`
