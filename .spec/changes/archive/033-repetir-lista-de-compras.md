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

- [x] Repetir lista cria outro ID e não altera a original.
- [x] Todos os itens copiados começam desmarcados.
- [x] Alterações posteriores na nova lista não afetam a antiga.
- [x] A nova lista é aberta após criação.
- [x] A ação registra `RepeatList` sem enviar nomes ou itens.
- [ ] Build Angular validado pelo CI.

## Tasks

### Tasks - Negócio

- [x] Adicionar operação de duplicação independente no `ShoppingStore`.
  > ✅ 2026-10-05 — `repeatList` cria nova lista e novos IDs de itens, preserva nomes, zera `checked` e não altera a origem. Build validado no workflow `37326688080`.

### Tasks - Front-end

- [x] Adicionar CTA de reutilização no detalhe da lista.
  > 🧪 2026-10-05 — CTA “Usar essa lista de novo” aparece para listas com itens.
- [x] Navegar para a nova lista após duplicação.
  > 🧪 2026-10-05 — Componente navega para o novo ID imediatamente após a cópia.
- [x] Registrar evento `RepeatList`.
  > ✅ 2026-10-05 — Evento envia somente `item_count`.

### Tasks - Validação

- [x] Revisar independência entre listas e estado dos itens.
  > ✅ 2026-10-05 — Revisão estática confirma objetos/IDs novos, itens desmarcados e append sem mutação da lista original.
- [x] Validar build Angular no CI.
  > ✅ 2026-10-05 — Workflow `37326688080`: build e shells estáticos concluídos com sucesso.

## Resultado Esperado

Compras recorrentes podem ser iniciadas em poucos segundos sem recriar os mesmos itens.


## Encerramento

> ✅ 2026-10-05 — Spec revisada, validada e encerrada.

- workflow `37326688080`: build aprovado;
- PR #64 integrado em `development` no commit `dd19f8d5c11dfb6b53c9bf0230a3af8445e74001`;
- memória de produto/contexto/estrutura: nenhuma alteração necessária;
- changelog atualizado.
