# 029-corrigir-deploy-dominio-customizado

## Objetivo

Corrigir os caminhos de assets e metadados para o domínio `https://bebelzinha.com.br/`.

## Critérios de aceite

- [x] Workflow usa `--base-href /`.
- [x] Gerador de páginas usa `https://bebelzinha.com.br/`.
- [x] `src/index.html` usa o domínio customizado em canonical/OG/Twitter.
- [x] Build Angular passa no CI.
- [x] Deploy em `main` conclui com sucesso.
- [x] `main` e `development` terminam no mesmo SHA.

## Evidências

- causa identificada: build anterior usava `/bebelzinha/`, gerando URLs de assets incompatíveis com o domínio customizado na raiz.


## Encerramento

> ✅ 2026-10-05 11:06 — Spec encerrada após validação do domínio customizado.

- PR de correção: #56;
- workflow de produção: `37319229461`, build e deploy concluídos com sucesso;
- `main` e `development` foram equalizadas após a entrega.
