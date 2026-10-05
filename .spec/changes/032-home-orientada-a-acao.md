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

- [ ] Dado que existe lista com item pendente, ao tocar “Vou ao mercado”, a lista é aberta.
- [ ] Dado que não existe lista útil, ao tocar “Vou ao mercado”, o fluxo de criação é iniciado.
- [ ] “Não sei o que cozinhar” leva ao guia de escolha.
- [ ] “Ver minhas receitas” leva às salvas quando existirem e ao catálogo quando não existirem.
- [ ] “Ver achadinhos” leva ao catálogo de Achadinhos.
- [ ] Ações são grandes, simples e mobile first.
- [ ] A Home não apresenta métricas, gráficos ou aparência de dashboard.
- [ ] A ação escolhida gera evento `HomeAction` sem dados pessoais.
- [ ] Build Angular validado pelo CI.

## Tasks

### Tasks - Front-end

- [ ] Adicionar ação para resolver lista ativa ou iniciar criação de lista.
- [ ] Adicionar atalhos para guia de Comidinhas, receitas salvas/catálogo e Achadinhos.
- [ ] Criar bloco visual de ações rápidas coerente com a identidade da Home.
- [ ] Preparar destino por fragmento para salvas e catálogo em Comidinhas.
- [ ] Registrar `HomeAction` no tracking compartilhado.

### Tasks - Validação

- [ ] Revisar navegação, responsividade, acessibilidade e ausência de dados sensíveis.
- [ ] Validar build Angular no CI.

## Resultado Esperado

A pessoa abre a Home e inicia uma ação útil em poucos segundos, sem precisar interpretar o ecossistema inteiro.
