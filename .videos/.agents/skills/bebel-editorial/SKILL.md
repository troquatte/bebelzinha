---
name: bebel-editorial
description: Escolher temas coerentes com a Bebel, escrever roteiro e direção de cenas e registrar a ideia na memória editorial, sem gerar mídia ou renderizar.
---

Antes de escrever, leia Persona e escrita em brand/identidade-bebel.md e os textos-fonte ali indicados. Preserve cadência, proximidade e jeito de falar real da Bebel; não basta usar seu nome. Não inventar biografia, sotaque ou bordões. Texto oficial fornecido pelo usuário tem prioridade sobre a síntese operacional.


Receba da central ID existente ou tema/tipo/duração na etapa roteiro. Entregue somente tema, fala, direção inicial e registro editorial; não gerar imagens, áudio, timings finais ou vídeo. Pare para revisão do usuário. Leia cenas:editorial (brand/temas-utilizados.json); siga personalidade, categorias e limites. Tema automático varia categorias recentes e evita repetir ideia/resumo mesmo com título diferente. Considere mídia disponível para reduzir geração. Categoria desconhecida ou tema fora do universo: informe pendência, sem inventar enquadramento. Receitinhas rápidas: ingredientes/quantidades/preparo verificáveis e tempo total realista; não inventar receita ou confundir duração do vídeo com cozimento. Use fontes confiáveis quando precisar conferir fatos.

Roteiro existente completo: reutilize, sem outra produção. Novo: cenas:new --theme "Tema" --seconds N e escreva roteiro.md no caminho retornado. ## Narração contém somente fala, com gancho imediato, situação reconhecível, dica concreta e conclusão curta. Bebel acolhedora, prática e bem-humorada; sem humilhar ou fatos inventados. Duração é estimativa. ## Cenas contém direção, divisão de fala, títulos curtos e assets necessários, separados por camadas. Não inserir tempos finais estimados no lugar de análise do áudio real. Sem abertura; CTA pronto anexado na exportação.

Depois de salvar fala completa: cenas:remember --task ID --category categoria --summary "Ideia curta". Na retomada, reutilizar categoria/resumo do registro para idempotência. Registro existente de outro conteúdo não é sobrescrito. Repetição intencional exige autorização do usuário para --allow-repeat. Memória editorial não controla aprovação/entregas, não precisa de arquivos antigos e não guarda rascunhos. Entregar à central ID, roteiro, categoria e pendência; sem relatório separado. Não chamar as próximas skills por conta própria.


Revisão de escrita em toda produção: narração com frases completas, transições lógicas e pontuação natural. Títulos devem formar uma frase ou ideia clara ao ler as linhas em sequência, preservar contexto e pontuação; não juntar fragmentos desconexos. Leia a fala em sequência antes de salvar. Não usar cortes de linha como substituto de pontuação.


Na etapa roteiro, também gerar legenda.md na mesma pasta ID-tema de roteiro.md: texto da publicação, em tom da Bebel, contextualizando a dica sem promessas novas, com pontuação e até três hashtags pertinentes. Não é transcrição cronometrada nem legenda embutida no vídeo. Não incluir instruções técnicas no texto. Preserve arquivo existente na retomada; revisões do roteiro devem alinhar a legenda. Entregar ambos para revisão do usuário e salvar antes de concluir passo1. A pasta inteira move pela fila, preservando legenda.md; não criar legenda global que sobrescreva outras produções.

Antes de criar a tarefa, consultar brand/temas-utilizados.json: tema e ideia não podem repetir registros anteriores; categoria não pode repetir na rodada atual. Escolher categoria ainda não usada na rodada atual e conferir semelhança de conteúdo, não apenas título. Registrar pelo cenas:remember. Se todas as categorias foram usadas, informar pendência; não limpar histórico, reiniciar categorias ou usar --allow-repeat sem autorização específica.

## Formato preferido e conexão com o app

Direção atual: priorizar uma história de transformação completa, com uma única receita ou problema específico. Ingrediente → preparo → mudança de estado → resultado. Listas são opcionais e só entram quando o assunto exigir; nunca forçar três itens, conselhos rasos ou objetos desconexos. Planejar estados antes de escolher assets; referências visuais não substituem a verificação da receita.

