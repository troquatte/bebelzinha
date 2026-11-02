# 066-player-leve-modos-e-legibilidade
## Objetivo e contexto
Aplicar quatro correções explícitas do usuário enquanto se conclui a 065: capa/play antes do iframe, modos iguais ao produto, utensílios proporcionais e textos ligeiramente maiores. Referências: ../../shared/diretrizes-de-frontend.md; ../../memory/estrutura.md. Preservar busca/paginação, banner, checklist e fontes.
## Escopo e premissas
Facade usa capa existente e só monta YouTube após ativação de botão acessível; autoplay apenas após clique. Mostrar Só hoje (2 porções) e Hoje + outra refeição (4 no total), promovendo quantidades/passos já pesquisados da variante 2 ao rendimento base, sem nova escala culinária. Preservar referência editorial ao vídeo de uma porção e dados locais antigos sem apagá-los. Tempo de 30min só tinha referência da porção original, portanto não atribuir às duas porções: manter tempo desconhecido com nota. Utensílios por variante com nomes simples; sem ponto e vírgula ou instruções de outra quantidade. Legibilidade aumenta ~1–2px nos textos menores e corpo de receita, sem refazer headings/layout geral.
## Aceite e tasks
- [x] Implementar capa/play sem iframe inicial e validar HTML/renderização após clique.
  > ✅ 2026-11-02 19:17 UTC — Capa local e botão acessível no HTML SSG, zero iframes antes de ativação. Navegador confirmou 0→1 iframe com youtube-nocookie e autoplay apenas após clique, e retorno à capa ao recarregar. Validação editorial agora exige facade em vez de iframe inicial.
- [x] Aplicar modos 2/4 e utensílios dinâmicos com modelo/compilação/editorial/schema coerentes.
  > ✅ 2026-11-02 19:17 UTC — Variante 2 pesquisada promovida a base; seletor somente Só hoje/2 e Hoje + outra refeição/4. Schema, ingredientes e passos coerentes com seleção. Utensílios por variante adicionados ao contrato/compilação, com validação e teste de roundtrip/erro. Navegador confirmou panela/tigela médias em 2 e grandes em 4, 200→400g e recipeYield 2→4. Dados antigos salvos não foram apagados; seleção 1 antiga é ignorada. Fonte do vídeo de 1 porção preservada nas notas editoriais; tempo para 2 não inventado.
- [x] Ajustar legibilidade e validar build, porções, equipamento, checklist e mobile; registrar encerramento junto à 065.
  > ✅ 2026-11-02 19:17 UTC — Textos menores ampliados ~1–2px, corpo de ingredientes/passos 17px, utensílios 16px e lista 16px no modo compacto. Layout de rádio/título alinhado em telas estreitas. Build/postbuild, cinco testes da biblioteca e inspeção desktop/mobile aprovados, sem overflow ou erros de console. Revisão implementation aceita. Sem deploy.
## Revisão spec
Modo spec aprovado, instrução atual substitui seletor 1/2/4 anterior. Quantidades 2/4 já existem revisadas; não afirmar teste culinário realizado. Ajuste de tipo/equipamento restrito ao conteúdo público e controles/legibilidade compartilhados. Sem vídeos novos ou deploy.
## Encerramento
> ✅ 2026-11-02 19:17 UTC — Revisão local concluída. Validações e limites registrados nas tasks. Memória/plano/guia editorial atualizados; sem commit, push ou deploy. Não houve pesquisa OpenSEO nem criação de novos conteúdos.
