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
- [ ] Build Angular validado pelo CI.
- [ ] Entrega integrada em main.
- [ ] main e development equalizadas.

## Regra de interpretação

- ativação: HomeAction, CreateList, AddItem, SaveRecipe, PlanMeal;
- continuidade/recorrência: OpenShoppingList, RepeatList, AddWeekToList, ReturnVisit;
- monetização/intenção comercial: ClickAchadinho.

## Observação externa

O código e o deploy podem ser validados pelo repositório. A leitura de eventos recentes no Meta exige uma conta Ads Manager acessível ao conector; quando não houver acesso, isso deve ser tratado como limitação de observabilidade externa, não como falha do Pixel.


## Validação

Aguardando workflow do Pull Request.
