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

- [ ] Cada dia pode estar vazio ou apontar para uma receita.
- [ ] Uma receita pode ser movida para outro dia sem duplicação involuntária.
- [ ] Usuário consegue trocar e remover.
- [ ] Estado persiste localmente.
- [ ] Estado legado é migrado sem descartar IDs existentes.
- [ ] Receita e salvas permitem escolher um dia.
- [ ] `PlanMeal` registra inclusão/movimento sem dados sensíveis.
- [ ] Build Angular validado pelo CI.

## Tasks

### Tasks - Negócio

- [ ] Evoluir modelo e migração do `MealsStore` para plano semanal por dia.

### Tasks - Front-end

- [ ] Criar visual simples de sete dias em Minha Semana.
- [ ] Permitir escolher/trocar/remover receita por dia.
- [ ] Atualizar CTA de receita e cards para escolher o dia.
- [ ] Registrar `PlanMeal`.

### Tasks - Validação

- [ ] Revisar migração, persistência, mobile e fluxos de edição.
- [ ] Validar build Angular no CI.

## Resultado Esperado

Minha Semana responde “o que pretendo cozinhar nos próximos dias?” sem virar agenda complexa.
