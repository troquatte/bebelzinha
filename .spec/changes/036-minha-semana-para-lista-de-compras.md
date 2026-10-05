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

- [~] CTA só fica útil quando houver receita planejada.
- [~] Ingredientes aparecem para confirmação antes do envio.
- [~] Usuário pode desmarcar itens.
- [x] Ingredientes repetidos não viram duplicatas desnecessárias.
- [~] Pode escolher lista existente ou criar nova.
- [x] Nenhum ingrediente é enviado sem ação explícita.
- [x] `AddWeekToList` registra quantidades agregadas, sem nomes digitados.
- [ ] Build Angular validado pelo CI.

## Tasks

### Tasks - Front-end

- [x] Consolidar ingredientes das receitas da semana.
  > ✅ 2026-10-05 — Ingredientes das receitas planejadas são consolidados por nome normalizado, sem cálculo sofisticado de medidas.
- [~] Criar seleção de ingredientes no fluxo de preparação da lista.
  > 🧪 2026-10-05 — CTA abre seleção explícita com checkboxes inicialmente marcados; usuário pode desmarcar antes de continuar. Aguardando CI.
- [~] Reutilizar escolha/criação de lista e deduplicação existente.
  > 🧪 2026-10-05 — Fluxo escolhe lista existente ou cria nova e usa `ShoppingStore.addItemIfMissing` na gravação.
- [x] Registrar `AddWeekToList`.
  > ✅ 2026-10-05 — Tracking envia apenas contagens agregadas de receitas, seleção, itens adicionados e duplicados.

### Tasks - Validação

- [x] Revisar deduplicação, seleção e controle do usuário.
  > ✅ 2026-10-05 — Revisão estática confirma que nada é enviado antes do CTA de confirmação e que seleção vazia é bloqueada.
- [~] Validar build Angular no CI.
  > 🧪 2026-10-05 — Aguardando Pull Request.

## Resultado Esperado

O fluxo escolher receitas → organizar semana → gerar lista → ir ao mercado funciona sem retrabalho.
