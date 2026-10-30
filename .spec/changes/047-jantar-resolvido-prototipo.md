# 047 — Jantar Resolvido: protótipo funcional

## Objetivo
Validar a experiência no app existente antes de produzir o pacote de R$27 com22 jantares para2 pessoas. Rota `/jantar-resolvido`, três dias reais de demonstração e sem cadastro, backend, cobrança, bloqueio ou PDF completo fictício.

## Contrato da experiência
- Escolher um dia abre foto, título, pessoas, estimativa de tempo, ingredientes e preparo na mesma página.
- Compras sempre do jantar selecionado; sem seletor semanal e sem botão para abrir receita.
- ShoppingChecklistComponent extraído do carrinho existente e usado nas duas telas. Mantém Falta pegar/Já no carrinho, controles Material e edição/exclusão na tela original.
- DinnerPlanStore reutiliza ShoppingStore; cria uma lista por dia apenas na primeira abertura e guarda seu ID separado. Voltar ao dia recupera marcações. Lista excluída no carrinho pode ser recriada ao reabrir aquele dia. Listas anteriores preservadas.
- localStorage guarda progresso/listas no mesmo aparelho. Sem sincronização ou alegação de proteção de acesso.
- Identidade e tokens existentes; título com escala própria para corresponder ao mockup aprovado. Imagens existentes do app são provisórias; nenhum novo visual gerado. Receitas e estimativas não são apresentadas como testadas.
- PDF aparece como Em preparação; sem botão de download que não entrega arquivo.

## Tasks
- [x] Extrair checklist reutilizável sem perder ações do carrinho atual.
  > ✅ 2026-10-27 — ShoppingChecklistComponent usado pelo carrinho original e pela nova área; edição/exclusão continuam habilitadas na tela original e os controles receberam rótulos acessíveis.
- [x] Criar rota, três dias e estado por dia com receitas abertas.
  > ✅ 2026-10-27 — /jantar-resolvido com3 dias, receitas abertas, listas vinculadas ao ShoppingStore e PDF explicitamente em preparação. Acesso inicial sem montar onboarding antes da navegação.
- [x] Validar isolamento, persistência, recuperação de lista excluída e listas existentes.
  > ✅ 2026-10-27 — 8 testes aprovados em3 arquivos; marcação, troca de dia e reabertura também conferidas no navegador.
- [x] Validar build e apresentação mobile/desktop.
  > ✅ 2026-10-27 — Build de produção e shell estático aprovados. Navegador em320/390/1280px, sem overflow horizontal; desktop em2 colunas. Avisos restantes do build pertencem aos estilos/dependência anteriores. Imagens pequenas existentes são provisórias.

## Entrega
Somente revisão local. Próximos passos após aprovação: validar receitas completas e porções na cozinha, expandir para22 dias e produzir o PDF. Não publicar como produto pronto nesta etapa.


## Revisão visual solicitada em2026-10-27
Cabeçalho de compras alinhado pelo topo, ingredientes numerados, distância explícita entre título e passos do preparo, dica mais compacta. Removidos aviso de marcações salvas, link para Minhas listas e rodapé com PDF/aviso de protótipo conforme os prints do usuário. Persistência e funcionamento do carrinho preservados. Essa remoção visual não valida receitas nem gera o PDF final.


### Revisão de navegação — 28/10/2026
- Atalho Ir para compras usa foco e scrollIntoView, sem fragmento/RouterLink; não muda a URL.
- Água permanece nos ingredientes e é excluída das compras, inclusive na exibição de listas previamente salvas; marcações e listas existentes preservadas.
- Navegação anterior/seletor/próximo com 22 dias; dias 4–22 repetem os três exemplos e são identificados como demonstração. Não representa 22 receitas finais.
- Imagens e pesquisa/validação culinária ficam para a próxima etapa autorizada.

- Revisão: seletor ocupa a largura disponível entre as setas apenas no mobile. Atalho fixo no canto inferior com área reservada ao fim da página e safe-area; troca para Voltar ao topo ao alcançar compras. Usa foco/rolagem sem fragmento de URL.

- Prévia de vídeo: controle nativo details/summary Assistir ao preparo após porções/tempo, abre na mesma receita, sem autoplay ou mídia externa. Ao trocar dia fecha o painel. Área explicitamente demonstrativa até receber vídeo real.

