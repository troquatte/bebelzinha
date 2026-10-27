# 046 — Vitrine de cortadores e saída para a Shopee

## Objetivo e contexto técnico
Rota pública `/cortadores`, independente do menu e onboarding, para receber anúncios com Amanda e apresentar os modelos do catálogo editável. Angular standalone OnPush, SEO e AnalyticsService existentes. Não há checkout próprio nem confirmação de compra da Shopee.

## Decisões
- Tokens herdados de app.scss, estilos locais, ícones Material Symbols. Título do hero com escala própria para a leitura imediata de visitantes dos anúncios; demais headings e parágrafos herdam o padrão global.
- Fotografias promocionais refeitas por IA na produção233, revisão5, aprovadas no chat. Produtos sem recorte; hero textual preservado após ajustes simultâneos no template; imagem da Amanda permanece disponível no banco. WebP locais para carregamento leve. Aviso de imagens ilustrativas e produto/ferramenta, sem preços ou estoque inventados.
- URLs individuais em `modules/cutters/data/cutter-products.ts`, campo `shopeeUrl`. Nulos usam a loja real `https://shopee.com.br/nayartes`, já fornecida. Cada saída identifica `destination_type` store/product.
- Visita: `PageView` já emitido pelo Router. Clique externo: um evento personalizado `clickShopee` por acionamento, via AnalyticsService existente, com modelo, destino, placement e UTMs. Nenhum novo script/pixel ou Lead padrão para a mesma ação.
- `clickShopee` é o sinal de intenção solicitado para conversão/remarketing, não prova de lead de contato ou compra. No Meta ainda será preciso criar a conversão personalizada e os públicos após confirmar o evento publicado; não configura campanhas nesta mudança.

## Tasks
- [x] Implementar landing, catálogo e destinos centralizados.
  > ✅ 2026-10-26 — Catálogo editável com imagens WebP locais, links individuais e fallback para a loja real. Alterações simultâneas nos produtos e URLs preservadas.
- [x] Integrar rota sem shell e SEO estático para acesso direto.
  > ✅ 2026-10-26 — Rota lazy /cortadores, isLanding e gerador de shells atualizado.
- [x] Verificar build, evento por clique, ausência de conversão ao visitar e comportamento sem pixel.
  > ✅ 2026-10-26 — Build de produção concluído; seis testes de conversão aprovados, incluindo PageView único, clique único com UTMs, destinos e ausência de pixel. Recepção remota depende de publicação e conferência no Meta.
- [x] Conferir apresentação desktop/mobile.
  > ✅ 2026-10-26 — Navegador em 390 e 1440px: imagens carregadas com object-fit contain, sem onboarding/menu e sem overflow horizontal. Ajustes simultâneos do template preservados.

## Publicação
Preparação local apenas; sem commit, push ou deploy. Links individuais preenchidos no catálogo durante a implementação; mantidos conforme a edição simultânea. Confirmar evento real no Gerenciador de Eventos após publicação e respeitar as preferências de rastreamento do navegador.
