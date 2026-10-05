# 040-reduzir-jank-mobile

## Objetivo

Reduzir travadas percebidas no app, especialmente durante scroll e envio de vários ingredientes para listas.

## Diagnóstico

Não há evidência de memory leak clássico no código revisado.

Gargalos encontrados:
- background fixo no mobile;
- callback de scroll sem throttle;
- múltiplos `JSON.stringify + localStorage.setItem` síncronos dentro de loops de ingredientes.

## Critérios de aceite

- [x] Mobile não usa `background-attachment: fixed`.
- [x] Comidinhas processa paginação de scroll no máximo uma vez por frame.
- [x] Frame pendente é cancelado no destroy do componente.
- [x] ShoppingStore aceita inserção em lote com uma única persistência.
- [x] Receita → Lista usa inserção em lote.
- [x] Minha Semana → Lista usa inserção em lote.
- [x] Deduplicação continua funcionando.
- [x] Eventos AddRecipeToList e AddWeekToList mantêm contagens corretas.
- [x] Nenhuma dependência nova é adicionada.
- [x] Build Angular validado pelo CI.
- [ ] Entrega publicada em main.
- [ ] main e development equalizadas.


## Evidências de implementação

- revisão de subscriptions/effects/listeners sem evidência de leak clássico;
- background fixo removido do mobile;
- scroll de Comidinhas limitado por `requestAnimationFrame` e cancelado no destroy;
- inserção de múltiplos ingredientes agora persiste o ShoppingStore apenas uma vez por lote;
- deduplicação mantém conjunto normalizado de itens existentes e novos;
- analytics continua usando as mesmas contagens finais;
- workflow `37342646726` aprovado: build e shells estáticos concluídos com sucesso.