- Vídeo de exemplo autorizado: YouTube cyBR8muoELM via iframe responsivo 16:9 youtube-nocookie, criado somente ao expandir, removido ao fechar/trocar dia; sem autoplay. Identificado como exemplo para não sugerir correspondência às receitas.

- Títulos de compras e grupos reduzidos para 1,25rem somente no Jantar Resolvido. Opção compactHeadings do checklist mantém tipografia original no carrinho do app.

### Prévia do diferencial de rotina
- Blocos Faça a mais (aberto), Guarde para depois e Aproveite os ingredientes após a dica da Bebel; acordeões nativos reiniciam ao trocar de dia.
- Utensílios opcionais em categorias demonstrativas; sem compra, links, recomendações específicas ou novos eventos.
- Sem receitas novas, prazos de conservação ou instruções de congelamento não validadas; sem alterar porções, ingredientes ou compras atuais.

### Três interações do protótipo
- Só hoje / Hoje + outro jantar: quantidades demonstrativas explícitas, listas independentes por dia/modalidade, sem apagar compras antigas. Tempo extra não prometido.
- Seletor exibe Dia + nome do prato.
- Etapas marcáveis e progresso persistidos por dia no aparelho. Preferências usam chave própria; dados anteriores preservados.

- Validação desta revisão: build aprovado; no mobile, extra ajustou frango de 300 g para 600 g nos ingredientes e compras, água continuou fora das compras, retorno ao modo base restaurou 300 g. Passos independentes por dia e persistência após recarregar confirmados. Sem overflow a 390px. Painel de rotina extraído para DinnerRoutineComponent para respeitar limite de estilos por componente.

- Clareza: painel Faça a mais confirma explicitamente 2 porções hoje + 2 depois quando selecionado; modo simples indica outra porção ainda não selecionada. Passos agora mostram checkbox nativo visível e instrução de marcar/desmarcar. Sincronização da escolha verificada no navegador.

### Retomar o jantar e link direto
- URL ?dia=3 abre o dia solicitado; link sem dia ou inválido usa o último dia salvo no aparelho e normaliza a URL.
- Seletor e setas sincronizam dia na URL via Angular Router, preservando outros parâmetros, sem fragmento e sem recarregar página. Usa replaceUrl para evitar histórico a cada troca.
- Compras, modalidade e passos continuam persistidos por dia no navegador. Não depende de backend.

- Escopo da primeira versão: removido o bloco Aproveite os ingredientes e seu estilo exclusivo; mantidos Faça a mais, Guarde para depois e utensílios opcionais.

### Imprimir / Salvar em PDF
- Botão na receita abre impressão nativa do navegador; destino Salvar como PDF depende das opções do aparelho.
- Estilos de impressão locais preservam título, dia, porções selecionadas, ingredientes, preparo, dica e painel de conservação. Removem foto, navegação, vídeo, controles, carrinho e utensílios.
- beforeprint expande painéis de rotina fechados, afterprint restaura; passos impressos completos sem riscado, independente das marcações. Sem gerar documento separado ou duplicar receitas.

- Hierarquia da receita: quantidade antes do vídeo; impressão em ícone acessível junto ao atalho flutuante. Aviso de tempo extra movido para a observação das quantidades. Grupo flutuante oculto na impressão.

- Barra de ações em componente próprio: no mobile ocupa largura total, fundo claro quase opaco, blur sutil, borda e sombra superior; ícone imprimir + ação principal expansível. No desktop fica em caixa flutuante. Espaço final e safe-area preservados; oculta na impressão.

- Desktop: compras acompanha a rolagem com sticky a 1rem do topo; altura limitada ao viewport com espaço para ações inferiores e rolagem interna nas listas longas. Mobile permanece no fluxo normal.

- Correção solicitada: painel lateral com altura natural, sem limite de altura nem rolagem interna; mantém sticky no desktop. Esta decisão substitui a limitação ao viewport anterior.

- Simplificação: removidos título Hoje e nos próximos dias, badge Prévia, acordeão Faça a mais e cartões redundantes. Apenas modalidade extra mostra resumo 2 porções hoje + 2 para guardar. Conservação renomeada Como guardar e reaquecer, ainda com conteúdo demonstrativo e compatível com impressão. Nome comercial permanece em avaliação.

