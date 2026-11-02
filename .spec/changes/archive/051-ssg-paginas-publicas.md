# 051-ssg-paginas-publicas

## Objetivo
Entregar HTML público com conteúdo real da Bebel antes da execução de JavaScript, preparando a biblioteca para SEO sem alterar fluxos pessoais ou a oferta em teste.

## Contexto Técnico
Angular 22.2.1 instalado, aplicação CSR e hospedagem GitHub Pages. Serviço de canal carrega JSON via fetch relativo; onboarding lê localStorage na inicialização e analytics acessa window. O pós-build gera shells e pode sobrescrever páginas prontas. Referências: Angular SSR/hybrid rendering e hydration, https://angular.dev/guide/ssr e https://angular.dev/guide/hydration.

## Referências de Projeto
- [Produto](../../memory/produto.md)
- [Contexto técnico global](../../memory/contexto-tecnico.md)
- [Estrutura](../../memory/estrutura.md)
- [Plano por etapas](../../../doc/plano-seo-editorial.md)

## Referências Compartilhadas
- [Como executar](../../shared/como-executar.md)
- [Nomenclatura](../../shared/regras-de-nomenclatura.md)
- [Frontend](../../shared/diretrizes-de-frontend.md)

## Escopo e Observações Locais
SSG nas rotas comidinhas, cortadores e wpp-bebelzinha; demais rotas em CSR. Home personalizada e produto com acesso/A-B permanecem CSR por decisão de compatibilidade. Saída estática, sem servidor de produção/Express/backend. Adicionar somente os pacotes oficiais necessários e compatíveis com a versão instalada. Tornar efeitos globais compatíveis com a geração e a hidratação, sem alterar layout/copy. Usar o catálogo local como fonte única de dados de canal durante build e navegador. Preservar shells de rotas existentes sem sobrescrever HTML SSG.

## Fora de escopo
Novo blog, novas receitas, schema Recipe, sitemap e SEO editorial avançado, banners, alteração de URLs/preços/campanhas/acesso, OpenSEO, publicação/deploy, atualização ampla de dependências e testes unitários. O documento SDD-CHATGPT.md é um prompt não invocado nesta solicitação: esta entrega local não presume autorização de push/merge/deploy.

## Critérios de aceite
- [x] AC1: build produz HTML com headings/conteúdo nas três rotas públicas previstas; catálogo de vídeos não depende de fetch em runtime para aparecer.
- [x] AC2: rotas pessoais/produto permanecem CSR; HTML estático não contém conteúdo do jantar pago nem estado pessoal.
- [x] AC3: rastreamento não executa no build; onboarding e estado de navegador não causam falha de prerender/hidratação.
- [x] AC4: pós-build preserva os arquivos SSG e mantém fallback e links diretos da aplicação estática.
- [x] AC5: plano por etapas e memória descrevem o estado real, com próximos passos pendentes.

## Tasks
### Tasks — Planejamento
- [x] Registrar plano por etapas e revisar a spec antes da implementação.
  > ✅ 2026-11-02 13:31 — doc/plano-seo-editorial.md e spec 051 registram oito etapas e limites da entrega; revisão spec aceita antes das alterações.
### Tasks — Front-end
- [x] Configurar dependências, bootstrap, hidratação e renderização por rota com output estático.
  > ✅ 2026-11-02 13:31 — Angular 22.2.1 fixado e pacotes oficiais platform-server/ssr adicionados. Bootstrap, rotas e hidratação configurados. ng add encontrou ERESOLVE entre patches; configuração estática manual seguiu documentação oficial, sem Express/force/legacy-peer-deps.
- [x] Adaptar catálogo e efeitos globais de navegador para renderização/hidratação.
  > ✅ 2026-11-02 13:31 — CanalService usa JSON local no build/cliente; AnalyticsService ignora servidor; onboarding usa DOCUMENT e afterNextRender. Build e console do navegador sem falhas de hidratação.
- [x] Preservar arquivos SSG no pós-build e fallback compatível com hospedagem estática.
  > ✅ 2026-11-02 13:31 — generate-pages preserva HTML existente e parte de index.csr.html; workflow usa postbuild único; 404 e raiz conferidos como CSR idêntico ao fallback.
### Tasks — Validação e documentação
- [x] Executar build, inspeção automatizada dos artefatos e verificação de navegação/hidratação possível.
  > ✅ 2026-11-02 13:31 — npm run build concluído com três rotas prerender; validate-prerender aprovado. Navegador confirmou biblioteca, cortadores, canal e navegação para compras; nenhum erro/warn capturado. Sem testes unitários, conforme regra local.
- [x] Revisar implementação, atualizar memória/plano e registrar limitações reais.
  > ✅ 2026-11-02 13:31 — Diff revisado contra AC1–AC5; memória, README e plano atualizados. npm audit: sete alertas registrados para manutenção; aviso CommonJS sweetalert2 não bloqueante. Sem deploy/push/commit.

## Revisão da spec — modo spec
Escopo delimitado à fundação do SSG. Rastreabilidade: tarefas de bootstrap/catálogo atendem AC1/AC2; efeitos globais atendem AC3; pós-build atende AC4; documentação atende AC5. Build e inspeção de HTML são validações proporcionais; sem unitários por orientação do workspace. Áreas com personalização e A/B explicitamente fora do prerender. Revisão aceita para execução local.

## Resultado Esperado
Páginas públicas existentes disponíveis como HTML pré-gerado; aplicação pessoal e oferta atual preservadas; próximos trabalhos ordenados no plano.

## Encerramento
Entrega local validada em 2026-11-02 13:31. Critérios AC1/AC2/AC4: validação automatizada dos artefatos; AC3: build, inspeção dos guards e console/navegação; AC5: plano e memória atualizados. Publicação não realizada. Alertas de dependências registrados como manutenção separada. Spec revisada e encerrada; próxima etapa: SEO técnico.
