# 030-meta-pixel-eventos-negocio-remarketing

## Objetivo

Adicionar Meta Pixel e estruturar tracking unificado de eventos de negócio para GA4 e Meta, preparando remarketing quente, ativação, retenção e monetização futura.

## Contexto de produto

Remarketing quente deve trazer de volta pessoas que já conhecem a Bebel por um motivo concreto de uso, como montar uma lista, escolher uma receita ou continuar uma compra. A otimização deve evoluir de visita para ações úteis e mensuráveis dentro do app.

## Arquitetura

`AnalyticsService` é a fonte única para os eventos de negócio.

- GA4: análise de funil e comportamento;
- Meta Pixel: mídia, remarketing e otimização;
- mesma nomenclatura de evento em ambos;
- parâmetros limitados a metadados não sensíveis.

## Escopo

- instalar Meta Pixel `283243945816993`;
- controlar `PageView` pela navegação SPA;
- criar API pública `AnalyticsService.track(...)`;
- disparar `AppOpen`;
- disparar `ReturnVisit` após 30 minutos entre sessões;
- disparar `CreateList`;
- disparar `AddItem`;
- disparar `CompleteItem`;
- disparar `OpenShoppingList`;
- disparar `SaveRecipe`;
- disparar `AddRecipeToList`;
- disparar `ClickAchadinho`;
- atualizar documentação de produto e contexto técnico.

## Fora de escopo

- Conversions API / CAPI;
- eventos de compra;
- públicos e campanhas dentro do Ads Manager;
- Consent Mode;
- identificação de usuário;
- envio de texto digitado pelo usuário;
- backend.

## Critérios de aceite

- [x] Meta Pixel inicializa com ID `283243945816993`.
- [x] `PageView` da Meta acompanha rotas da SPA sem depender de reload.
- [x] GA4 e Meta usam a mesma API de eventos de negócio.
- [x] `AppOpen` está implementado.
- [x] `ReturnVisit` está implementado com janela de 30 minutos.
- [x] `CreateList` está implementado nos fluxos de compras e receita.
- [x] `AddItem` está implementado.
- [x] `CompleteItem` está implementado.
- [x] `OpenShoppingList` está implementado.
- [x] `SaveRecipe` dispara somente ao salvar, não ao remover dos salvos.
- [x] `AddRecipeToList` dispara quando pelo menos um ingrediente é adicionado.
- [x] `ClickAchadinho` dispara ao abrir link externo do produto.
- [x] Nenhum nome de lista/item digitado pelo usuário é enviado.
- [x] Nenhuma dependência nova foi adicionada.
- [ ] Build Angular validado pelo CI.
- [ ] Entrega integrada em `main`.
- [ ] `main` e `development` equalizadas.

## Validação pendente

Aguardando CI do Pull Request.
