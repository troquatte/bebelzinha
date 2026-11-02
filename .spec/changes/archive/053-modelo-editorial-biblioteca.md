# 053 — Modelo editorial e biblioteca

## Objetivo e contexto
Preparar biblioteca pública de receitas vinculadas a vídeos longos, com rascunhos, publicação validada e catálogo separado do produto pago. Angular 22.2.1, SSG/SEO specs 051/052 locais. Há 21 JSONs legados sem vínculo com vídeos e 4 vídeos longos confirmados no catálogo.

## Referências
../../memory/produto.md; ../../memory/estrutura.md; ../../shared/regras-de-nomenclatura.md; ../../../doc/plano-seo-editorial.md; specs 051/052 arquivadas.

## Escopo
Fontes editoriais em content/editorial fora de public; contratos de receita (ingredientes com IDs e quantidades, preparo com IDs, rendimento, tempos, imagem, vídeo, categorias, datas, SEO e revisão). Manifesto com slug estável e status draft/published/archived. Quatro pautas de vídeos longos como draft, sem inventar medidas/datas/revisão. Separar snapshots legados intactos do conteúdo publicável e gerar inventário objetivo de lacunas, sem fundir receitas parecidas de vídeos distintos. Publicar no prebuild apenas registros published completos/revisados e vídeos longos existentes. Gerar pacote público mínimo, índices/seletores por slug/categoria/vídeo para etapa 4; Shorts não geram receitas. Não importar dados do dinner-plan/products. Manter URLs /comidinhas e links YouTube existentes; slugs legados reservados até revisão, sem redirects sem equivalência. Nenhuma receita publicada nesta etapa. Build autorizado no pedido para entregar etapa validada, conforme execução das duas etapas anteriores.

## Fora de escopo
Página completa de receita, novo layout do blog/filtros, CTA do produto, schema Recipe, pesquisa OpenSEO, alterações no catálogo pago, deploy/commit/push. Integração real da rota dinâmica SSG fica na etapa 4; preparar contrato e exigir cobertura no build para não prometer páginas que não existem.

## Critérios de aceite
- [x] AC1: modelo/manifesto documentados; 4 drafts vinculados a vídeos longos; categorias e slugs únicos; publicação validada sem detalhes culinários inventados.
- [x] AC2: 21 legados preservados e inventariados; fontes/drafts fora da saída pública; produto pago sem alterações/importações na biblioteca.
- [x] AC3: prebuild gera apenas catálogo publicado, com seletores tipados; metadados/datas/imagem/ingredientes/passos/revisão inválidos impedem publicação.
- [x] AC4: testes de fluxo draft/published/archived, duplicados, vídeo inexistente/Short, entrada inválida e cobertura HTML/sitemap; build SSG/SEO anterior continua aprovado.
- [x] AC5: guia editorial e plano/memória atualizados com próximos passos e limites reais.

## Tasks
- [x] Registrar/revisar spec e inventariar acervo e consumidores existentes.
  > ✅ 2026-11-02 13:58 — Spec e política revisadas antes da execução. Acervo: 21 legados e quatro vídeos longos; somente validador SEO consumia índice antigo, atualizado para nova localização.
- [x] Criar fontes/contratos/categorias e rascunhos; preservar legado fora da publicação.
  > ✅ 2026-11-02 13:58 — Fontes em content/editorial; quatro drafts sem conteúdo culinário/datas inventados; 21 arquivos movidos intactos e confirmados contra hashes Git originais. Inventário descreve lacunas e não presume equivalência com vídeos.
- [x] Implementar compilação editorial validada, catálogo público e seletores para biblioteca.
  > ✅ 2026-11-02 13:58 — compile-editorial executa em prebuild/prestart/prewatch, distribui apenas campos públicos permitidos de published válidos. Contrato e seletores por slug/categoria/vídeo e params SSG adicionados. Catálogo gerado ignorado no Git e refeito na CI.
- [x] Validar transições e casos negativos, cobertura de páginas e build completo.
  > ✅ 2026-11-02 13:58 — npm run build completo aprovado: três SSG, cinco URLs, catálogo zero publicados. validate-editorial aprovou transições e casos negativos, exclusão de fontes/drafts e checagem de cobertura. Sem UI alterada; validação proporcional foi build, artefatos e integração. Produto pago sem diff; aviso CommonJS preexistente continua não bloqueante.
- [x] Revisar diff, atualizar documentos e encerrar etapa local.
  > ✅ 2026-11-02 13:58 — Diff revisado contra AC1–AC5; plano, estrutura, README, fluxo editorial, guia SEO e inventário atualizados. Não houve deploy/commit/push. Próxima etapa é página completa com rota dinâmica e receita conferida.

## Revisão — modo spec
Aceita: AC1/2 atendidos por contratos, fontes e inventário; AC3 por prebuild/seletores; AC4 por validação de integração isolada e build; AC5 pela documentação. Sem nova UI ou receita completa. Não promover active legado a published; não criar publicação só com título/vídeo. Arquivos legados não têm consumidores de receitas no Angular atual; único consumidor é validação SEO, que será atualizado.

## Encerramento
Validada e encerrada localmente em 2026-11-02 13:58. AC1/2: contratos, fontes, inventário e integridade; AC3/4: pipeline, build e testes de integração; AC5: documentos/memória atualizados. Sem nova receita pública nem nova página nesta etapa. Pendências das etapas futuras não bloqueiam o modelo entregue.
