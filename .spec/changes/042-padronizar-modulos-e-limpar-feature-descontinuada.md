# 042-padronizar-modulos-e-limpar-feature-descontinuada

## Objetivo

Reorganizar as features Angular conforme a estrutura definida em `.spec/memory/estrutura.md` e remover completamente uma feature de monetização descontinuada.

## Critérios de aceite

- [x] Nenhum arquivo funcional fica solto na raiz de `src/app/modules/<feature>/`.
- [x] Home usa `components/`.
- [x] Onboarding usa `components/`.
- [x] Comidinhas usa `components/`, `service/` e `interface/`.
- [x] Compras usa `components/`, `service/` e `interface/`.
- [~] Imports e lazy routes apontam para a nova estrutura.
- [x] A feature descontinuada não aparece em rotas ou navegação.
- [x] Não existe módulo funcional, conteúdo editorial ou imagem pública da feature removida.
- [x] Home, Comidinhas e Compras não importam nem renderizam recomendações da feature removida.
- [x] Analytics e continuidade não conhecem mais a feature removida.
- [x] Memória viva não define a feature removida como parte atual do produto.
- [x] Specs históricas exclusivas da feature removida foram excluídas.
- [~] `scripts/generate-pages.mjs` gera somente rotas públicas ainda existentes.
- [x] Regras compartilhadas documentam a estrutura obrigatória dos módulos.
- [x] Conteúdo/story e referências visuais do push do usuário foram preservados.
- [~] Build Angular validado pelo CI.

## Fora de escopo

- redesenhar Home, Comidinhas ou Compras;
- criar nova monetização;
- alterar conteúdo das receitas;
- migrar `core/` para outra arquitetura;
- criar pastas vazias só para cumprir desenho teórico.

## Evidências de implementação

- árvore de `src/app/modules/` revisada: nenhuma feature possui arquivo funcional solto na raiz;
- a feature descontinuada não existe mais na árvore funcional nem em assets editoriais;
- rotas, menus, Home, Comidinhas, Compras, continuidade e analytics foram limpos;
- arquivos de conteúdo/story e referências visuais do push original permanecem no branch;
- `scripts/generate-pages.mjs` foi restaurado porque o workflow ainda o executa, agora apenas com Comidinhas e Compras;
- `.agents/AGENTS.md`, estrutura, nomenclatura e diretrizes de frontend registram a organização obrigatória;
- aguardando CI para validar imports, lazy routes e geração dos shells.
