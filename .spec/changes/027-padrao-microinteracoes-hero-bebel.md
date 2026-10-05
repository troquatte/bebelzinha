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

- [ ] Home usa o padrão compartilhado sem perder o comportamento atual.
- [ ] Lista de compras usa o mesmo padrão de hero da Home.
- [ ] Comidinhas usa o mesmo padrão de entrada, retrato, balão e sparks.
- [ ] Achadinhos usa o mesmo padrão aplicável ao seu hero.
- [ ] As animações compartilhadas ficam definidas em uma fonte global reutilizável.
- [ ] Duplicação de keyframes do hero é removida dos componentes onde foi substituída.
- [ ] `prefers-reduced-motion: reduce` desativa as microinterações compartilhadas.
- [ ] Nenhuma dependência nova é adicionada.
- [ ] Build Angular validado pelo CI.

## Tasks

- [ ] Criar padrão global de microinterações para hero da Bebel.
- [ ] Aplicar o padrão na Home.
- [ ] Aplicar o padrão na Lista de compras.
- [ ] Aplicar o padrão em Comidinhas.
- [ ] Aplicar o padrão em Achadinhos.
- [ ] Remover animações duplicadas de hero substituídas pelo padrão.
- [ ] Revisar comportamento e reduced motion.
- [ ] Validar build Angular no CI.
