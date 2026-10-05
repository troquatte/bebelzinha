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

- [ ] Home, Comidinhas e Compras continuam mostrando no máximo um spotlight.
- [ ] Microcopy deixa claro por que a recomendação apareceu naquele contexto.
- [ ] Cliques no spotlight registram `ClickAchadinho` com contexto não sensível.
- [ ] Link afiliado permanece identificado e não interrompe a tarefa principal.
- [ ] Build Angular validado pelo CI.

## Tasks

### Tasks - Front-end

- [ ] Adaptar eyebrow/copy do spotlight por contexto.
- [ ] Conectar tracking de clique contextual ao componente.
- [ ] Preservar acessibilidade e indicação de afiliado.

### Tasks - Validação

- [ ] Revisar relevância, frequência e tracking.
- [ ] Validar build Angular no CI.

## Resultado Esperado

Achadinhos aparecem como ajuda contextual e geram dados sobre onde têm mais interesse.
