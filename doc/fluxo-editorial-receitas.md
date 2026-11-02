# Biblioteca editorial de receitas

## Fontes e destinos
- content/editorial/index.json: versão do contrato, categorias e entradas com id, slug, status e arquivo. É a fonte do fluxo; não editar o pacote derivado.
- content/editorial/recipes: pautas/receitas autorais, fora da pasta pública. Há quatro rascunhos com vínculo aos vídeos longos conhecidos, sem medidas ou datas inventadas.
- content/editorial/legacy: 21 receitas antigas intactas e inventário de revisão. Não são publicações e active antigo não é aprovação. Comparação de hashes com Git confirmou preservação dos 21 arquivos.
- public/content/canal/index.json: metadados dos vídeos e Shorts, separados das receitas. Um vídeo pode continuar na biblioteca de vídeos sem receita publicada.
- public/content/editorial/recipes.json: pacote derivado somente de receitas published válidas. Gerado antes de npm run build/start/watch; ignorado no Git. CI faz prebuild antes de compilar Angular. Não contém revisão, notas internas, drafts ou legados.
- src/app/modules/dinner-plan/data e modules/products/data: catálogo e oferta do produto pago, independentes; nenhum é fonte do compilador editorial.

## Contrato de receita
ID estável, slug em kebab-case, título próprio, descrição, introdução, categorias e videoId de um vídeo longo existente. Imagem local com texto alternativo. publishedAt/updatedAt em UTC (YYYY-MM-DDTHH:mm:ssZ), sem datas futuras; updatedAt não pode preceder publicação/revisão. SEO com título e descrição próprios.

O corpo recipe contém yield (servings inteiro positivo e unit), times (prepMinutes, cookMinutes e totalMinutes; campos desconhecidos ficam null e total desconhecido exige timeNote, sem estimar por suposição), ingredients e steps. Ingredientes têm id estável, name, quantity numérica positiva, unit e note/section opcionais. Para a gosto, quantity é null e unit é a gosto. Passos têm id estável, text e section opcional. IDs alimentam marcações de checklist na etapa 4 e não devem depender da posição no array. Não confundir o tempo de preparo legado com o tempo total sem conferir a receita.

Revisão: review.status approved, reviewer identificado e reviewedAt confiável para publicar. O registro significa que conteúdo, vídeo, medidas e direitos de imagem foram conferidos; a validação estrutural não executa essa revisão culinária. A ferramenta não inventa aprovação.

## Estados
draft permite campos culinários/SEO ainda nulos e não é distribuído. published exige todos os dados e revisão. archived mantém a fonte e a reserva do slug, mas sai do pacote. Nunca promover pelo active legado. Slugs e vínculos a vídeos são únicos, inclusive nos drafts/arquivados. Não mudar um slug já publicado sem plano explícito de redirecionamento. Slugs do legado ficam reservados até verificar equivalência; nomes parecidos não provam que são a mesma receita.

## Categorias e navegação
Pratos do dia a dia, Massas, Receitas de forno, Doces e Lanches. Uma receita pode ter mais de uma categoria. Os seletores recipeBySlug, recipeForVideo, recipesByCategory e publishedCategories ficam em modules/meals/helpers/recipe-library.ts e recebem somente publicados. Categorias sem receitas publicadas não devem gerar páginas vazias. URLs de receita seguem /comidinhas/<slug>/, preservando /comidinhas/ como biblioteca e todos os links YouTube atuais. A interface da biblioteca/filtros será conectada quando a primeira receita completa existir; não mostrar cards fictícios agora.

## Publicar nas próximas etapas
1. Conferir o vídeo longo e preencher a fonte com medidas, preparo, rendimento, tempos e imagem reais. Revisar também a cobertura de ingredientes em todos os passos; checagem semântica não é automática.
2. Registrar revisão e datas confiáveis e alterar status no manifesto para published. Mudança de status sozinha não cria uma página.
3. Na etapa 4, implementar a rota /comidinhas/:slug e getPrerenderParams consumindo publishedRecipeParams; usar o mesmo catálogo no componente e no build. Slug não publicado retorna 404/noindex. SeoService usa o SEO da receita e recipePath.
4. npm run build executa prebuild editorial, Angular/SSG, sitemap/robots e validações. Publicação sem HTML SSG correspondente, título/vídeo/metadados ou sitemap interrompe o build. Portanto, promover um rascunho antes da etapa 4 falha com segurança, sem produzir uma entrega incompleta.
5. Publicar a saída validada pelo fluxo normal. Não houve deploy nesta etapa. Após alterações no conteúdo durante npm start/watch, reiniciar o comando para regenerar o pacote; build de publicação sempre regenera automaticamente.

