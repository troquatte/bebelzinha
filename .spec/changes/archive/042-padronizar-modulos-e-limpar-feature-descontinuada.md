# 042-padronizar-modulos-e-limpar-feature-descontinuada

## Objetivo

Reorganizar as features Angular conforme a estrutura definida em `.spec/memory/estrutura.md` e remover completamente uma feature de monetização descontinuada.

## Critérios de aceite

- [x] Nenhum arquivo funcional fica solto na raiz de `src/app/modules/<feature>/`.
  > ✅ 2026-10-05 17:55 — Inspeção da árvore e do diff do PR #87 confirma este critério; busca em src/, public/, scripts/ e memória viva sem referências à feature descontinuada.
- [x] Home usa `components/`.
  > ✅ 2026-10-05 17:55 — Inspeção da árvore e do diff do PR #87 confirma este critério; busca em src/, public/, scripts/ e memória viva sem referências à feature descontinuada.
- [x] Onboarding usa `components/`.
  > ✅ 2026-10-05 17:55 — Inspeção da árvore e do diff do PR #87 confirma este critério; busca em src/, public/, scripts/ e memória viva sem referências à feature descontinuada.
- [x] Comidinhas usa `components/`, `service/` e `interface/`.
  > ✅ 2026-10-05 17:55 — Inspeção da árvore e do diff do PR #87 confirma este critério; busca em src/, public/, scripts/ e memória viva sem referências à feature descontinuada.
- [x] Compras usa `components/`, `service/` e `interface/`.
  > ✅ 2026-10-05 17:55 — Inspeção da árvore e do diff do PR #87 confirma este critério; busca em src/, public/, scripts/ e memória viva sem referências à feature descontinuada.
- [x] Imports e lazy routes apontam para a nova estrutura.
  > ✅ 2026-10-05 17:55 — CI #116 (run 37371141503), commit be9f37a: Build e Generate static route shells concluídos com sucesso; imports e rotas também revisados estaticamente.
- [x] A feature descontinuada não aparece em rotas ou navegação.
  > ✅ 2026-10-05 17:55 — Inspeção da árvore e do diff do PR #87 confirma este critério; busca em src/, public/, scripts/ e memória viva sem referências à feature descontinuada.
- [x] Não existe módulo funcional, conteúdo editorial ou imagem pública da feature removida.
  > ✅ 2026-10-05 17:55 — Inspeção da árvore e do diff do PR #87 confirma este critério; busca em src/, public/, scripts/ e memória viva sem referências à feature descontinuada.
- [x] Home, Comidinhas e Compras não importam nem renderizam recomendações da feature removida.
  > ✅ 2026-10-05 17:55 — Inspeção da árvore e do diff do PR #87 confirma este critério; busca em src/, public/, scripts/ e memória viva sem referências à feature descontinuada.
- [x] Analytics e continuidade não conhecem mais a feature removida.
  > ✅ 2026-10-05 17:55 — Inspeção da árvore e do diff do PR #87 confirma este critério; busca em src/, public/, scripts/ e memória viva sem referências à feature descontinuada.
- [x] Memória viva não define a feature removida como parte atual do produto.
  > ✅ 2026-10-05 17:55 — Inspeção da árvore e do diff do PR #87 confirma este critério; busca em src/, public/, scripts/ e memória viva sem referências à feature descontinuada.
- [x] Specs históricas exclusivas da feature removida foram excluídas.
  > ✅ 2026-10-05 17:55 — Inspeção da árvore e do diff do PR #87 confirma este critério; busca em src/, public/, scripts/ e memória viva sem referências à feature descontinuada.
- [x] `scripts/generate-pages.mjs` gera somente rotas públicas ainda existentes.
  > ✅ 2026-10-05 17:55 — CI #116 (run 37371141503), commit be9f37a: Build e Generate static route shells concluídos com sucesso; imports e rotas também revisados estaticamente.
- [x] Regras compartilhadas documentam a estrutura obrigatória dos módulos.
  > ✅ 2026-10-05 17:55 — Inspeção da árvore e do diff do PR #87 confirma este critério; busca em src/, public/, scripts/ e memória viva sem referências à feature descontinuada.
- [x] Conteúdo/story e referências visuais do push do usuário foram preservados.
  > ✅ 2026-10-05 17:55 — Inspeção da árvore e do diff do PR #87 confirma este critério; busca em src/, public/, scripts/ e memória viva sem referências à feature descontinuada.
- [x] Build Angular validado pelo CI.
  > ✅ 2026-10-05 17:55 — CI #116 (run 37371141503), commit be9f37a: Build e Generate static route shells concluídos com sucesso; imports e rotas também revisados estaticamente.

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
- CI #116 confirmou build, imports e geração dos shells em 2026-10-05; validação visual manual permanece recomendada, sem bloqueio estrutural identificado.

## Revisão da implementação

- Modo: implementation. Status: APROVADA.
- Escopo, estrutura, imports, rotas, analytics, continuidade e preservação do conteúdo do usuário revisados.
- Sem alterações de dependências ou persistência pessoal; valores legados de continuidade são ignorados pelo conjunto de áreas válidas.
- Build e shells: CI #116 aprovado. Testes unitários não executados, conforme instrução do usuário.
- Verificação visual no navegador recomendada após integração; não realizada nesta retomada.

## Encerramento

> ✅ 2026-10-05 17:57 — Entrega integrada em development pelo PR #87 (15da3ab), revisada e encerrada.

### Validações finais

- CI #116: Build e Generate static route shells aprovados para o código integrado.
- Revisão estática: estrutura, remoção, rotas, imports, conteúdo preservado e continuidade confirmados.
- Testes unitários não executados por instrução do usuário.
- Validação visual manual recomendada, não executada; sem bloqueio estrutural identificado.

### Memória atualizada

- produto.md: removida a capacidade descontinuada e ajustados os fluxos atuais.
- contexto-tecnico.md: removido o evento exclusivo da capacidade descontinuada.
- estrutura.md: organização obrigatória por responsabilidade documentada.
- changelog.md: registrada a entrega 042.

### Observações

- main e publicação não fazem parte desta integração.
- Nenhuma pendência obrigatória conhecida dentro do escopo da spec.