O tema deve resolver uma necessidade concreta do universo doméstico da Bebel. A ligação direta com o app é opcional; pode ficar somente no CTA. Não forçar organização, lista de compras ou planejamento em toda dica. Consultar apenas os trechos pertinentes de ../.spec/memory/produto.md, fonte do produto; se uma função for citada diretamente, conferir sua implementação ou especificação vigente. Pontes atuais: Comidinhas e receitas salvas para decidir refeições; Lista de compras para anotar e marcar itens ou enviar ingredientes; Minha Semana para planejar receitas por dia e preparar a lista com revisão. Quando houver conexão natural, indicar em ## Cenas a função pertinente do app, sem narrar instruções técnicas.

Entregar valor primeiro e conectar o tema à função pertinente, sem adicionar uma chamada promocional antes do encerramento anexado. Exemplo: três passos para organizar as refeições da semana → planejar em Minha Semana e revisar os ingredientes para a lista. Manter o universo doméstico da persona e evitar propaganda forçada e promessas de funcionalidades inexistentes, como controle automático de estoque, validade, preços ou economia garantida. Não inventar URL, oferta ou entrega automática após o comentário. Manter tema, ideia e categoria inéditos conforme a memória editorial; o formato de lista pode se repetir.

Listas numeradas: escrever primeira linha no formato N. Texto. O renderer destaca N num círculo coral, à esquerda das duas linhas de texto branco Roboto alinhado à esquerda, com sombra para contraste sobre a cozinha. Cada linha fica em sua própria caixa roxa translúcida com borda iluminada e reflexo de vidro lento; número aparece uma vez, com entrada/saída suaves e linhas em cascata. Referência do usuário é somente disposição visual; não copiar fundo branco da imagem para o vídeo. Títulos não numerados conservam o estilo existente.

Cenários podem mudar entre cenas quando a narrativa justificar. Escolher fundo coerente no banco, com vídeo de mesmo nome-base prioritário; preservar identidade, enquadramento e legibilidade. Fazer transição suave, sem zoom artificial ou cortes bruscos, sem trocar apenas para criar movimento. Se faltar cenário essencial, resolver na etapa de mídia com referências adequadas.

CTA final: não gerar convite, cena, texto ou áudio de CTA no roteiro do miolo. Encerrar a dica naturalmente. O motor anexa automaticamente o MP4 de brand/miolo.json, endingClip, antes de promover a exportação. Arquivo obrigatório: assets/cta/prontos/reutilizavel/encerramento-04s.mp4. Miolo em1.2x; CTA e sua voz em velocidade natural, uma única vez. Se ausente, bloquear com caminho exato. Não regenerar o CTA nem duplicar sua fala.
Revisão obrigatória de títulos: ler as linhas em sequência; formar frases completas, preservar sujeito/ação e pontuação, sem fragmentos desconexos. Título resume o trecho narrado e se conecta ao anterior. Ritmo com mudanças nos momentos da fala e pequenas antecipações dos itens; não aumentar velocidade para mascarar falta de ação, nem deixar títulos reaparecerem sem necessidade.

Profundidade editorial: evitar conselhos óbvios sem explicar como aplicar. Cada item precisa trazer ação concreta, exemplo ou quantidade quando pertinente, e o motivo/critério de resultado. Em receita, conferir fonte real, proporções, sequência e ponto; não prometer tempo total não verificado. Gancho apresenta um problema específico e a conclusão entrega solução verificável. A utilidade é a solução concreta apresentada; a conexão com o app pode ficar exclusivamente no CTA pronto.

Encerramento único: o miolo termina assim que entrega a dica ou receita. Não acrescentar chamada narrada ao app, convite para comentar, tela promocional ou frase de encerramento redundante. A conexão com a Bebelzinha vem do tema e da utilidade; quando o CTA pronto já apresenta o app, não repetir essa apresentação no miolo. Anexar somente uma vez o vídeo de endingClip, com imagem e áudio completos. Não usar o antigo CTA gerado por texto/narração. Em revisões, cortar a reprodução apenas após a última instrução útil, preservando o áudio original.

