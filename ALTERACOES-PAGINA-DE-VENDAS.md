# Refeição Resolvida — Versão emocional (alívio da rotina)

## O que foi alterado

- `src/app/app.routes.ts`: a rota pública `/produtos/refeicao-resolvida` usa a nova página de vendas.
- `src/app/modules/products/components/products-emotional.component.ts`: nova página Angular isolada, com rastreamento `ProductSalesView`, `ProductVideoPlay`, `ProductCheckoutClick`, UTMs e identificação `ALIVIO_V3`.
- `src/app/modules/products/components/products-emotional.component.html`: novo conteúdo, incluindo H1 emocional, tela real na primeira dobra, vídeo, quatro telas reais, demonstração de valor, exemplos de receitas, acesso e FAQ.
- `src/app/modules/products/components/products-emotional.component.scss`: estilos responsivos, com identidade roxa e botões laranja.
- `src/app/core/seo.config.json`: título e descrição da rota principal alinhados à nova oferta.
- `scripts/validate-sales-emotional.mjs`: conferência estática de imagens, rotas, metadata e código.

## O que foi preservado

- Códigos, ingredientes, receitas, área premium e preços.
- Link e forma de pagamento da Hotmart; somente acrescentado identificador de origem `sck=bebel-alivio-v3` na nova versão.
- Vídeo e quatro capturas **reais** em `public/images/products/refeicao-resolvida/`.
- Páginas anteriores: `/produtos/refeicao-resolvida/teste-a`, `/teste-b` e `/sem-delivery`.
- A oferta não inventa avaliações, urgência, resultados financeiros, bônus ou garantia.

## Como testar

1. Use Node compatível com Angular 22 (`node >=22.22.3`, por exemplo, conforme os requisitos instalados).
2. Execute `npm ci`.
3. Execute `node scripts/validate-sales-emotional.mjs`.
4. Execute `npm run build` e depois `npm start` para conferir desktop e celular.
5. Confira o carregamento do vídeo, das telas reais e dos links para a Hotmart.
6. Abra o checkout **sem efetuar compra** e verifique a URL, o código de origem e os eventos de mensuração.
7. Confirme se as instruções de entrega do código realmente chegam ao comprador, conforme a configuração ativa da Hotmart.

**Nota:** este pacote não foi enviado ao GitHub nem publicado na hospedagem. O build Angular completo não foi executado nesta sessão, porque o ambiente disponível usa Node 22.16.0, abaixo do requisito das dependências Angular 22. A sintaxe do novo componente TypeScript e o CSS passaram por validações básicas, e a auditoria estática passou. Faça o build completo antes de publicar.

## Estratégia

Primeiro testar a oferta como apresentada — **alívio mental da escolha do almoço/jantar**, com delivery como contexto e não promessa de economia garantida. Não misturar os dados da versão nova com os testes A/B anteriores.
