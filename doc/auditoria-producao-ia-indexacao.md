# Auditoria de produção, IA e indexação

Observação em 2026-11-02. Revisões locais ainda não publicadas por este chat. Consultas HTTP públicas, código e navegador; sem acesso a Search Console ou registros de bots.

| Recurso publicado | Resposta observada | Consequência |
|---|---|---|
| /comidinhas/macarrao-ao-limao-sem-creme-de-leite/ | HTTP 404, shell antigo da home | Receita nova ainda indisponível para descoberta pública |
| /sitemap.xml | HTTP 404, HTML em vez de XML | Sitemap novo ainda não publicado |
| /jantar-resolvido/ | HTTP 200, robots index,follow no HTML; permanece index,follow após Angular | Não afirmar exclusão da área paga do índice em produção |
| /produtos/refeicao-resolvida/acessar/ | HTTP 404, shell antigo com canonical da home | Publicação diverge das rotas locais de acesso |
| /robots.txt | HTTP 200; somente comentários de content signals, sem User-agent/Disallow/Sitemap no corpo observado | Sem bloqueio explícito de busca/IA nesse arquivo, mas sitemap sem referência |

## Versão local validada
Receita pública: texto de ingredientes/preparo completo no SSG, Recipe/HowToStep/BreadcrumbList/WebPage, referências, canonical e index,follow. Sitemap automático inclui receita e exclui todas as privatePaths. Cada shell interno/acesso/teste tem noindex,follow; fallback não expõe ficha paga no HTML SSG. Noindex limita indexação por robôs que o respeitam; não substitui autenticação. O controle atual de acesso do produto é local no navegador, sem verificação de compra no servidor.

Removida a apresentação inicial e seu componente exclusivo; site abre diretamente, sem leitura ou exclusão de listas/acesso armazenados. Biblioteca agora somente blog por categorias publicadas; menu único desktop 15rem/240px. Banner visual usa foto/retrato existentes e copy do usuário, com preço centralizado.

## Aptidão para busca com IA
O conteúdo local está preparado tecnicamente para ser rastreado/lido, mas a URL pública 404 impede afirmar aptidão em produção. Para Google AI Overviews/AI Mode, a página deve estar indexada e apta a snippets; não há arquivo especial de IA ou schema exclusivo obrigatório. Cumprir requisitos não garante indexação/citação. Para ChatGPT Search, permitir OAI-SearchBot é relevante; é diferente de permitir GPTBot para treino. Regras do robots não comprovam acesso por IP/WAF/CDN; não foram validados logs de bots.

Fontes oficiais: https://developers.google.com/search/docs/appearance/ai-features ; https://developers.openai.com/api/docs/bots ; https://developers.google.com/search/docs/crawling-indexing/block-indexing .

## Prioridades
1. Publicar artefato atualizado; conferir recipe 200/HTML real, sitemap XML 200 e noindex da área interna antes de declarar SEO pronto em produção.
2. Conferir Search Console/Bing: URLs realmente indexadas, sitemap, URL inspection e eventual remoção de área interna já indexada. A meta observada não demonstra que ela já está no índice.
3. Conferir Rich Results e Core Web Vitals/PageSpeed no domínio publicado, incluindo imagens, player, fontes e carregamento móvel; gzip local não representa navegação real.
4. Aprimorar conteúdo com autoria/responsabilidade editorial clara, revisão real, fotos úteis e links entre receitas relacionadas conforme o acervo crescer. Não inventar avaliações, testes culinários ou metadados de vídeo.
5. Tratar proteção de compra/autenticação no servidor como etapa própria; não confundir noindex e código local com controle forte de acesso.

## A/B da oferta
resolveSalesVariant escolhe query ab, depois variante da rota, depois valor salvo, senão sorteio 50/50. ProductsComponent renderiza a variante na mesma URL; não há redirecionamento automático às rotas teste-a/teste-b. Elas são prévias dedicadas noindex e canonical para oferta principal. Testes locais: A/B exibidas, checkout SCK correspondente, raiz mantém B após reload, sete testes focados aprovados. Isso não confirma distribuição estatística, ingestão de analytics ou resultados em produção. Nenhuma regra de sorteio, preço ou checkout foi alterada nesta revisão.
