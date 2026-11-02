# 060-cta-produto-nas-receitas

## Objetivo
Apresentar o Refeição Resolvida a quem lê uma receita pública e medir o interesse por receita de origem.

## Contexto Técnico
Angular 22, SSG e hidratação existentes. Reutilizar AnalyticsService e MEAL_PRODUCT; preservar preço/checkout, experimento A/B, fontes, utensílios Shopee, checklist e fundo bege. Sem infraestrutura nova.

## Referências de Projeto
../../memory/produto.md; ../../memory/contexto-tecnico.md; ../../memory/estrutura.md.
## Referências Compartilhadas
../../shared/como-executar.md; ../../shared/regras-de-nomenclatura.md; ../../shared/diretrizes-de-frontend.md.

## Observações Locais
Escopo: card reutilizável no template de toda receita publicada, após preparo/dicas/fontes e antes dos utensílios, CTA para oferta interna e contexto de receita no clique, visita e clique de checkout. Nome/preço/rota centralizados na configuração existente. Fora de escopo: deploy, campanhas, preço, checkout remoto, agenda semanal, novas receitas, compra atribuída e painel de métricas.
Premissas: oferecer 22 refeições com porções 2/4 e listas, conforme produto real; não prometer agenda pronta. Um CTA, sem popup/sticky, escondido na impressão para preservar ficha. Não usar UTMs em link interno para não sobrescrever aquisição. Origem por venda=blog-receita e receita=slug público, validado antes de analytics, sem transmitir outros parâmetros.
Dependências: RecipePageComponent, ProductsComponent e AnalyticsService existentes. Risco: analytics bloqueado não pode impedir navegação; tracking não equivale a compra, GA4 local permanece desativado.

## Critérios de aceite
Card no HTML SSG e navegador, sem acesso pago necessário, destino para oferta com receita correta; mobile sem overflow e ação por teclado; preço único centralizado. Evento RecipeProductClick por ativação com source_recipe; ProductSalesView/ProductCheckoutClick preservam origem e variante. Entrada de origem ausente/inválida omitida e demais campanhas preservadas. Sem publicação ou envio remoto durante validação.

## Tasks
### Tasks - Front-end
- [x] Criar card e integrar à receita, mantendo layout e produto reais.
  > ✅ 2026-11-02 15:07 — RecipeProductCtaComponent gerado pelo CLI, integrado no template público antes dos utensílios. FAB concreto com 22 refeições, porções 2/4 e lista; nome/preço/rota em MEAL_PRODUCT, sem mudar checkout ou experimento. Alternativa BAB: “Todo dia surge a dúvida do almoço ou jantar. Tenha 22 refeições caseiras à mão, com ingredientes e preparo. Conheça o Refeição Resolvida.” Considerada e não publicada.
- [x] Transportar e validar slug público nos eventos de interesse, visita e checkout.
  > ✅ 2026-11-02 15:07 — RecipeProductClick e source_recipe implementados; publicRecipeSource aceita apenas catálogo publicado. Origem acompanha ProductSalesView e ProductCheckoutClick, sem UTMs internos nem códigos; alteração de campanha limpa contexto antigo.
### Tasks - Validação
- [x] Verificar tracking com testes focados sem envio remoto; validar build/postbuild e HTML SSG.
  > ✅ 2026-11-02 15:07 — npm run build e pós-build aprovados (4 rotas SSG, 6 URLs no sitemap). Três testes focados aprovados, incluindo CTA, origem na visita/checkout, troca A/B/campanha e rejeição de rascunho/inválidos. HTML SSG de todas as receitas publicadas conferido por DOM. Avisos existentes: sweetalert2 CommonJS; JSDOM limita navegação externa/CSS, sem falha dos asserts. Não houve transmissão a analytics real nos testes.
- [x] Conferir desktop/mobile, destino, retorno e ausência de regressão do checklist no navegador.
  > ✅ 2026-11-02 15:07 — Navegador: desktop e viewport mobile 390x844, largura útil/scrollWidth ambos 375; card legível, botão com Enter abre oferta e preserva query da receita. Retorno mantém quatro passos e seis itens marcados. Console sem erros; viewport restaurado e revisão 060 disponível. CTA oculto em impressão por regra de host; utensílios preservados.
- [x] Revisar implementação, atualizar plano/memória e encerrar entrega local.
  > ✅ 2026-11-02 15:07 — Revisão implementation aprovada: escopo limitado, HTML SSG com um card por receita, preço centralizado, sem credenciais ou dados privados na origem. Plano etapa 5 concluído localmente e guia de eventos registrado; fechamento sem commit/push/deploy.

## Resultado Esperado
Leitor pode conhecer oferta sem interromper preparo; interesse associado à receita nos eventos existentes, sem alegar conversão em compra.

## Revisão da spec
Modo spec: aprovada após comparar proposta ao produto real. Copy principal FAB: refeições/porções/lista → escolher sem começar do zero → conhecer oferta. Alternativa BAB considerada: decisão diária → refeições à mão → produto. Selecionada FAB por ser concreta; alternativa não publicada nem teste A/B criado. Mudança limitada à etapa 5, sem integrações externas novas. Validações de build já autorizadas no fluxo do usuário; executadas pelo agente apesar da orientação genérica da skill Angular de delegar comandos.

## Encerramento
> ✅ 2026-11-02 15:07 — Revisada, validada e encerrada localmente.

Validações: build/postbuild, 3 testes focados, DOM SSG e desktop/mobile/teclado/retorno aprovados. Nenhuma pendência conhecida dentro do escopo local. Métricas reais e publicação não executadas; clique de checkout não comprova compra.

Memória: changelog atualizado; estrutura registra responsabilidade compartilhada da atribuição. Contexto técnico/produto sem mudança estrutural necessária. doc/plano-seo-editorial.md e doc/seo-publicacao.md atualizados.
