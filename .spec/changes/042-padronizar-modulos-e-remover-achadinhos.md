# 042-padronizar-modulos-e-remover-achadinhos

## Objetivo

Reorganizar as features Angular conforme a estrutura definida em `.spec/memory/estrutura.md` e remover completamente Achadinhos do app.

## Critérios de aceite

- [ ] Nenhum arquivo funcional fica solto na raiz de `src/app/modules/<feature>/`.
- [ ] Home usa `components/`.
- [ ] Onboarding usa `components/`.
- [ ] Comidinhas usa `components/`, `service/` e `interface/`.
- [ ] Compras usa `components/`, `service/` e `interface/`.
- [ ] Imports e lazy routes apontam para a nova estrutura.
- [ ] Achadinhos não aparece em rotas ou navegação.
- [ ] Não existe `src/app/modules/findings/`.
- [ ] Não existe `public/content/findings/`.
- [ ] Não existe `public/images/findings/`.
- [ ] Home, Comidinhas e Compras não importam nem renderizam spotlight de Achadinhos.
- [ ] `ClickAchadinho` é removido do analytics.
- [ ] Continuidade não conhece `achadinhos`.
- [ ] Memória viva não define Achadinhos como feature.
- [ ] Specs arquivadas 024, 025 e 037 são removidas.
- [ ] Workflow volta a ter `scripts/generate-pages.mjs` válido e sem Achadinhos.
- [ ] Regras compartilhadas documentam a estrutura obrigatória dos módulos.
- [ ] Conteúdo/story e referências visuais do push do usuário são preservados.
- [ ] Build Angular validado pelo CI.

## Fora de escopo

- redesenhar Home/Comidinhas/Compras;
- criar nova monetização;
- alterar conteúdo das receitas;
- migrar core para outra arquitetura;
- criar pastas vazias só para cumprir desenho teórico.
