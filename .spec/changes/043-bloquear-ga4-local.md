# 043-bloquear-ga4-local

## Objetivo

Impedir que o uso local da Bebel contamine as métricas GA4 de produção.

## Contexto Técnico

SPA Angular; GA4 hoje carrega incondicionalmente em src/index.html e recebe eventos pelo AnalyticsService. Centralizar inicialização e bloqueio no serviço existente.

## Referências de Projeto

- .spec/memory/produto.md
- .spec/memory/contexto-tecnico.md
- .spec/memory/estrutura.md

## Referências Compartilhadas

- .spec/shared/como-executar.md
- .spec/shared/regras-de-nomenclatura.md

## Observações Locais

- Local inclui modo development, localhost/subdomínios, loopback IPv4/IPv6, .local e IPs privados de LAN.
- Bloquear também builds de produção servidos nesses hosts.
- Meta Pixel permanece com comportamento existente; escopo apenas GA4.
- Sem dependências novas ou testes unitários.

## Critérios de aceite

- Nenhum script GA4, configuração, page view ou evento de negócio é enviado localmente.
- Em produção pública, ID válido carrega gtag uma vez e mantém page views manuais sem duplicidade.
- Sem ID válido, GA4 não carrega.

## Tasks

### Tasks - Front-end

- [x] Remover bootstrap GA4 incondicional do HTML e inicializar no AnalyticsService com bloqueio local.
- [~] Validar cenários locais/públicos e bootstrap, revisar implementação e confirmar build no CI.
- [~] Atualizar memória técnica e entregar PR para development.

## Resultado Esperado

Uso local não alimenta GA4; produção mantém os eventos atuais.

## Revisão da spec

Modo spec: APROVADA. Critérios rastreáveis às três tarefas; solução mínima no serviço existente, sem alteração de produto ou persistência.

## Evidências

- 2026-10-05: script estático removido; serviço valida ambiente/ID antes de configurar ou carregar GA4.
- Verificação executável pontual em Node: 19 cenários locais/públicos, bloqueio de bootstrap local, carregamento único e send_page_view false confirmados. Nenhum teste unitário criado/executado.
- Memória técnica sincronizada; aguardando CI de build.
