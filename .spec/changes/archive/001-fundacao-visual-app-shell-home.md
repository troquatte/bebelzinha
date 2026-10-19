# 001-fundacao-visual-app-shell-home

## Objetivo

Criar a primeira fundação visual navegável da Bebel para que a pessoa encontre uma experiência com sensação de aplicativo, usando navegação inferior no mobile, navegação lateral no desktop e uma Home simples como ponto inicial.

## Contexto

O projeto ainda possui apenas a estrutura inicial do Angular, sem rotas funcionais ou shell visual. Esta mudança cria a base de layout sobre a qual as próximas features serão adicionadas, sem antecipar os módulos de negócio.

## Contexto Técnico

- Aplicação Angular 22 SPA e Standalone Components.
- A experiência principal é mobile first.
- A implementação deve utilizar apenas dependências já instaladas.
- A estrutura deve permanecer simples e incremental.
- O design deve seguir as diretrizes em [Diretrizes de frontend](../shared/diretrizes-de-frontend.md).

## Referências de Projeto

- [Produto](../memory/produto.md)
- [Contexto técnico global](../memory/contexto-tecnico.md)
- [Estrutura do projeto](../memory/estrutura.md)

## Referências Compartilhadas

- [Como executar](../shared/como-executar.md)
- [Regras de nomenclatura](../shared/regras-de-nomenclatura.md)
- [Diretrizes de frontend](../shared/diretrizes-de-frontend.md)

## Escopo

- criar um app shell responsivo;
- exibir navegação fixa inferior no mobile;
- exibir navegação lateral no desktop;
- criar rota inicial para a Home;
- criar uma Home simples com identidade inicial da Bebel;
- prever visualmente áreas futuras na navegação sem implementar suas funcionalidades;
- manter acessibilidade básica e estados de navegação claros.

## Fora de escopo

- lista de compras;
- receitas;
- comidinhas da semana;
- organização da casa;
- lojinha/afiliados;
- gamificação;
- autenticação;
- persistência;
- backend;
- banco de dados;
- IA;
- PWA;
- navegação funcional para módulos que ainda não existem.

## Premissas

- a Home será a única rota funcional nesta entrega;
- itens futuros poderão aparecer na navegação com estado indisponível/“em breve”, sem criar rotas falsas;
- a identidade inicial usará a direção já documentada do produto: roxo/lilás, visual acolhedor, cards amigáveis e boa legibilidade;
- não será adicionada nova biblioteca de ícones; serão usados elementos simples e acessíveis com os recursos já disponíveis.

## Restrições

- nenhuma nova dependência;
- nenhuma mudança de arquitetura fora da fundação visual necessária;
- nenhuma feature futura deve ser simulada como funcional;
- a interface deve funcionar bem em celular e desktop.

## Dependências

- Angular Router;
- SCSS/CSS já configurados no projeto;
- Angular 22 existente.

## Critérios de aceite

- [ ] Dado que a aplicação é aberta em viewport mobile, quando a Home é exibida, então a navegação principal aparece fixa na parte inferior sem cobrir o conteúdo principal.
- [ ] Dado que a aplicação é aberta em viewport desktop, quando a Home é exibida, então a navegação principal aparece em barra lateral e a navegação inferior não é exibida.
- [ ] Dado que o usuário abre a raiz da aplicação, quando o roteamento é resolvido, então a Home da Bebel é apresentada.
- [ ] Dado que módulos futuros ainda não fazem parte do escopo, quando o usuário visualiza a navegação, então esses itens são identificáveis como indisponíveis e não levam a telas vazias.
- [ ] Dado que a Home é exibida, quando o usuário lê o conteúdo inicial, então encontra a identidade Bebel e uma mensagem coerente com organização prática da vida doméstica.
- [ ] Dado que a interface é utilizada por teclado ou tecnologia assistiva básica, quando os elementos de navegação recebem foco, então possuem rótulos e estados compreensíveis.
- [ ] Dado que o código da entrega é revisado, quando comparado ao escopo, então não existem implementações dos módulos de compras, receitas ou casa.

## Solução proposta

Criar um shell standalone responsável apenas pela composição visual da aplicação e um componente standalone de Home carregado pelo Angular Router. O shell oferece duas representações da mesma navegação: bottom navigation em telas pequenas e sidebar em telas maiores. Somente “Início” é navegável nesta versão; os demais itens permanecem visualmente desabilitados com indicação “em breve”.

A Home apresenta uma saudação da Bebel, uma frase de valor e cards de descoberta das áreas futuras sem executar ações de negócio.

## Tasks

### Tasks - Front-end

- [x] Criar o app shell responsivo com conteúdo principal, navegação mobile inferior e navegação desktop lateral.
  > ✅ 2026-10-04 15:16 — Shell implementado em `src/app/app.html` e `src/app/app.scss`, com bottom navigation abaixo de 52rem e sidebar a partir de 52rem. O conteúdo principal possui espaço inferior no mobile para não ficar encoberto pela navegação.
- [x] Configurar a rota inicial e criar a Home standalone da Bebel.
  > ✅ 2026-10-04 15:16 — Rota raiz configurada em `src/app/app.routes.ts` com carregamento lazy da Home standalone em `src/app/modules/home/` e fallback de rota desconhecida para a raiz.
- [x] Implementar a identidade visual inicial, responsividade, foco e estados acessíveis sem novas dependências.
  > ✅ 2026-10-04 15:16 — Identidade inicial em roxo/lilás, cards acolhedores, estados `aria-disabled`, `aria-current`, labels acessíveis e foco visível implementados. `src/index.html` também foi ajustado para `pt-BR`, descrição e `theme-color`. Nenhuma dependência foi adicionada.
- [~] Atualizar os testes existentes para refletir a nova fundação e cobrir a renderização básica do shell/Home.
  > 🧪 2026-10-04 15:16 — Testes atualizados em `src/app/app.spec.ts` e criado `src/app/modules/home/home.component.spec.ts`. Implementação concluída, mas a execução da suíte ainda não foi confirmada.

### Tasks - Validação

- [x] Revisar a implementação contra os critérios de aceite e verificar imports, rotas, responsividade declarada e ausência de features fora do escopo.
  > ✅ 2026-10-04 15:16 — Revisão estática concluída comparando `main...feat/app-shell-home`: 12 arquivos alterados, sem novas dependências, sem backend/persistência e sem implementação funcional dos módulos futuros. Imports, rota raiz, fallback, estados de navegação e media queries foram inspecionados.
- [~] Validar build e testes automatizados com `npm run build` e `npm test -- --watch=false` quando houver ambiente de execução disponível.
  > 🧪 2026-10-04 15:16 — Validação de runtime não executada pelo conector do repositório. Pendente confirmação com `npm run build` e `npm test -- --watch=false`.

## Riscos

- a identidade visual ainda é inicial e poderá evoluir quando houver referências finais de UI;
- itens futuros na navegação podem parecer clicáveis se o estado indisponível não estiver suficientemente claro;
- como a validação visual completa depende de execução em navegador, parte da validação poderá permanecer pendente até teste local.

## Resultado Esperado

- aplicação abre diretamente na Home;
- mobile possui navegação inferior;
- desktop possui navegação lateral;
- shell e Home já comunicam a personalidade Bebel;
- módulos futuros aparecem somente como orientação visual, sem implementação;
- a base fica pronta para receber próximas specs sem acoplamento desnecessário.

## Encerramento

Esta spec termina apenas quando todos os itens estiverem marcados e com evidência registrada, no formato definido em [Como executar](../shared/como-executar.md).
