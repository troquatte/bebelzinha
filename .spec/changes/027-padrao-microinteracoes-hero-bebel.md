# 027-padrao-microinteracoes-hero-bebel

## Objetivo

Consolidar as microinterações dos heroes com a personagem Bebel em um padrão CSS reutilizável, usando a Home como referência de movimento e aplicando-o às principais páginas do app.

## Contexto

Home e Lista de compras já possuem animações muito semelhantes implementadas separadamente. Comidinhas e Achadinhos possuem comportamentos próprios. Isso cria duplicação e risco de inconsistência visual.

## Escopo

- criar classes globais reutilizáveis para:
  - entrada do hero;
  - entrada do retrato da Bebel;
  - flutuação do balão;
  - brilho dos sparks;
  - entrada do sticker quando existir;
- aplicar as classes em Home, Lista de compras, Comidinhas e Achadinhos;
- remover apenas as animações duplicadas de hero que forem substituídas pelo padrão;
- preservar microinterações específicas de cards e demais componentes;
- manter `prefers-reduced-motion`.

## Fora de escopo

- alterar conteúdo dos heroes;
- redesenhar layout;
- criar componente Angular novo;
- alterar microinterações de áreas sem hero da Bebel;
- adicionar dependências.

## Critérios de aceite

- [~] Home usa o padrão compartilhado sem perder o comportamento atual.
- [~] Lista de compras usa o mesmo padrão de hero da Home.
- [~] Comidinhas usa o mesmo padrão de entrada, retrato, balão e sparks.
- [~] Achadinhos usa o mesmo padrão aplicável ao seu hero.
- [x] As animações compartilhadas ficam definidas em uma fonte global reutilizável.
- [x] Duplicação de keyframes do hero é removida dos componentes onde foi substituída.
- [x] `prefers-reduced-motion: reduce` desativa as microinterações compartilhadas.
- [x] Nenhuma dependência nova é adicionada.
- [ ] Build Angular validado pelo CI.

## Tasks

- [x] Criar padrão global de microinterações para hero da Bebel.
  > ✅ 2026-10-05 10:22 — Padrão criado em `src/styles.scss` com entrada do hero, retrato, sticker, balão, sparks e reduced motion.
- [~] Aplicar o padrão na Home.
  > 🧪 2026-10-05 10:22 — Classes compartilhadas aplicadas ao hero da Home; comportamento original foi convertido para a fonte global. Aguardando build do CI.
- [~] Aplicar o padrão na Lista de compras.
  > 🧪 2026-10-05 10:22 — Classes compartilhadas aplicadas ao hero da listagem de compras. Aguardando build do CI.
- [~] Aplicar o padrão em Comidinhas.
  > 🧪 2026-10-05 10:22 — Hero de Comidinhas passou a usar entrada, retrato, balão e sparks compartilhados. Aguardando build do CI.
- [~] Aplicar o padrão em Achadinhos.
  > 🧪 2026-10-05 10:22 — Hero de Achadinhos passou a usar o padrão compartilhado; microinterações específicas dos cards foram preservadas. Aguardando build do CI.
- [x] Remover animações duplicadas de hero substituídas pelo padrão.
  > ✅ 2026-10-05 10:22 — Keyframes locais duplicados removidos de Home, Lista de compras e Achadinhos; animações específicas das páginas foram mantidas.
- [x] Revisar comportamento e reduced motion.
  > ✅ 2026-10-05 10:22 — Revisão estática concluída; padrão global documentado em `.spec/shared/diretrizes-de-frontend.md`, sem dependência nova e com reduced motion centralizado.
- [~] Validar build Angular no CI.
  > 🧪 2026-10-05 10:22 — Aguardando workflow do Pull Request.
