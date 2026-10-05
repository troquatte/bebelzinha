# Tarefa — Meta Pixel e eventos de negócio para remarketing

## Modo

FULL

## Necessidade

Preparar remarketing quente da Bebel com Meta Pixel e eventos de negócio compartilhados com o GA4.

## Regra central

GA4 mede o funil do produto. Meta Pixel alimenta otimização e remarketing de mídia. Os dois devem receber a mesma definição de eventos de negócio para evitar métricas divergentes de ativação, retenção e monetização.

## Eventos

- `AppOpen`;
- `CreateList`;
- `AddItem`;
- `CompleteItem`;
- `SaveRecipe`;
- `AddRecipeToList`;
- `ClickAchadinho`;
- `OpenShoppingList`;
- `ReturnVisit`.

## Regras

- Pixel ID: `283243945816993`;
- SPA: `PageView` deve acompanhar mudanças de rota;
- eventos customizados do Meta usam `trackCustom`;
- não enviar nomes digitados pelo usuário, conteúdo de itens ou outros dados potencialmente sensíveis;
- `ReturnVisit` representa nova sessão após pelo menos 30 minutos;
- não implementar CAPI nesta entrega;
- não adicionar dependências.
