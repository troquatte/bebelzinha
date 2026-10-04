# 023-onboarding-primeira-abertura

## Objetivo

Apresentar rapidamente o valor da Bebel na primeira abertura, sem transformar a entrada no produto em um tutorial longo.

## Experiência

O onboarding aparece como camada de tela inteira acima do app somente enquanto não houver conclusão local.

### Slide 1 — Bebel

Título:
**Oi, eu sou a Bebel 💜**

Texto:
**Tô aqui pra deixar a vida de casa mais simples, sem transformar tudo em mais uma obrigação.**

### Slide 2 — Comidinhas

Título:
**Sem ideia do que fazer de comida hoje?**

Texto:
**Me conta o que você precisa e eu te ajudo a encontrar uma receita simples pro seu dia. Você também pode salvar suas favoritas e separar o que pretende fazer durante a semana.**

### Slide 3 — Lista de compras

Título:
**Do prato pra sacola, sem esquecer nada.**

Texto:
**Mande os ingredientes das receitas para sua lista de compras e vá marcando o que já entrou no carrinho. Pode criar quantas listas precisar.**

### Slide 4 — Começar

Título:
**Prontinho. Agora deixa comigo. 💜**

Texto:
**Receitas, sua semana e suas compras num lugar só — do jeito simples que a vida de casa precisa.**

CTA final:
**Começar com a Bebel**

## Comportamento

- swipe horizontal nativo com scroll snap;
- botão `Continuar` nos slides 1–3;
- ação discreta `Pular` nos slides 1–3;
- quatro indicadores de progresso;
- ao concluir ou pular: persistir `bebel:onboarding-completed = true`;
- enquanto a camada estiver aberta, impedir scroll da página atrás;
- respeitar safe areas e reduced motion;
- sem dependência adicional.

## Ajuste relacionado

No estado vazio de Lista de compras, centralizar o bloco de descrição, mantendo `max-width` e usando alinhamento horizontal real do elemento.

## Critérios de aceite

- [x] Primeira abertura mostra 4 slides.
- [x] Swipe e botão avançam entre slides.
- [x] Indicador acompanha o slide atual.
- [x] “Pular” conclui e fecha.
- [x] CTA final conclui e fecha.
- [x] Reabrir o app no mesmo navegador não exibe novamente.
- [x] Background não rola enquanto onboarding está aberto.
- [x] Texto do estado vazio de Compras fica visualmente centralizado.
- [x] Nenhuma dependência nova foi adicionada.
- [x] Build será validado pelo CI.


## Validação final

- revisão estática concluída;
- build Angular aprovado no GitHub Actions run `37244143024`;
- PR de implementação: #39;
- merge em `development`: `db02c036ad407ea8a66249cf9e577338de9b949f`;
- testes unitários não executados, conforme regra operacional do projeto.
