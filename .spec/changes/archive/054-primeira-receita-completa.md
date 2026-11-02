# 054 — Primeira receita completa

## Objetivo/contexto
Entregar uma página SSG de macarrão ao limão com conteúdo conferido, vídeo, checklists persistentes e compras. Usa biblioteca editorial/SEO das specs 051–053. Vídeo confirmado: https://www.youtube.com/watch?v=n-IPzgSmEKc; descrição expandida e transcrição automática conferidas em conjunto. Fonte especifica 1 porção, medidas e técnica, sem tempo total fixo; execução ilustrada e receita não testada pela marca.

## Referências
../../memory/estrutura.md; ../../shared/diretrizes-de-frontend.md; ../../shared/regras-de-nomenclatura.md; ../../../doc/plano-seo-editorial.md; https://angular.dev/guide/ssr.

## Escopo
Publicar uma receita apenas no catálogo/build local, sem deploy. Promover somente macarrão ao limão após reconciliação descrição/transcrição; capa oficial local do mesmo vídeo. Permitir tempos desconhecidos null no contrato e nota de tempo, sem estimativa inventada. Ingrediente água de cozimento participa do preparo mas não da compra (shopping false). Rota /comidinhas/:slug com parâmetros de publicados, fallback Client e 404/noindex para não publicados. Página acessível/mobile reutiliza linguagem visual Bebel; vídeo por ativação com YouTube nocookie e link alternativo. Checkboxes de ingredientes já disponíveis e passos feitos com IDs estáveis, persistência por receita após hidratação, falha de armazenamento tratada. Botão envia só ingredientes que faltam a uma lista reutilizada, sem duplicar ou tocar listas do produto. ShoppingStore obtido somente após ação no navegador (hoje lê localStorage na inicialização). Link na biblioteca por receita publicada, mantendo links YouTube. Não mostrar onboarding sobre a receita direta.

## Fora de escopo
CTA/oferta etapa 5, schema etapa 7, novos vídeos, testes culinários reais, escala de porções sem revisão, mudanças de checkout/campanhas ou deploy.

## Aceite
- [x] AC1: receita corresponde à descrição e transcrição; proveniência e limites registrados; tempos desconhecidos honestos, demais rascunhos preservados.
- [x] AC2: HTML SSG completo, SEO/canonical/imagem próprios, entrada automática no sitemap e na biblioteca; draft/desconhecido 404/noindex.
- [x] AC3: checklists persistem após reload, sem estado pessoal no HTML nem erro de hidratação; teclado/labels e mobile conferidos.
- [x] AC4: compras recebe somente faltantes compráveis, reaproveita lista sem duplicar; vídeo ativa sob clique e possui link externo.
- [x] AC5: build/validações e navegador aprovados; docs/plano/memória atualizados, sem deploy.

## Tasks
- [x] Registrar/revisar spec e fontes da receita.
  > ✅ 2026-11-02 14:12 — Spec revisada e fontes reconciliadas: descrição expandida e transcrição de n-IPzgSmEKc; capa oficial observada no player e inspecionada. Medidas para uma porção concordam. Proveniência registrada, sem alegar teste culinário.
- [x] Adaptar contrato para informação conhecida/desconhecida e preparar publicação revisada local.
  > ✅ 2026-11-02 14:12 — Contrato adaptado a tempos null/timeNote, sourceNote e shopping false. Uma receita promovida somente no catálogo local; demais três seguem draft. Compile e testes de tempos desconhecidos aprovados.
- [x] Implementar rota/página, persistência, vídeo e integração de compras/biblioteca.
  > ✅ 2026-11-02 14:12 — Página criada por Angular CLI, rota dinâmica/getPrerenderParams, vídeo por clique, progresso por ID e lista reaproveitável implementados. Biblioteca ganha link. Onboarding exclui detalhes. Âncoras corrigidas para RouterLink após inspeção identificar resolução para raiz com base href.
- [x] Validar HTML/SEO, checklists/compras, 404, mobile e console.
  > ✅ 2026-11-02 14:12 — Build final aprovado: quatro SSG, seis URLs sitemap; validate-editorial confirma todos os ingredientes/passos/checkboxes, nenhum checked/iframe no HTML inicial. Navegador: ingrediente/passo persistem após reload; envio retorna cinco faltantes sem água/espaguete já marcado; repetição não duplica. Teclado Space funciona. Mobile 390×844 solicitado, largura útil 375 sem overflow; desktop inspecionado. Ativação iframe e link externo conferidos, draft 404/noindex, zero erros de console. Tratamento de storage bloqueado inspecionado, não simulado.
- [x] Revisar diff e atualizar plano, memória e evidências.
  > ✅ 2026-11-02 14:12 — Diff sem alterações em produtos/dinner-plan. Plano, fluxo editorial e memória atualizados; fontes registradas. Sem commit/push/deploy; prévia temporária local em 127.0.0.1:4321 para revisão. Aviso CommonJS e alertas anteriores de dependências seguem manutenção separada.

## Revisão spec
Aceita: contrato não deve exigir inventar minutos; publicação local autorizada pelo pedido. Descrição oficial e transcrição concordam em medidas. Preservar nota de execução ilustrada/não testada. Sem novas dependências. Build autorizado para validar a entrega como nas etapas anteriores.

## Encerramento
Etapa validada localmente em 2026-11-02 14:12. AC1: fontes/proveniência; AC2: build/HTML/sitemap/404; AC3/4: navegador, teclado, persistência e compras; AC5: build e documentação. Sem publicação remota. Próxima etapa: chamada contextual do produto. Nenhuma pendência conhecida dentro deste escopo local.
