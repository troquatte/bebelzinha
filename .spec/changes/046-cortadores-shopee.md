# 046 — Vitrine de cortadores e saída para a Shopee

## Objetivo e contexto técnico
Rota pública `/cortadores`, independente do menu e onboarding, para receber anúncios com Amanda e apresentar os cinco modelos enviados. Angular standalone OnPush, SEO e AnalyticsService existentes. Não há checkout próprio nem confirmação de compra da Shopee.

## Decisões
- Tokens herdados de app.scss, estilos locais, ícones Material Symbols. Título do hero com escala própria para a leitura imediata de visitantes dos anúncios; demais headings e parágrafos herdam o padrão global.
- Fotografias promocionais refeitas por IA na produção233, revisão5, aprovadas no chat. Produtos sem recorte; hero usa Amanda aprovada. WebP locais para carregamento leve. Aviso de imagens ilustrativas e produto/ferramenta, sem preços ou estoque inventados.
- URLs individuais em `modules/cutters/data/cutter-products.ts`, campo `shopeeUrl`. Nulos usam a loja real `https://shopee.com.br/nayartes`, já fornecida. Cada saída identifica `destination_type` store/product.
- Visita: `PageView` já emitido pelo Router. Clique externo: um evento personalizado `clickShopee` por acionamento, via AnalyticsService existente, com modelo, destino, placement e UTMs. Nenhum novo script/pixel ou Lead padrão para a mesma ação.
- `clickShopee` é o sinal de intenção solicitado para conversão/remarketing, não prova de lead de contato ou compra. No Meta ainda será preciso criar a conversão personalizada e os públicos após confirmar o evento publicado; não configura campanhas nesta mudança.

## Tasks
- [ ] Implementar landing, catálogo e destinos centralizados.
- [ ] Integrar rota sem shell e SEO estático para acesso direto.
- [ ] Verificar build, evento por clique, ausência de conversão ao visitar e comportamento sem pixel.
- [ ] Conferir apresentação desktop/mobile.

## Publicação
Preparação local apenas; sem commit, push ou deploy. Links de produtos aguardam usuário. Confirmar evento real no Gerenciador de Eventos após publicação e respeitar as preferências de rastreamento do navegador.
