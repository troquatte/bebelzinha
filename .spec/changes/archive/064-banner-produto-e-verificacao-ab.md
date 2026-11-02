# 064-banner-produto-e-verificacao-ab
## Objetivo e contexto
Aplicar referência visual do usuário no banner da receita e esclarecer comportamento atual do A/B. Continuação da 063; manter copy explícita, preço/configuração, CTA para oferta e origem validados. Referências: ../../memory/produto.md, ../../memory/estrutura.md e ../../shared/diretrizes-de-frontend.md.
## Escopo, premissas e aceite
Banner roxo, foto existente de frango/arroz, retrato canônico, selo 22 e CTA laranja. Largura inteira após ficha/compras no desktop; texto/imagem empilhados no mobile. Sem segundo h1, imagens identificadas como ilustrativas, sem inventar garantia/depoimentos. Fontes dimensionadas ao banner como exceção visual explícita. Sem novas mídias/dependências. Manter impressão sem banner e preservação de checklist.
Verificar as variantes A/B e checkout SCK, sem alterar experimento/redirecionamentos: hoje seleção é feita dentro de ProductsComponent, URL permanece; rotas dedicadas/ab forçam prévia. Não confundir teste de código com distribuição real de tráfego ou experimento estatístico concluído. Sem deploy.
## Tasks
- [x] Implementar banner fiel à referência com copy já pedida e responsividade.
  > ✅ 2026-11-02 18:42 UTC — Banner roxo em largura inteira abaixo de ficha/compras, foto de prato e retrato existentes, selo 22 e botão laranja, copy preservada. Desktop em duas colunas, mobile empilhado e sem overflow; imagem ilustrativa identificada e banner oculto para impressão. Posição mudou conforme referência posterior do usuário.
- [x] Validar A/B existente, build/SEO e apresentação desktop/mobile.
  > ✅ 2026-11-02 18:42 UTC — Build/postbuild aprovados, sete testes focados passaram (A/B e atribuição). Navegador conferiu rotas A/B e SCK a/b, ambas noindex; URL principal mantém B sem redirecionar. Banner inspecionado em desktop/mobile, 375px sem overflow. Mecanismo não equivale a estatística de tráfego real.
- [x] Revisar, registrar diferenças de produção e encerrar entregas locais relacionadas.
  > ✅ 2026-11-02 18:42 UTC — Revisão implementation aprovada. Relatório de produção e decisões permanentes registrados; fontes/preço/campanhas preservados. As correções existem localmente, produção antiga ainda requer publicação; sem commit/push/deploy.
## Revisão spec
Modo spec aprovado. Layout muda por solicitação explícita, sem mudar oferta/preço. Auditoria A/B somente explicativa e testes, não modifica distribuição ou URL. Preservar correções de indexação e ausência de onboarding.
## Encerramento
> ✅ 2026-11-02 18:42 UTC — Entrega local revisada e encerrada. Build/postbuild e navegador aprovados; testes A/B/atribuição aprovados na 064. Sem publicação. Relatório registra falhas observadas em produção, que permanecem pendências de deploy e verificação externa, sem serem declaradas corrigidas remotamente. Memória/changelog/plano atualizados; arquitetura técnica sem nova infraestrutura.
