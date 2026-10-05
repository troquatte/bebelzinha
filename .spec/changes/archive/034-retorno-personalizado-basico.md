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

- [x] Lista com item pendente tem prioridade máxima.
- [x] Sem lista ativa, Minha Semana preenchida é priorizada.
- [x] Sem semana, receitas salvas podem gerar retomada.
- [x] Sem contexto anterior, última área válida pode ser retomada.
- [x] Apenas um contexto de retomada aparece por vez.
- [x] Dados permanecem locais.
- [ ] Build Angular validado pelo CI.

## Tasks

### Tasks - Front-end

- [x] Criar serviço local mínimo para registrar última área útil.
  > ✅ 2026-10-05 — `ContinuityService` grava somente a última área entre Compras, Comidinhas e Achadinhos em `localStorage`.
- [x] Criar regra de prioridade do contexto de retorno.
  > ✅ 2026-10-05 — Home prioriza lista pendente → Minha Semana → salvas → última área.
- [x] Transformar “Hoje com a Bebel” em retomada útil quando existir contexto.
  > ✅ 2026-10-05 — Card mostra um único título, texto e CTA contextual quando existe retomada.
- [x] Manter fallback neutro para primeiro uso.
  > ✅ 2026-10-05 — Sem contexto, card mantém orientação simples sem simular memória inexistente.

### Tasks - Validação

- [x] Revisar prioridade, privacidade e navegação.
  > ✅ 2026-10-05 — Revisão estática confirma apenas identificador de área em storage; nenhum texto ou dado pessoal é persistido.
- [x] Validar build Angular no CI.
  > ✅ 2026-10-05 — Workflow `37327480396`: build e shells estáticos concluídos com sucesso.

## Resultado Esperado

Ao voltar, a pessoa sente que a Bebel lembra onde ela parou, sem complexidade algorítmica.


## Encerramento

> ✅ 2026-10-05 — Spec revisada, validada e encerrada.

- workflow `37327480396`: build aprovado;
- PR #66 integrado em `development` no commit `ffd32a86120eefb2f6923c20ba1730336e4f8611`;
- dados de continuidade permanecem locais e limitados à última área útil;
- memória de produto será consolidada ao final do épico;
- changelog atualizado.