### Dia 1 — ficha pesquisada
- Frango dourado com arroz de cenoura: adaptação própria de técnicas do Panelinha, quantidades explícitas 2/4 porções, 6 passos, utensílios, conservação/refrigeração/congelamento/reaquecimento com fontes CDC/FSA/Health Canada/FoodSafety.gov/Minute Rice. Sem alegar teste culinário, prazo de qualidade específico ainda pendente de teste.
- Tempos estimados 35/45 min: não promete até 30 min sem teste. Vídeo incompatível removido do Dia 1; outros exemplos preservados.
- Foto ilustrativa própria via imagegen: prompt comida de casa, cubos de frango dourado + arroz com cenoura, sem outros acompanhamentos, prato inteiro e luz natural. Arquivo WebP public/images/recipes/frango-arroz-cenoura-v1.webp, original PNG preservado.
- Revisão de conteúdo separa compras e etapas do antigo Dia 1, mantendo listas e marcações anteriores intactas; dias 2–22 continuam exemplos.

- Revisão de voz do Dia1: passos mais curtos, palavras familiares e tom da Bebel; medidas,74°C, prazos e condições de conservação preservados. Separação visual dos ingredientes usa hífen, sem alterar nomes persistidos nem regras de deduplicação do carrinho. Referências seguem recolhidas no final. Passos reordenados possuem revisão própria para não herdar marcações de etapas diferentes.

- Cabeçalho mais compacto: retrato, assinatura Bebelzinha e nome do produto juntos, frase curta em voz da Bebel e divisão sutil antes do seletor. Usa tamanho global dos títulos; reduz espaço vazio e mantém o nome atual. Cabeçalho de impressão preservado.

- Nome confirmado: Refeição Resolvida. Título, metadados e rótulos atualizados para almoço/jantar. Endereço existente preservado para manter os links funcionando; chaves e dados salvos preservados.

- Direção visual aprovada: fundo roxo escuro igual ao título anterior; cabeçalho com h1 branco, assinatura e apoio lilás claro e divisor claro. Cartões claros preservados; impressão segue branca com texto escuro.


## 28/10/2026 - Segunda ficha e variedade

Dia 2 substituído pela ficha pesquisada de carne moída com batata e arroz, com foto ilustrativa própria, modos de 2/4 porções, passos, utensílios e conservação. Preferência por próxima refeição refrigerada devido à textura da batata no congelamento. Plano alternado de 22 dias em research/cardapio-22-refeicoes.md, sem publicar fichas futuras como prontas. Teste culinário e vídeo pendentes.


## 28/10/2026 - Terceira ficha pesquisada

Dia 3: macarrão à bolonhesa do dia a dia. Mantida alternância frango/carne/massa; demais dias seguem demonstrações. Quantidades 2/4 porções, compras sem água, passos marcáveis, utensílios, conservação e foto ilustrativa própria. Fonte de molho rápido separada da receita clássica longa; conservação prioriza massa/molho refrigerados separadamente e congelamento apenas do molho. Teste culinário e vídeo pendentes.


## 28/10/2026 - Quarta ficha pesquisada

Dia 4: omelete de tomate e queijo com arroz, 2/4 porções em omeletes individuais. Foto ilustrativa própria, preparo marcável, compras sem água, utensílios e fontes. Guardar na geladeira para a próxima refeição, até 24 horas por causa do arroz; congelamento sem recomendação antes de teste. Tempo e rendimento estimados, teste culinário e vídeo pendentes.


## 28/10/2026 - Quinta ficha pesquisada

Dia 5: frango em cubos com cenoura, abobrinha e arroz. Quantidades 2/4 porções, passos marcáveis, compras sem água, utensílios, fontes e foto ilustrativa própria. Cozimento de legumes em ordem para preservar textura. Conservação com limite de arroz refrigerado de 24 horas e freezer com qualidade pendente de teste. Vídeo e teste culinário pendentes.


## 28/10/2026 - Sexta ficha pesquisada

Dia 6: lentilha com cenoura e arroz, opção sem carne. Porções 2/4, compras sem água, passos marcáveis, utensílios, conservação e foto ilustrativa própria. Lentilha inteira selecionada/lavada, cozimento em panela comum até ficar macia, arroz em paralelo. Dados antigos preservados por revisão de conteúdo. Teste culinário e vídeo pendentes.


