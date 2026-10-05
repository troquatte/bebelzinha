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

- [ ] Mobile não usa `background-attachment: fixed`.
- [ ] Comidinhas processa paginação de scroll no máximo uma vez por frame.
- [ ] Frame pendente é cancelado no destroy do componente.
- [ ] ShoppingStore aceita inserção em lote com uma única persistência.
- [ ] Receita → Lista usa inserção em lote.
- [ ] Minha Semana → Lista usa inserção em lote.
- [ ] Deduplicação continua funcionando.
- [ ] Eventos AddRecipeToList e AddWeekToList mantêm contagens corretas.
- [ ] Nenhuma dependência nova é adicionada.
- [ ] Build Angular validado pelo CI.
- [ ] Entrega publicada em main.
- [ ] main e development equalizadas.
