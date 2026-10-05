# 036-minha-semana-para-lista-de-compras

## Objetivo

Transformar receitas planejadas em itens de compra com seleção explícita do usuário.

## Contexto Técnico

Receita → lista já possui formatação de ingredientes e deduplicação simples por nome no `ShoppingStore`.

## Escopo

- CTA “Preparar lista de compras” em Minha Semana;
- consolidar ingredientes das receitas planejadas;
- deduplicar por nome normalizado;
- mostrar seleção simples antes do envio;
- todos podem começar selecionados, mas usuário controla exclusões;
- escolher lista existente ou criar nova;
- usar deduplicação já existente ao inserir;
- rastrear `AddWeekToList`.

## Fora de escopo

- soma/conversão sofisticada de medidas;
- inventário doméstico;
- adição automática sem confirmação.

## Critérios de aceite

- [x] CTA só fica útil quando houver receita planejada.
- [x] Ingredientes aparecem para confirmação antes do envio.
- [x] Usuário pode desmarcar itens.
- [x] Ingredientes repetidos não viram duplicatas desnecessárias.
- [x] Pode escolher lista existente ou criar nova.
- [x] Nenhum ingrediente é enviado sem ação explícita.
- [x] `AddWeekToList` registra quantidades agregadas, sem nomes digitados.
- [x] Build Angular validado pelo CI.

## Tasks

### Tasks - Front-end

- [x] Consolidar ingredientes das receitas da semana.
  > ✅ 2026-10-05 — Ingredientes das receitas planejadas são consolidados por nome normalizado, sem cálculo sofisticado de medidas.
- [x] Criar seleção de ingredientes no fluxo de preparação da lista.
  > 🧪 2026-10-05 — CTA abre seleção explícita com checkboxes inicialmente marcados; usuário pode desmarcar antes de continuar. Aguardando CI.
- [x] Reutilizar escolha/criação de lista e deduplicação existente.
  > 🧪 2026-10-05 — Fluxo escolhe lista existente ou cria nova e usa `ShoppingStore.addItemIfMissing` na gravação.
- [x] Registrar `AddWeekToList`.
  > ✅ 2026-10-05 — Tracking envia apenas contagens agregadas de receitas, seleção, itens adicionados e duplicados.

### Tasks - Validação

- [x] Revisar deduplicação, seleção e controle do usuário.
  > ✅ 2026-10-05 — Revisão estática confirma que nada é enviado antes do CTA de confirmação e que seleção vazia é bloqueada.
- [x] Validar build Angular no CI.
  > 🧪 2026-10-05 — Aguardando Pull Request.

## Resultado Esperado

O fluxo escolher receitas → organizar semana → gerar lista → ir ao mercado funciona sem retrabalho.


## Encerramento

> ✅ 2026-10-05 — Spec revisada, validada e encerrada.

- workflow `37329520566`: build e shells estáticos concluídos com sucesso;
- PR #70 integrado em `development` no commit `51319dae34aae34c6a176f7c88febf7449d40073`;
- seleção de ingredientes permanece explícita antes do envio;
- deduplicação reutiliza o fluxo existente de Compras.
