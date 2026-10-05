# 042-padronizar-modulos-e-remover-achadinhos

## Objetivo

Reorganizar as features Angular conforme a estrutura definida em `.spec/memory/estrutura.md` e remover completamente Achadinhos do app.

## Critérios de aceite

- [x] Nenhum arquivo funcional fica solto na raiz de `src/app/modules/<feature>/`.
- [x] Home usa `components/`.
- [x] Onboarding usa `components/`.
- [x] Comidinhas usa `components/`, `service/` e `interface/`.
- [x] Compras usa `components/`, `service/` e `interface/`.
- [~] Imports e lazy routes apontam para a nova estrutura.
- [x] Achadinhos não aparece em rotas ou navegação.
- [x] Não existe `src/app/modules/findings/`.
- [x] Não existe `public/content/findings/`.
- [x] Não existe `public/images/findings/`.
- [x] Home, Comidinhas e Compras não importam nem renderizam spotlight de Achadinhos.
- [x] `ClickAchadinho` é removido do analytics.
- [x] Continuidade não conhece `achadinhos`.
- [x] Memória viva não define Achadinhos como feature.
- [x] Specs arquivadas 024, 025 e 037 são removidas.
- [~] Workflow volta a ter `scripts/generate-pages.mjs` válido e sem Achadinhos.
- [x] Regras compartilhadas documentam a estrutura obrigatória dos módulos.
- [x] Conteúdo/story e referências visuais do push do usuário são preservados.
- [~] Build Angular validado pelo CI.

## Fora de escopo

- redesenhar Home/Comidinhas/Compras;
- criar nova monetização;
- alterar conteúdo das receitas;
- migrar core para outra arquitetura;
- criar pastas vazias só para cumprir desenho teórico.


## Evidências de implementação

- árvore de `src/app/modules/` revisada: nenhuma feature possui arquivo funcional solto na raiz;
- `findings` não existe mais na árvore do repositório;
- rotas, menus, Home, Comidinhas, Compras, continuidade e analytics foram limpos;
- arquivos de conteúdo/story e referências visuais do push original permanecem no branch;
- `scripts/generate-pages.mjs` foi restaurado porque o workflow ainda o executa, agora apenas com Comidinhas e Compras;
- `.agents/AGENTS.md`, estrutura, nomenclatura e diretrizes de frontend registram a organização obrigatória;
- aguardando CI para validar imports, lazy routes e geração dos shells.
