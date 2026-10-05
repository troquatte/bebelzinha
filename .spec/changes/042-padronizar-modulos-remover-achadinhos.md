# 042-padronizar-modulos-remover-achadinhos

## Objetivo

Reorganizar as features Angular conforme o padrão estrutural vigente e remover completamente a feature Achadinhos do estado atual do produto.

## Estrutura alvo

- `home/components/`
- `meals/components/`
- `meals/service/`
- `meals/interface/`
- `shopping/components/`
- `shopping/service/`
- `shopping/interface/`
- `onboarding/components/`

Subpastas sem conteúdo real não devem ser criadas.

## Escopo de remoção de Achadinhos

- arquivos Angular do domínio;
- conteúdo JSON e imagens;
- rotas e navegação;
- spotlights;
- ações da Home;
- continuidade;
- evento de analytics;
- docs/memória/specs dedicadas;
- referências residuais em arquivos ativos.

## Critérios de aceite

- [ ] Nenhum arquivo funcional de Achadinhos permanece.
- [ ] Nenhuma rota `/achadinhos` permanece.
- [ ] Nenhum item de menu Achadinhos permanece.
- [ ] Nenhum spotlight de Achadinhos permanece em Home, Comidinhas ou Compras.
- [ ] `ClickAchadinho` não existe mais na taxonomia ativa.
- [ ] Continuidade não conhece mais Achadinhos.
- [ ] Conteúdo/imagens de findings foram removidos.
- [ ] Home está em `modules/home/components`.
- [ ] Meals está organizado em `components`, `service` e `interface`.
- [ ] Shopping está organizado em `components`, `service` e `interface`.
- [ ] Onboarding está em `modules/onboarding/components`.
- [ ] Lazy routes e imports foram atualizados.
- [ ] `scripts/generate-pages.mjs` existe novamente e não gera rotas de Achadinhos.
- [ ] Documentação estrutural e regras compartilhadas descrevem o padrão obrigatório.
- [ ] Build Angular validado pelo CI.
- [ ] Shells estáticos gerados com sucesso.
- [ ] Entrega integrada em main.
- [ ] main e development equalizadas.
