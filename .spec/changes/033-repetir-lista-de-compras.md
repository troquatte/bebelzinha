# 033-repetir-lista-de-compras

## Objetivo

Permitir reutilizar uma lista anterior criando uma nova lista independente, com os mesmos itens desmarcados.

## Contexto Técnico

Listas são persistidas em `localStorage` pelo `ShoppingStore`.

## Referências de Projeto

- [Produto](../memory/produto.md)
- [Contexto técnico global](../memory/contexto-tecnico.md)
- [Estrutura do projeto](../memory/estrutura.md)

## Referências Compartilhadas

- [Como executar](../shared/como-executar.md)
- [Diretrizes de frontend](../shared/diretrizes-de-frontend.md)

## Escopo

- ação “Usar essa lista de novo” no detalhe;
- copiar itens para nova lista;
- todos os itens novos começam não concluídos;
- lista original permanece inalterada;
- nome sugerido reaproveita o nome-base e a data atual;
- nova lista pode ser editada normalmente;
- rastrear `RepeatList`.

## Fora de escopo

- recorrência automática;
- agendamento;
- sincronização entre dispositivos.

## Critérios de aceite

- [ ] Repetir lista cria outro ID e não altera a original.
- [ ] Todos os itens copiados começam desmarcados.
- [ ] Alterações posteriores na nova lista não afetam a antiga.
- [ ] A nova lista é aberta após criação.
- [ ] A ação registra `RepeatList` sem enviar nomes ou itens.
- [ ] Build Angular validado pelo CI.

## Tasks

### Tasks - Negócio

- [ ] Adicionar operação de duplicação independente no `ShoppingStore`.

### Tasks - Front-end

- [ ] Adicionar CTA de reutilização no detalhe da lista.
- [ ] Navegar para a nova lista após duplicação.
- [ ] Registrar evento `RepeatList`.

### Tasks - Validação

- [ ] Revisar independência entre listas e estado dos itens.
- [ ] Validar build Angular no CI.

## Resultado Esperado

Compras recorrentes podem ser iniciadas em poucos segundos sem recriar os mesmos itens.
