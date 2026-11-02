# 062-sem-onboarding-auditoria-ia-indexacao

## Objetivo
Remover a apresentação inicial e responder com evidências sobre descoberta por IA, indexação da área paga e pendências SEO.

## Contexto Técnico e referências
App Angular/SSG; ../../memory/produto.md, ../../memory/contexto-tecnico.md, ../../memory/estrutura.md e ../../shared/diretrizes-de-frontend.md. Revisões anteriores ainda locais. Conteúdo público deve ser indexável; compras/acesso/produto interno noindex. Noindex não é autenticação.

## Escopo e premissas
Remover montagem/import/computed do onboarding e seus três arquivos exclusivos, sem alterar dados/listas/acesso salvos. Conferir HTML estático/meta/sitemap local e HTTP público em produção; registrar diferença real. Sem deploy, alterações de Cloudflare, Search Console, acesso pago ou compra remota. Não prometer ranking/citação ou inferir índice real de uma meta tag. Validar UI em navegador e build. Risco conhecido: produção está com versão anterior (receita/sitemap 404; jantar-resolvido HTTP 200 e meta index).

## Critérios de aceite
Site abre diretamente sem app-onboarding ou bloqueio de scroll; código eliminado sem imports órfãos. Build/SEO locais preservam noindex das rotas pessoais e index da receita. Relatório identifica status HTTP e robots em produção, aptidão local para IA e limites (indexação real/crawler/WAF não confirmados). Pendências priorizadas sem implementar infraestrutura fora de escopo.

## Tasks
- [x] Remover onboarding inicial sem alterar estado pessoal ou fluxo de compra.
  > ✅ 2026-11-02 18:42 UTC — Removidas montagem/import/computed no App e três arquivos exclusivos do onboarding. Nenhum dado pessoal/compra/lista apagado. Código não mantém referências de execução ao componente.
- [x] Conferir produção, robôs de IA e política local de indexação e registrar achados.
  > ✅ 2026-11-02 18:42 UTC — HTTP público revelou receita e sitemap 404, jantar interno index,follow no HTML e navegador. Robots público só comentários. Documento doc/auditoria-producao-ia-indexacao.md separa evidência local/publicada e limitações; noindex e exclusão do sitemap local conferidos para todas as rotas privadas.
- [x] Validar build/postbuild e acesso direto à home/biblioteca; revisar e encerrar entrega local.
  > ✅ 2026-11-02 18:42 UTC — Build/postbuild aprovados após remoção e preservados no build final. Navegador abriu home sem onboarding, overflow visível, biblioteca móvel largura/scrollWidth 375 e sem intro. Revisão implementation aprovada; sem deploy ou confirmação de índice real.

## Revisão spec
Modo spec aprovado: mudança de experiência explicitamente solicitada. Remoção limitada ao módulo exclusivo; consultas públicas não alteram hospedagem. As falhas de produção devem ser relatadas com prioridade, sem declarar correção publicada. Pesquisa usa documentação oficial Google/OpenAI.

## Encerramento
> ✅ 2026-11-02 18:42 UTC — Entrega local revisada e encerrada. Build/postbuild e navegador aprovados; testes A/B/atribuição aprovados na 064. Sem publicação. Relatório registra falhas observadas em produção, que permanecem pendências de deploy e verificação externa, sem serem declaradas corrigidas remotamente. Memória/changelog/plano atualizados; arquitetura técnica sem nova infraestrutura.
