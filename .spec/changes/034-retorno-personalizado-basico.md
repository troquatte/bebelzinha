# 034-retorno-personalizado-basico

## Objetivo

Usar contexto local para mostrar uma única retomada útil na Home e dar sensação de continuidade.

## Contexto Técnico

A SPA já persiste listas e estado de Comidinhas localmente. A última área útil pode ser registrada no navegador sem conta.

## Escopo

- registrar última área útil visitada;
- escolher uma única retomada na Home;
- prioridade: lista ativa → Minha Semana → receitas salvas → última área;
- CTA leva diretamente ao contexto escolhido;
- não mostrar card quando não houver contexto útil.

## Fora de escopo

- recomendação por IA;
- múltiplos cards de retorno;
- sincronização entre dispositivos;
- notificações.

## Critérios de aceite

- [~] Lista com item pendente tem prioridade máxima.
- [~] Sem lista ativa, Minha Semana preenchida é priorizada.
- [~] Sem semana, receitas salvas podem gerar retomada.
- [~] Sem contexto anterior, última área válida pode ser retomada.
- [x] Apenas um contexto de retomada aparece por vez.
- [x] Dados permanecem locais.
- [ ] Build Angular validado pelo CI.

## Tasks

### Tasks - Front-end

- [~] Criar serviço local mínimo para registrar última área útil.
  > 🧪 2026-10-05 — `ContinuityService` grava somente a última área entre Compras, Comidinhas e Achadinhos em `localStorage`.
- [~] Criar regra de prioridade do contexto de retorno.
  > 🧪 2026-10-05 — Home prioriza lista pendente → Minha Semana → salvas → última área.
- [~] Transformar “Hoje com a Bebel” em retomada útil quando existir contexto.
  > 🧪 2026-10-05 — Card mostra um único título, texto e CTA contextual quando existe retomada.
- [~] Manter fallback neutro para primeiro uso.
  > 🧪 2026-10-05 — Sem contexto, card mantém orientação simples sem simular memória inexistente.

### Tasks - Validação

- [x] Revisar prioridade, privacidade e navegação.
  > ✅ 2026-10-05 — Revisão estática confirma apenas identificador de área em storage; nenhum texto ou dado pessoal é persistido.
- [~] Validar build Angular no CI.
  > 🧪 2026-10-05 — Aguardando Pull Request.

## Resultado Esperado

Ao voltar, a pessoa sente que a Bebel lembra onde ela parou, sem complexidade algorítmica.
