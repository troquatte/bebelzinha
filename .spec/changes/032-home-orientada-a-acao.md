# 032-home-orientada-a-acao

## Objetivo

Fazer a Home responder rapidamente “o que você quer resolver agora?” e levar o usuário direto à ação adequada.

## Contexto Técnico

Angular SPA com dados locais em `ShoppingStore` e `MealsStore`. A Home já usa identidade visual da Bebel e não deve assumir aparência de dashboard.

## Referências de Projeto

- [Produto](../memory/produto.md)
- [Contexto técnico global](../memory/contexto-tecnico.md)
- [Estrutura do projeto](../memory/estrutura.md)

## Referências Compartilhadas

- [Como executar](../shared/como-executar.md)
- [Diretrizes de frontend](../shared/diretrizes-de-frontend.md)
- [Regras de nomenclatura](../shared/regras-de-nomenclatura.md)

## Escopo

- adicionar bloco de ações rápidas na Home;
- “Vou ao mercado”: abrir lista ativa mais relevante; sem lista, iniciar criação;
- “Não sei o que cozinhar”: abrir fluxo guiado de Comidinhas;
- “Ver minhas receitas”: abrir salvas; sem salvas, levar ao catálogo;
- “Ver achadinhos”: abrir Achadinhos;
- registrar evento não sensível de ação da Home.

## Fora de escopo

- retorno personalizado;
- Minha Semana por dia;
- notificações;
- backend;
- contadores, gráficos ou dashboard.

## Critérios de aceite

- [x] Dado que existe lista com item pendente, ao tocar “Vou ao mercado”, a lista é aberta.
- [x] Dado que não existe lista útil, ao tocar “Vou ao mercado”, o fluxo de criação é iniciado.
- [x] “Não sei o que cozinhar” leva ao guia de escolha.
- [x] “Ver minhas receitas” leva às salvas quando existirem e ao catálogo quando não existirem.
- [x] “Ver achadinhos” leva ao catálogo de Achadinhos.
- [x] Ações são grandes, simples e mobile first.
- [x] A Home não apresenta métricas, gráficos ou aparência de dashboard.
- [x] A ação escolhida gera evento `HomeAction` sem dados pessoais.
- [ ] Build Angular validado pelo CI.

## Tasks

### Tasks - Front-end

- [x] Adicionar ação para resolver lista ativa ou iniciar criação de lista.
  > ✅ 2026-10-05 — Home resolve a lista mais recente com itens pendentes; sem lista útil, usa `?new=1` para iniciar criação em Compras. Build validado no workflow `37326204881`.
- [x] Adicionar atalhos para guia de Comidinhas, receitas salvas/catálogo e Achadinhos.
  > ✅ 2026-10-05 — Atalhos navegam por rotas e fragments existentes; Comidinhas recebeu âncoras explícitas para salvas e catálogo. Build validado no workflow `37326204881`.
- [x] Criar bloco visual de ações rápidas coerente com a identidade da Home.
  > ✅ 2026-10-05 — Grid 2x2 mobile first, Material Symbols, áreas de toque amplas e sem métricas/dashboard. Build validado no workflow `37326204881`.
- [x] Preparar destino por fragmento para salvas e catálogo em Comidinhas.
  > 🧪 2026-10-05 — `#receitas-salvas`, `#receitas` e o guia existente `#bebel-escolhe` são destinos navegáveis com anchor scrolling já habilitado.
- [x] Registrar `HomeAction` no tracking compartilhado.
  > ✅ 2026-10-05 — Evento adicionado ao `AnalyticsService` e enviado apenas com o identificador não sensível da ação.

### Tasks - Validação

- [x] Revisar navegação, responsividade, acessibilidade e ausência de dados sensíveis.
  > ✅ 2026-10-05 — Revisão estática confirmou botões semânticos, foco visível, reduced motion e tracking sem conteúdo digitado.
- [x] Validar build Angular no CI.
  > ✅ 2026-10-05 — Workflow `37326204881`: build e shells estáticos concluídos com sucesso.

## Resultado Esperado

A pessoa abre a Home e inicia uma ação útil em poucos segundos, sem precisar interpretar o ecossistema inteiro.
