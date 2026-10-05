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

- [ ] Lista com item pendente tem prioridade máxima.
- [ ] Sem lista ativa, Minha Semana preenchida é priorizada.
- [ ] Sem semana, receitas salvas podem gerar retomada.
- [ ] Sem contexto anterior, última área válida pode ser retomada.
- [ ] Apenas um contexto de retomada aparece por vez.
- [ ] Dados permanecem locais.
- [ ] Build Angular validado pelo CI.

## Tasks

### Tasks - Front-end

- [ ] Criar serviço local mínimo para registrar última área útil.
- [ ] Criar regra de prioridade do contexto de retorno.
- [ ] Transformar “Hoje com a Bebel” em retomada útil quando existir contexto.
- [ ] Manter fallback neutro para primeiro uso.

### Tasks - Validação

- [ ] Revisar prioridade, privacidade e navegação.
- [ ] Validar build Angular no CI.

## Resultado Esperado

Ao voltar, a pessoa sente que a Bebel lembra onde ela parou, sem complexidade algorítmica.
