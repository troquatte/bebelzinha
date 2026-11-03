# Promessa de delivery — página independente

Pedido de 3 nov 2026: aplicar a headline e subtítulo fornecidos em uma página própria, sem integrar ao teste A/B. O usuário esclareceu que o PDF não deve ser alterado e não é necessário receber o arquivo para esta mudança.

URL: /produtos/refeicao-resolvida/sem-delivery

Headline: “Pare de gastar com delivery ou quebrar a cabeça todo dia para decidir o almoço e o jantar.”
Subtítulo: “Tenha acesso a 22 soluções completas de refeição + o PDF completo para baixar ou imprimir. Sem complicação e usando o que você já tem em casa.”

Copywriting: brand-copywriter aplicada; estrutura PAS para conectar a dúvida diária ao produto e à ação. Alternativa BAB considerada, sem aplicação: a copy expressa pelo usuário prevalece, sem gerar outra promessa ou novos anúncios nesta entrega. Oferta R$27 pagamento único preservada. PDF citado no hero, benefícios, FAQ e fechamento; nenhum arquivo PDF modificado.

Arquitetura: route data salesPromise:delivery. ProductsComponent reutiliza o layout A, mas ignora ab=a/b, não lê/grava a chave do experimento e não chama o sorteio. Eventos usam sales_promise:sem-delivery, sem sales_variant/sales_experiment. Todas as compras usam SCK bebel-sem-delivery. UTMs e origem de receita continuam saneadas. As rotas teste-a/teste-b mantêm suas headlines e SCKs anteriores.

Rota sem menus e acessível mesmo ao comprador já autenticado. Página de campanha noindex,follow e fora do sitemap; canonical próprio consistente entre shell e cliente. Preço/checkout/VSL/fotos existentes reutilizados. Sem deploy, commit ou push.

Validação: dez testes de promessa independente, experimento e atribuição aprovados. Build/pós-build/SEO/editorial aprovados com70receitas e80URLs. Navegador desktop1280/mobile390 sem overflow; texto exato, três links Hotmart com SCK próprio, ausência de sidebar e noindex conferidos. Queryab=b não altera a promessa. Rotas A/B anteriores conferidas no navegador e preservadas.

Evidências: .videos/output/seo/promessa-delivery-desktop.png e promessa-delivery-mobile.png.

## Revisão da entrega — acesso online e PDF

Por pedido do usuário, o subtítulo agora explica acesso interativo no celular e PDF completo como duas entregas da mesma compra. Criado bloco com dois cards, FAQ explícita e CTAs alinhados. Acrescentadas quatro etapas com capturas reais do produto: escolher refeição, ajustar porções, acompanhar preparo e marcar compras. Quatro imagens WebP, carregamento lazy, texto alternativo e links para ampliar; capturas não contêm código de acesso. Marcações usadas na demonstração foram restauradas. PDF não foi modificado. A/B e checkout independente preservados.

Validação: dez testes aprovados; build/pós-build/SEO aprovados. Desktop1280 e celular390 sem overflow; formatos e etapas em uma coluna no celular, quatro imagens carregadas. Prévia local em /produtos/refeicao-resolvida/sem-delivery. Sem deploy. Evidências .videos/output/seo/entrega-dois-formatos.png e entrega-etapas-desktop.png.