## 28/10/2026 - Dia 6 com linguiça acebolada

Por pedido explícito, prato único arroz/lentilha com cenoura/linguiça acebolada, sem variante vegetariana. Atualizados ingredientes 2/4 porções, preparo, utensílios, tempos estimados, conservação, referências e foto. Classificação do planejamento ajustada. Revisões v2 preservam listas/passos antigos. Teste culinário pendente.


## 28/10/2026 - Sétima ficha pesquisada

Dia 7: sopa de frango com batata, cenoura e abobrinha, numa panela só. Porções 2/4, preparo marcável, compras sem água, utensílios, conservação específica de sopa e foto ilustrativa própria. Geladeira até 2 dias; congelamento sem recomendação antes de teste de textura. Dados antigos preservados por revisão. Teste culinário e vídeo pendentes.


## 28/10/2026 - Oitava ficha pesquisada

Dia 8: carne moída com abóbora cabotiá e arroz, mantendo a alternância de categorias. Porções 2/4, compras sem água, passos marcáveis, utensílios, conservação e foto ilustrativa própria. Quantidades e tempos estimados com teste culinário pendente; vídeo ainda não disponível. Dados antigos preservados por revisão de conteúdo.


## 28/10/2026 - Nona ficha pesquisada

Dia 9: macarrão com frango em cubos e tomate, mantendo a categoria massa após carne. Compras 2/4 porções sem água, preparo marcável, utensílios, conservação e foto ilustrativa própria. Massa e molho extras guardados separadamente; congelamento preferencial só do molho. Teste culinário e vídeo pendentes.


## 28/10/2026 - Décima ficha pesquisada

Dia 10: ovos ao molho de tomate com arroz. Ordem de 10/11 trocada para evitar frango consecutivo após massa com frango do Dia 9. Porções 2/4, compras sem água, preparo marcável, utensílios, conservação e foto ilustrativa própria. Ovos bem cozidos, arroz limita geladeira a 24 horas; congelamento pendente de teste. Tempos/rendimento estimados, teste culinário e vídeo pendentes.


## 28/10/2026 - Couve no Dia 10

Adicionada couve refogada com alho ao prato dos ovos, por aprovação explícita. Atualizados título, descrição, ingredientes 2/4 porções, divisão de alho/óleo, passos, utensílios, conservação, fonte e foto. Tempos estimados 45/55 minutos. Revisão v2 preserva os dados anteriores. Teste culinário pendente.


## 28/10/2026 - Décima primeira ficha pesquisada

Dia 11: frango ensopado com batata e arroz, após ovos do Dia 10. Porções 2/4, compras sem água, passos marcáveis, utensílios, conservação e foto ilustrativa própria. Prioriza próxima refeição refrigerada até 24 horas por causa do arroz, sem recomendar congelamento da batata antes de testar textura. Tempos/rendimento estimados; teste culinário e vídeo pendentes.


## 28/10/2026 - Décima segunda ficha pesquisada

Dia 12: almôndegas caseiras ao molho com arroz. Porções 2/4, compras sem água, modelagem/douramento/cozimento no molho com conferência do centro, utensílios, conservação e foto ilustrativa própria. Mantida alternância após frango do Dia 11. Tempos, liga e rendimento pendentes de teste culinário; vídeo ainda indisponível. Dados antigos preservados por revisão de conteúdo.


## 28/10/2026 - Décima terceira ficha pesquisada

Dia 13: feijão-preto com abóbora e couve, arroz e ovo mexido. Parte de feijão já cozido, explicitamente; tempos não incluem cozimento do grão seco. Porções 2/4, compras sem água, preparo marcável, conservação e foto ilustrativa própria. Ovo acompanha seguindo preferência do usuário por proteína animal no prato. Teste culinário e vídeo pendentes.


## 28/10/2026 - Décima quarta ficha pesquisada

Dia 14: frango desfiado ao molho com polenta instantânea. Inclui cozimento/desfiamento do frango, diferencia polenta instantânea de fubá comum, porções 2/4 e compras sem água. Conservação específica para polenta e molho separados, utensílios, fontes e foto ilustrativa própria. Tempos estimados, teste culinário e vídeo pendentes.


## 28/10/2026 - Décima quinta ficha pesquisada

