# 035-minha-semana-por-dia

## Objetivo

Evoluir Minha Semana de uma coleção de receitas para um planejamento simples por dia da semana.

## Contexto Técnico

`MealsStore` já persiste receitas salvas e um legado `weeklyRecipeIds`. A mudança deve migrar esse estado local sem perder receitas anteriormente marcadas.

## Escopo

- sete dias simples, segunda a domingo;
- no máximo uma receita por dia na primeira versão;
- adicionar receita a um dia;
- trocar receita de dia;
- mover receita para outro dia;
- remover receita;
- dias podem ficar vazios;
- adicionar a partir da receita, salvas e da própria área Minha Semana;
- migrar `weeklyRecipeIds` legado para os primeiros dias disponíveis;
- rastrear `PlanMeal`.

## Fora de escopo

- horários;
- calorias;
- nutrição;
- agenda/calendário mensal;
- mais de uma refeição por dia.

## Critérios de aceite

- [~] Cada dia pode estar vazio ou apontar para uma receita.
- [~] Uma receita pode ser movida para outro dia sem duplicação involuntária.
- [~] Usuário consegue trocar e remover.
- [x] Estado persiste localmente.
- [x] Estado legado é migrado sem descartar IDs existentes.
- [~] Receita e salvas permitem escolher um dia.
- [x] `PlanMeal` registra inclusão/movimento sem dados sensíveis.
- [ ] Build Angular validado pelo CI.

## Tasks

### Tasks - Negócio

- [x] Evoluir modelo e migração do `MealsStore` para plano semanal por dia.
  > ✅ 2026-10-05 — `MealsStore` usa plano segunda–domingo, mantém `weeklyRecipeIds` compatível para leituras existentes e migra o array legado para os primeiros dias disponíveis.

### Tasks - Front-end

- [~] Criar visual simples de sete dias em Minha Semana.
  > 🧪 2026-10-05 — Novo `WeekPlannerComponent` mostra sete dias em composição mobile first, sem horários ou calendário complexo.
- [~] Permitir escolher/trocar/remover receita por dia.
  > 🧪 2026-10-05 — Serviço de planejamento permite adicionar, mover, trocar com confirmação e remover.
- [~] Atualizar CTA de receita e cards para escolher o dia.
  > 🧪 2026-10-05 — Detalhe, salvas e catálogo usam o mesmo fluxo de seleção de dia.
- [x] Registrar `PlanMeal`.
  > ✅ 2026-10-05 — Evento registra ação, dia e ID público da receita, sem dados digitados pelo usuário.

### Tasks - Validação

- [x] Revisar migração, persistência, mobile e fluxos de edição.
  > ✅ 2026-10-05 — Revisão estática confirmou migração local, unicidade de receita entre dias, confirmação ao substituir e persistência no mesmo storage.
- [~] Validar build Angular no CI.
  > 🧪 2026-10-05 — Aguardando Pull Request.

## Resultado Esperado

Minha Semana responde “o que pretendo cozinhar nos próximos dias?” sem virar agenda complexa.
