# 052 — SEO técnico automático

## Objetivo
Gerar sitemap.xml e robots.txt a cada build/publicação, incluindo automaticamente novos posts públicos SSG sem editar listas de URLs. Padronizar origem/metadados/indexação e corrigir páginas inexistentes.

## Contexto Técnico
Angular 22.2.1, três rotas SSG e áreas pessoais/venda CSR, GitHub Pages. Spec 051 validada localmente na mesma branch, ainda não publicada. Pós-build anterior cria shells de receitas sem rota. Metadados de robots não acompanham navegação. Publicação estática exige build/deploy; não há CMS conectado.

## Referências
- ../../memory/produto.md, ../../memory/contexto-tecnico.md, ../../memory/estrutura.md
- ../../shared/como-executar.md, ../../shared/regras-de-nomenclatura.md, ../../shared/diretrizes-de-frontend.md
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- ../../../doc/plano-seo-editorial.md

## Escopo e decisões
Origem e imagem centralizadas. SeoService remove query/hash e normaliza caminho canônico com barra final, compatível com diretórios index.html da hospedagem; indexação acompanha navegação. Compras, jantar pago, acesso e variantes A/B são noindex,follow; variantes apontam à oferta principal. Sitemap descobre HTML SSG indexável com canonical próprio e conteúdo, mais shells públicos conhecidos (home e oferta CSR). Novos posts SSG indexáveis entram por descoberta, sem inventar datas lastmod ou frequência. Robots permite crawl para leitura de noindex e aponta sitemap; não expor códigos/query. Página 404 real na UI e fallback noindex; HTTP 404 depende do host GitHub Pages. Não criar redirecionamentos de receitas antigas sem destino equivalente: remover shells falsos e mostrar 404. Preservar oferta, preços, tracking, acesso e layout existente. Manter build estático. Validar build autorizado pelo usuário; diretriz da skill ng sobre pedir build ao usuário é superada pela autorização de executar e validar esta etapa.

## Fora de escopo
Receitas novas, schema Recipe/VideoObject, banners, conteúdo editorial, alteração de campanhas/checkout, CMS, submissão remota Search Console/Bing, deploy, atualização ampla de pacotes.

## Critérios de aceite
- [x] AC1: sitemap/robots gerados pelo postbuild e workflow existente, URLs absolutas e canônicas, sem pessoais/testes/query/drafts/shells vazios.
- [x] AC2: inclusão e remoção automáticas demonstradas com post SSG temporário; exclusão noindex e validações negativas de metadados/canonical.
- [x] AC3: metadados coerentes no HTML e navegação; canonical de produção estável e sem query; noindex nas áreas pessoais e testes, com restauração index nas públicas.
- [x] AC4: shells legados sem rota deixam de ser criados; fallback/404 noindex; acesso e navegação mantidos, SSG preservado.
- [x] AC5: plano, documentação de publicação e memória atualizados com evidência real e limites.

## Tasks
- [x] Registrar e revisar escopo, política de URLs/indexação e geração automática.
  > ✅ 2026-11-02 13:48 — Spec 052 revisada antes de implementar; limites e política registrados. HEAD público confirmou 301 para barra final; decisão ajustada com evidência.
- [x] Implementar configuração SEO comum, runtime noindex/canonical e tratamento de página inexistente.
  > ✅ 2026-11-02 13:48 — seo.config.json/SeoService centralizam origem, imagens, canonical e indexação. Componente NotFound gerado pelo CLI reutiliza hero existente sem estilos novos; wildcard deixa de mascarar URLs inválidas.
- [x] Integrar shells válidos, descoberta de páginas e geração automática de sitemap/robots ao pós-build.
  > ✅ 2026-11-02 13:48 — generate-pages e seo-artifacts geram shells válidos, sitemap e robots; catálogo antigo não gera páginas. postbuild do package.json é executado no workflow já existente; nenhuma submissão/deploy remotos.
- [x] Validar artefatos, simular novo post/removido/noindex e conferir navegação no navegador.
  > ✅ 2026-11-02 13:48 — npm run build aprovado com 3 rotas SSG, sitemap de 5 URLs e validações. validate-seo simulou novo/removido/noindex e rejeitou canonical errado, descrição ausente e shell vazio. Browser confirmou index→noindex→index, canonical sem query, A/B noindex e 404 com retorno; zero erros de console. Última inspeção confirmou canonical /comidinhas/ após build final.
- [x] Revisar diff, atualizar plano/memória e encerrar entrega local com evidências.
  > ✅ 2026-11-02 13:48 — Diff revisado contra AC1–AC5; README, estrutura, plano e guia de publicação atualizados. Limites de CMS/SSG e status HTTP do host documentados. Alertas de dependências prévios e CommonJS sweetalert2 seguem manutenção separada.

## Revisão — modo spec
Aceita. AC1/AC2 cobertos por gerador e validação de artefatos; AC3 por serviço + inspeção/navegador; AC4 por remoção de geração legada, rota wildcard e fallback; AC5 por documentação. Sem publicar conteúdo incompleto; robots não bloqueará páginas noindex (Google precisa lê-las). Sem servidor novo. Testes de integração do pipeline são necessários para comprovar automação; sem testes unitários espelhando implementação.

## Encerramento
Validada e encerrada localmente em 2026-11-02 13:48. AC1/AC2: gerador e testes de integração; AC3/AC4: artefatos, build e navegador; AC5: documentos e memória atualizados. Sem pendência conhecida no escopo local. Publicação e Search Console/Bing não executados; aguardam etapas próprias. Próxima etapa: modelo editorial/biblioteca.

## Ajuste confirmado durante implementação
HEAD público de /comidinhas retornou 301 para /comidinhas/. Política canônica ajustada para barra final nas páginas; assets/sitemap.xml não recebem barra. Sitemap e runtime usarão o mesmo endereço final.