Fonte culinária preferida pelo usuário: Panelinha (https://panelinha.com.br/). Para receitinhas, buscar primeiro uma receita pertinente nesse site e conferir ingredientes, quantidades, sequência e ponto na página real. Adaptar a narração à persona da Bebel, sem copiar o texto integral; registrar o link específico em roteiro.md. Não supor que a receita existe no catálogo do app. Se a fonte não atender, consultar outra fonte confiável e indicar qual foi usada.

Rodadas editoriais: brand/temas-utilizados.json, editorial.categoryRound indica a rodada atual; registros antigos sem round pertencem à rodada1. Não repetir categoria dentro da rodada atual, nem tema/ideia em qualquer rodada. A rodada2 foi autorizada pelo usuário; não apagar o histórico. Nova rodada posterior exige autorização quando todas as categorias da atual estiverem usadas.

Planejamento por retenção: apresentar curiosidade ou promessa concreta no gancho, demonstrar as etapas essenciais e recompensar com resultado visível. Duração acompanha a entrega; receita pode precisar de25–45s. Não cortar etapas para atingir18s. A referência atual usa Bebel atrás do prato durante todo o preparo. Comparar desempenho após publicação sem prometer alcance.


Padrão atual: consultar brand/formato-reels-bebel.md uma vez por produção; referência principal é a produção011, convertido-0003. Essa orientação prevalece sobre o teste da alface, closes sem personagem e duração rígida antiga. Manter as travas e o CTA curto definido em brand/miolo.json.


## Revisão contra conteúdo vago — antes de registrar ou gerar mídia
- Escolher um problema específico e reconhecível, com objeto/situação definidos. “Organize a cozinha” não é tema suficiente; “O molho escorre e não gruda no macarrão?” delimita um problema (exemplo, não autorização para repetir tema usado).
- Entregar uma ação demonstrável: como fazer, detalhe decisivo e motivo ou sinal observável do resultado. Quantidades, tempos e critérios só quando pertinentes e verificáveis; não inventar precisão para parecer útil.
- Rejeitar roteiro cuja única entrega seja “leia a receita”, “separe ingredientes”, “faça uma lista”, “planeje” ou “evite desperdício”. Essas ações podem apoiar a dica, mas precisam de aplicação específica que ensine algo além do conselho genérico.
- Conferir mentalmente: o que a pessoa fará diferente hoje, como fará e como reconhecerá o resultado? Se o roteiro não responder, reescrever autonomamente antes de registrar a ideia ou gerar áudio/imagens. Sem relatório, nota automática ou etapa extra de aprovação.
- Planejar imagem/ação para cada instrução: problema → ação → resultado. Não aceitar uma sequência em que só as frases mudam sobre os mesmos objetos. Usar camadas/bancos existentes; se faltar material essencial, escolher outro tema viável ou informar a pendência, sem substituir por conselho vago.
- Uma dica bem explicada é preferível a três itens rasos. Listas são opcionais; não adicionar passos nem frases de encerramento para preencher duração. Títulos resumem ações reais, com frases completas e conectadas.
- Conferir fatos culinários na fonte quando necessário. Preservar a persona e a memória de temas/categorias; não prometer economia, conservação ou resultado garantidos. App pode aparecer apenas no CTA.

## Coerência narrativa antes de gerar voz
Escolher a dúvida e a solução antes dos assets. Não construir a dica juntando objetos disponíveis. Todo exemplo, frase e cena precisa explicar o mesmo problema e levar ao mesmo resultado; ingredientes sem relação entre si não formam uma receita nem uma história. Se uma frase puder ser removida ou trocada por conselho de outro tema sem mudar a conclusão, cortar ou reescrever. Ler a narração inteira: gancho faz uma pergunta/promessa específica, desenvolvimento responde com mecanismo e ação, conclusão fecha essa mesma dúvida. A conclusão não pode trazer uma moral genérica ou um assunto novo. Rejeitar listas de tarefas banais disfarçadas de dica; demonstrar a solução, não apenas os substantivos narrados. Conferir fontes e viabilidade visual antes de reservar/gastar com áudio. Esta revisão é interna, sem relatórios ou aprovação extra.

