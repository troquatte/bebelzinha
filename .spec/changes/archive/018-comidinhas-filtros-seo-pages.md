# 018-comidinhas-filtros-seo-pages

## Objetivo

Simplificar a experiência de Comidinhas, transformar a ajuda da Bebel em filtros externos reutilizáveis, adicionar carregamento progressivo do catálogo, consolidar SEO/social cards e preparar publicação da SPA no GitHub Pages.

## Escopo

- reorganizar Home de Comidinhas: hero → Minha semana → Guardadas → ajuda da Bebel → filtros/resultados;
- retirar catálogo/resultados de dentro do card guiado;
- remover seção “Explorar” e controles redundantes;
- filtros externos por refeição, tempo e contexto;
- aplicar automaticamente os filtros escolhidos na ajuda da Bebel;
- permitir limpar a busca guiada com “Quero procurar mais...”;
- exibir todas as receitas quando não houver filtro;
- carregar receitas de 10 em 10 conforme scroll;
- microinterações respeitando `prefers-reduced-motion`;
- remover código obsoleto do fluxo de sugestões antigas;
- ajustar speech do hero;
- favicon com a imagem pública da Bebel;
- SEO base + Open Graph + Twitter Card;
- metadata específica para Home, Comidinhas, receitas e Compras;
- assets/fetches compatíveis com base path do GitHub Pages;
- workflow para build/deploy Pages a partir de `main`.

## Decisões

- não adicionar biblioteca de infinite scroll;
- usar scroll incremental simples no browser;
- filtros aceitam uma opção ativa por grupo (refeição, tempo e contexto);
- a ajuda da Bebel apenas configura esses mesmos filtros; os resultados vivem fora do card;
- social image padrão é `images/bebel/bebel-roxa.jpg`;
- páginas atualizam metadata no runtime e o deploy gera shells HTML estáticos para Comidinhas, Compras e cada receita, permitindo cards de compartilhamento específicos sem SSR;
- GitHub Pages usa build com `--base-href /bebelzinha/` e fallback `404.html` para rotas da SPA.

## Critérios de aceite

- [x] Ordem visual segue a referência enviada.
- [x] Card guiado não contém cards de receita nem botões antigos.
- [x] Filtros externos refletem o fluxo guiado.
- [x] Sem filtros, catálogo completo é elegível.
- [x] Primeiros 10 itens aparecem e novos lotes de até 10 são liberados no scroll.
- [x] Código obsoleto de sugestões antigas foi removido.
- [x] Speech não possui `max-width: 11rem`.
- [x] Título base usa hífen simples.
- [x] Favicon e imagem social usam a foto pública da Bebel.
- [x] Metadata muda conforme a página e cada receita possui shell estático no deploy.
- [x] Build/deploy de GitHub Pages preparado.
- [ ] GitHub Pages publicado e URL validada publicamente.
- [x] Build confirmado pelo CI (run 37240089712).

## Risco conhecido

O repositório está privado e atualmente informa `has_pages: false`. A publicação exige que GitHub Pages esteja habilitado no repositório; o conector disponível não expõe a mutação de configuração de Pages/visibilidade. O workflow pode ser preparado e executado após essa configuração.

## Evidência de validação

- GitHub Actions `Build and deploy GitHub Pages` run `37240089712`: build, geração dos shells estáticos e fallback SPA concluídos com sucesso.