Shorts não criam receitas ou páginas. Só podem apontar para receita existente quando houver correspondência editorial confirmada, sem deduzir pelo título. CTA do produto e marcação Recipe/VideoObject permanecem nas etapas próprias.

## Revisão do legado
Consultar doc/inventario-receitas.md e o inventário estruturado. Não copiar a receita de arroz com frango para o vídeo de arroz com legumes. Não preencher açúcar/fermento do bolo de cenoura por suposição. Ingredientes e técnicas devem ser extraídos/conferidos com as fontes da produção.

## Verificações
validate-editorial testa draft/published/archived em memória, duplicados, IDs ausentes, travessia de caminho, Short/vídeo desconhecido, categoria, quantidade, data futura, revisão e SEO. O pós-build verifica exclusão de fontes da distribuição, igualdade do pacote gerado e cobertura de páginas. A etapa atual tem zero receitas publicadas e quatro rascunhos; SSG/sitemap existentes seguem válidos. Não há schema Recipe nem página completa nesta etapa.

## Primeira página implementada — spec 054
A rota /comidinhas/:slug e getPrerenderParams já usam somente publishedRecipeParams. Slugs não publicados renderizam NotFound/noindex. A biblioteca apresenta as receitas completas publicadas, além dos vídeos existentes.

RecipePage usa IDs estáveis de ingrediente/passo; estado salvo após hidratação em bebel.public-recipe.v1:<id>. Check significa ingrediente já disponível ou passo concluído. Somente faltantes com shopping diferente de false vão à lista; água de cozimento fica fora. ShoppingStore é obtido apenas na ação de adicionar, evitando localStorage durante SSG. A lista é reaproveitada e addItemsIfMissing evita duplicar. Não há sincronização automática de compra concluída com o checklist da receita. Falha de armazenamento mantém uso na visita; esse tratamento foi inspecionado em código, sem simular bloqueio do navegador.

sourceNote opcional mantém a informação de execução ilustrada/não testada. O primeiro vídeo não informa minutos fixos; todos os tempos ficaram null e a página orienta seguir a embalagem. A revisão documental não equivale a teste culinário.

O vídeo usa capa local e iframe youtube-nocookie somente após clique; há link externo alternativo. A receita pública não exibe onboarding. Os atalhos usam RouterLink com fragment para respeitar o base href. Estado inicial SSG não contém marcações; validate-editorial exige todos os ingredientes, passos e checkboxes, e nenhum iframe/checked inicial.

Estado desta entrega: uma receita no catálogo local (macarrão ao limão), três drafts; sem deploy. Fontes em content/editorial/sources/macarrao-ao-limao.md.

## Ficha pesquisada e porções — spec 055
Publicações exigem sources com title, url HTTPS e role para explicar o que cada referência sustenta. Fontes são mostradas no HTML SSG. Equipamentos e dicas entram em recipe.equipment/recipe.tips; o pacote público usa lista explícita de campos e preserva notas internas fora da distribuição.

recipe.portions oferece escolhas revisadas, cada uma com servings, note, ingredientOverrides e stepOverrides por IDs existentes. Não usar multiplicação cega de toda a ficha: água, sal, reserva e etapas numéricas precisam de adaptação própria. O compilador rejeita porções duplicadas/sem base, IDs inexistentes, unidades/notas/quantidades inválidas e fontes não HTTPS ou ausentes.

