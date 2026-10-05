# Tarefa — Corrigir deploy no domínio customizado

## Modo

FULL

## Problema

O app é publicado em `https://bebelzinha.com.br/`, mas o workflow ainda buildava com `--base-href /bebelzinha/`, fazendo JS, CSS e favicon serem buscados em caminhos inexistentes como `/bebelzinha/main-*.js`.

Também existiam URLs SEO antigas apontando para `https://troquatte.github.io/bebelzinha/`.

## Requisitos

- buildar com `base-href /`;
- manter assets relativos à raiz do domínio;
- atualizar URLs canônicas/OG/Twitter para `https://bebelzinha.com.br/`;
- atualizar o gerador de shells estáticos para o domínio customizado;
- validar build no CI;
- publicar em `main`;
- equalizar `development` com o mesmo commit final.
