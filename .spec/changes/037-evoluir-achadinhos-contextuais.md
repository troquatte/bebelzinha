# 037-evoluir-achadinhos-contextuais

## Objetivo

Aumentar relevância e mensuração dos Achadinhos contextuais sem transformar a Bebel em marketplace.

## Contexto Técnico

`FindingSpotlightComponent` já mostra uma recomendação por contexto em Home, Comidinhas e Compras. O catálogo já suporta `contexts` e links de afiliado.

## Escopo

- manter no máximo um spotlight por área;
- adaptar microcopy do spotlight ao contexto;
- registrar clique no spotlight como `ClickAchadinho` com contexto `home`, `meals` ou `shopping`;
- preservar identificação de afiliado;
- manter catálogo isolado como destino completo.

## Fora de escopo

- ranking por IA;
- personalização por perfil;
- múltiplos produtos simultâneos;
- novos marketplaces.

## Critérios de aceite

- [x] Home, Comidinhas e Compras continuam mostrando no máximo um spotlight.
- [~] Microcopy deixa claro por que a recomendação apareceu naquele contexto.
- [x] Cliques no spotlight registram `ClickAchadinho` com contexto não sensível.
- [~] Link afiliado permanece identificado e não interrompe a tarefa principal.
- [ ] Build Angular validado pelo CI.

## Tasks

### Tasks - Front-end

- [~] Adaptar eyebrow/copy do spotlight por contexto.
  > 🧪 2026-10-05 — Spotlight usa copy específica para `home`, `meals` e `shopping`; permanece um único produto por contexto. Aguardando CI.
- [x] Conectar tracking de clique contextual ao componente.
  > ✅ 2026-10-05 — Imagem e CTA registram `ClickAchadinho` com `source: spotlight`, contexto, ID público, loja e flag de afiliado.
- [~] Preservar acessibilidade e indicação de afiliado.
  > 🧪 2026-10-05 — Link continua interno para detalhes, imagem tem `aria-label` e produtos afiliados exibem indicação discreta. Aguardando CI.

### Tasks - Validação

- [x] Revisar relevância, frequência e tracking.
  > ✅ 2026-10-05 — Revisão estática confirma no máximo um spotlight, sem ranking por perfil e sem parâmetros sensíveis.
- [~] Validar build Angular no CI.
  > 🧪 2026-10-05 — Aguardando Pull Request.

## Resultado Esperado

Achadinhos aparecem como ajuda contextual e geram dados sobre onde têm mais interesse.


## Revisão estática final

> ✅ 2026-10-05 — Um único spotlight por contexto, tracking sem dados sensíveis, link interno preservado e indicação discreta de afiliado confirmados antes do CI.