A primeira receita tem 1/2/4 porções; base conferida no Panelinha e GNT, com técnica de cozimento Barilla. Cerca de 30 minutos é referência de planejamento da base no GNT, não teste cronometrado da Bebel. Para 2/4, quantidades de massa/molho são proporcionais e tempos não são multiplicados. Água 2L para 1/2 e 4L para 4 preserva a base e a referência técnica de aproximadamente 1L/100g na ampliação; sal mantém a concentração original. Porções ampliadas não foram testadas em cozinha, indicado na página.

Seleção fica em bebel.public-recipe.portion.v1:<id>; progresso e lista usam bebel.public-recipe.v1:<id>:<servings>. A porção-base ainda lê o estado antigo sem sufixo quando o novo não existe. Trocar porções não reaproveita uma lista com quantidades diferentes; voltar restaura a marcação daquela porção. As instruções do preparo e notas de limão/reserva também mudam. A compra recebe as medidas selecionadas; repetição não duplica.

## Apresentação alinhada ao produto — spec 056
A referência visual agora é a página de uso do Refeição Resolvida. Ingredientes ficam numerados no card da receita; marcações de compra ficam no card de compras pelo ShoppingChecklist existente. Passos mantêm IDs/persistência e números circulares do produto. Vídeo, utensílios, dicas adicionais e fontes são recolhíveis. DinnerActions oferece impressão e salto compras/topo. A fonte SCSS é compartilhada; fundo público é neutro/liso. Não há lista de dias ou conservação fictícia na receita individual. Conteúdo pesquisado e escolhas de porção foram mantidos.

## Correção posterior — spec 057
Referência publicada do produto inspecionada no navegador. Player único agora fica no lugar da capa, no topo do card antes do título, sem autoplay. Removida seção separada de vídeo. Esta decisão substitui a estratégia anterior de ativação por disclosure. Compras mantém switch do produto e preparo mantém checkbox numerado. Fundo neutro e fonte SCSS compartilhada preservados. Build e visual desktop/mobile aprovados, prévia local ?revisao=057, sem deploy.

## Preferências posteriores — spec 058
Canvas bege liso em todas as páginas, inclusive produto, com contraste do header ajustado. Receita volta a ter sidebar no desktop; no mobile não há sidebar/menu inferior do app, somente ações da receita. Botão de adicionar faltantes, link de abrir lista e método de transferência foram removidos; checklist local e listas já existentes preservados. O parágrafo sourceNote não é mais exibido; fontes e proveniência permanecem nos dados. Esta decisão substitui as descrições anteriores sobre transferência e ausência de sidebar desktop.

## Apresentação da biblioteca
Comidinhas apresenta somente as receitas do blog, por preferência posterior do usuário (063). Receitas públicas são agrupadas pelas categoryIds já revisadas; só categorias com publicados aparecem. Um post pode aparecer em mais de um grupo se tiver múltiplas categorias. Não é necessário criar páginas vazias por categoria. Vídeo longo é fonte/player dentro da receita, sem listagem independente na biblioteca. Shorts permanecem no acervo do canal, sem exibição na biblioteca.

## Navegação e preparo — 065/066
Biblioteca usa busca por prato/ingrediente, categorias publicadas e 12 receitas por página, com ordenação estável e sem duplicar receitas por categoria. Links numerados/Anterior/Próxima têm href e caminhos próprios; SSG gera páginas 2..N automaticamente conforme publicados. Atualmente há 1 receita, portanto não aparece navegação para uma página 2 vazia. Busca/filtro usam q/categoria; a seleção é compartilhável e restaurada por voltar/recarregar, e combinações são noindex no navegador com canonical sem query.
Limite: hospedagem estática entrega HTML base para queries, filtros funcionam após hidratação; todas as receitas continuam descobertas nas páginas não filtradas/sitemap. Catálogo completo continua no bundle; dividir os dados em arquivos resumidos/detalhados pode ser necessário antes de chegar a milhares de receitas. Não criar dados fictícios para preencher páginas.
A ficha abre com capa e play sem carregar iframe YouTube. Macarrão tem base 2 e modo extra 4, mantendo medidas/execução previamente revisadas; equipment opcional por RecipePortion acompanha seleção. Adicionar utensílios correspondentes ao editar novos modos. Vídeo-base de uma porção não comprova execução das variantes.
