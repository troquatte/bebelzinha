# 038-validar-eventos-retencao

## Objetivo

Garantir que os eventos do épico de retenção possam ser usados com confiança em GA4 e Meta.

## Eventos revisados

- HomeAction
- RepeatList
- PlanMeal
- AddWeekToList
- ClickAchadinho
- ReturnVisit

## Critérios de aceite

- [x] Eventos de ativação/recorrência/monetização continuam usando o AnalyticsService compartilhado.
- [x] Nenhum evento envia texto livre digitado pelo usuário.
- [x] ReturnVisit passa a usar a abertura anterior real como referência.
- [x] GA4 e Meta preservam a mesma nomenclatura de eventos de negócio.
- [x] Build Angular validado pelo CI.
- [x] Entrega integrada em main.
- [x] main e development equalizadas.

## Regra de interpretação

- ativação: HomeAction, CreateList, AddItem, SaveRecipe, PlanMeal;
- continuidade/recorrência: OpenShoppingList, RepeatList, AddWeekToList, ReturnVisit;
- monetização/intenção comercial: ClickAchadinho.

## Observação externa

O código e o deploy podem ser validados pelo repositório. A leitura de eventos recentes no Meta exige uma conta Ads Manager acessível ao conector; quando não houver acesso, isso deve ser tratado como limitação de observabilidade externa, não como falha do Pixel.


## Validação

Workflow `37339042444`: build e shells estáticos concluídos com sucesso.


## Encerramento

> ✅ 2026-10-05 — Spec revisada, validada e encerrada.

### Evidências finais

- PR #75 integrado em `development`;
- PR #76 integrado em `main`;
- workflow de produção `37339402204`: build e deploy concluídos com sucesso;
- `main` e `development` equalizadas no commit `868a2abff507eb7a41fd9483fb7b2f9541acdbd0` antes do fechamento documental;
- leitura recente de eventos no Meta não pôde ser feita via conector porque nenhuma conta Ads Manager estava acessível nesta sessão.

### Resultado

- `ReturnVisit` mede intervalo desde a abertura imediatamente anterior;
- taxonomia de eventos de ativação, recorrência e monetização documentada;
- GA4 e Meta continuam compartilhando a mesma nomenclatura de eventos de negócio.
