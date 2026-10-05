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

- [ ] CTA só fica útil quando houver receita planejada.
- [ ] Ingredientes aparecem para confirmação antes do envio.
- [ ] Usuário pode desmarcar itens.
- [ ] Ingredientes repetidos não viram duplicatas desnecessárias.
- [ ] Pode escolher lista existente ou criar nova.
- [ ] Nenhum ingrediente é enviado sem ação explícita.
- [ ] `AddWeekToList` registra quantidades agregadas, sem nomes digitados.
- [ ] Build Angular validado pelo CI.

## Tasks

### Tasks - Front-end

- [ ] Consolidar ingredientes das receitas da semana.
- [ ] Criar seleção de ingredientes no fluxo de preparação da lista.
- [ ] Reutilizar escolha/criação de lista e deduplicação existente.
- [ ] Registrar `AddWeekToList`.

### Tasks - Validação

- [ ] Revisar deduplicação, seleção e controle do usuário.
- [ ] Validar build Angular no CI.

## Resultado Esperado

O fluxo escolher receitas → organizar semana → gerar lista → ir ao mercado funciona sem retrabalho.
