# 029-corrigir-deploy-dominio-customizado

## Objetivo

Corrigir os caminhos de assets e metadados para o domínio `https://bebelzinha.com.br/`.

## Critérios de aceite

- [x] Workflow usa `--base-href /`.
- [x] Gerador de páginas usa `https://bebelzinha.com.br/`.
- [x] `src/index.html` usa o domínio customizado em canonical/OG/Twitter.
- [ ] Build Angular passa no CI.
- [ ] Deploy em `main` conclui com sucesso.
- [ ] `main` e `development` terminam no mesmo SHA.

## Evidências

- causa identificada: build anterior usava `/bebelzinha/`, gerando URLs de assets incompatíveis com o domínio customizado na raiz.
