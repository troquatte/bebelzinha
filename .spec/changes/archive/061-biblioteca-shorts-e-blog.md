# 061-biblioteca-shorts-e-blog

## Objetivo
Organizar Comidinhas em Shorts primeiro e blog de receitas depois, retirando a listagem independente de vídeos longos.

## Contexto Técnico
MealsComponent SSG usa CanalService e catálogo editorial publicado. Preservar vídeos-fonte/dados de produção e player dentro das receitas. Referências: ../../memory/produto.md, ../../memory/contexto-tecnico.md, ../../memory/estrutura.md; ../../shared/diretrizes-de-frontend.md e ../../shared/como-executar.md.

## Observações Locais
Escopo: reorganizar seções; mudar hero/metadados para receitas; blog por categorias editoriais já existentes, exibindo somente categorias com publicados. Reutilizar cards/hero/tokens. Shorts conservam agrupamento e links YouTube reais; não alegar integração de Reels do Instagram inexistente.
Fora de escopo: excluir fontes/vídeos, alterar conteúdo das receitas, criar URLs de categorias vazias, publicar novos posts, campanhas e deploy. Categorias não prometem ganho de ranking. Grupos usam associações já revisadas do editorial; receita pode pertencer a mais de uma categoria.

## Critérios de aceite
HTML SSG contém Shorts antes do blog, sem seção de vídeos longos, links de Shorts/receitas preservados. Blog mostra Massas com receita atual, sem categorias vazias. Hero/metadados descrevem biblioteca; descrição não oferece transferência de compras removida. Mobile/desktop sem overflow da página; navegação abre receita com vídeo e CTA preservados.

## Tasks
- [x] Reorganizar listagem e metadados usando componentes atuais e categorias publicadas.
  > ✅ 2026-11-02 15:13 — MealsComponent passa a listar Shorts antes do blog; seção de longos retirada, fontes/vídeos internos preservados. Grupos editoriais derivados de publicados, sem categorias vazias. Título/description/hero atualizados; removida promessa antiga de transferência da lista. Cards reaproveitados com nomes recipe-grid/recipe-card.
- [x] Atualizar validação SSG para Shorts/blog e conferir build/postbuild.
  > ✅ 2026-11-02 15:13 — Build Angular aprovado (4 rotas). A primeira execução do pós-build detectou uma asserção que exigia barra final em link do Router; ajustada para aceitar os dois formatos exatos sem afrouxar destino. Pós-build completo aprovado, incluindo ordem das seções, cobertura de Shorts/receitas, categorias, sitemap e auditoria SEO. Aviso CommonJS sweetalert2 já existente.
- [x] Validar apresentação desktop/mobile e navegação; revisar e registrar encerramento local.
  > ✅ 2026-11-02 15:13 — Desktop e viewport 390x844 conferidos visualmente; largura útil e scrollWidth ambos 375 no mobile. Ordem Shorts/Receitas completas confirmada; Massas visível, sem longos. Link do blog abriu receita com vídeo, CTA e utensílios preservados; console sem erros, retorno e viewport restaurados. Revisão implementation aprovada; sem deploy.

## Resultado Esperado
Página tem duas áreas claras: vídeos curtos e receitas completas por assunto, sem listagem duplicada de longos.

## Revisão spec
Modo spec: aprovada. Pedido explícito de reorganização, categorização compatível com modelo existente. Sem filtros/URLs novos nem dados inventados; preservar preferências 058 e CTA 060. Alteração reversível, validação por build/DOM/navegador proporcional ao escopo.

## Encerramento
> ✅ 2026-11-02 15:13 — Entrega local revisada, validada e encerrada. Build/pós-build e verificação desktop/mobile aprovados. Changelog/plano/guia editorial atualizados. Contexto técnico e produto sem alteração necessária. Nenhuma pendência conhecida no escopo; sem publicação.