Dia 15: macarrão com atum em conserva ao molho de tomate. Porções 2/4 com peso drenado explícito, compras sem água, preparo marcável, utensílios, conservação e foto ilustrativa própria. Mantida variedade de proteína após frango do Dia 14. Tempos/rendimento estimados, teste culinário e vídeo pendentes.


## 28/10/2026 - Décima sexta ficha pesquisada

Dia 16: sopa de feijão com macarrão, cenoura e frango desfiado. Parte de feijão já cozido e inclui cozinhar/desfiar frango cru. Porções 2/4, compras sem água, preparo marcável sem liquidificador, conservação e foto ilustrativa própria. Proteína animal incluída segundo preferência expressa. Tempos/rendimento estimados, teste culinário e vídeo pendentes.


## 28/10/2026 - Décima sétima ficha pesquisada

Dia 17: picadinho de coxão mole com cenoura e arroz, após sopa de frango. Porções 2/4, compras sem água, douramento em levas e cozimento até maciez, utensílios, conservação e foto ilustrativa própria. Tempos estimados 50/60 minutos, sem prometer rapidez para cortes que exigem cozimento longo. Teste culinário e vídeo pendentes.


## 28/10/2026 - Décima oitava ficha pesquisada

Dia 18: arroz com ovos mexidos, cenoura e abobrinha. Quantidades 2/4, arroz preparado do zero, legumes ralados, compras sem água, utensílios, conservação e foto ilustrativa própria. Estimativas 35/45 minutos. Geladeira para a próxima refeição; congelamento da mistura pendente de teste. Teste culinário e vídeo pendentes.


## 28/10/2026 - Décima nona ficha pesquisada

Dia 19: estrogonofe de frango com arroz, alternando após ovos. Versão simples com creme de caixinha, sem cogumelos, conhaque ou molho inglês. Porções 2/4, arroz do zero, douramento em levas, frango a 74 °C antes do creme, compras sem água, utensílios, conservação e foto ilustrativa própria. Estimativas 40/50 minutos; teste culinário e vídeo pendentes. Congelamento do molho pendente de teste de textura.


## 28/10/2026 - Vigésima ficha pesquisada

Dia 20: macarrão parafuso com cenoura, pimentão, couve e ovos mexidos, alternando após frango. Ovos incluídos conforme preferência anterior por proteína animal junto dos legumes. Quantidades 2/4, ovos cozidos separadamente antes de misturar, compras sem água, utensílios, conservação e foto ilustrativa própria. Estimativas 35/45 minutos. Teste culinário, textura após guardar e vídeo pendentes.


## 28/10/2026 - Vigésima primeira ficha pesquisada

Dia 21: hambúrguer de patinho com arroz, brócolis e cenoura, alternando após massa. Quantidades 2/4, discos de 150 g e 1,5 cm, carne moída a 71 °C (sem reproduzir ponto malpassado da referência), arroz do zero, compras sem água, utensílios, conservação e foto ilustrativa própria. Estimativas 40/50 minutos. Teste culinário, congelamento e vídeo pendentes.


## 28/10/2026 - Vigésima segunda ficha pesquisada

Dia 22: frango com milho e arroz, após hambúrguer. Cubos de peito, milho em conserva com peso drenado explícito, tomate e caldo leve, sem creme. Porções 2/4, compras sem água, foto própria e conservação. Estimativas 40/50 minutos. Os 22 dias passam a ter fichas pesquisadas; removidos apenas os dados antigos de demonstração do índice, agora uma lista explícita das 22 fichas. Testes culinários e vídeos continuam pendentes.


## 28/10/2026 - Revisão documental das 22 fichas

Pedido: corrigir com fontes e não publicar peso final total. Quantidades base/extra preservadas após conferência aritmética. Panasonic NN-R95B p. 37 confirma existência da proporção 300 g/1 ovo/2 colheres de farinha; isso não valida método adaptado em panela, logo não houve troca arbitrária da fórmula. Ajustadas modelagem, tempo por leva e aviso de não provar massa crua. Estimativas totais revisadas conforme etapas das referências e execução da nossa versão, sem alegar cronômetro medido. Padronizados resfriamento nos dias 1/2/11, feijão recém-cozido nos dias 13/16, sequência da polenta e instrução de maciez do picadinho. Fonte do arroz normalizada. Nenhum peso final total nem volume final de sopa adicionado.
