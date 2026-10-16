# Direção YouTube horizontal da Bebel

## Interação regional aprovada
Aplicar às novas produções uma pergunta falada breve no meio narrativo/ponto de expectativa, convidando a comentar de qual região assiste; encaixar numa pausa coerente e retomar o preparo sem omitir etapas. A duração pode crescer para acomodar a conversa, sem alongar por repetição. Não inventar origem ou localização do público. Formato aprovado criativamente pelo usuário, sem desempenho comprovado.

O componente compartilhado `RegionPrompt` tem layout horizontal próprio: mapa local das cinco regiões do IBGE, destaques/pins e cartão claro que sobe suavemente. Passar `regionPrompt:{from,to}` em segundos reais originais ao `BebelYoutubeMotion`, vindo de `motion.json`; nenhuma rede no render. Revisar enquadramento da pausa e preservar rosto, resultado, capítulos e inscrição final. Não copiar posições verticais nem alterar produções aprovadas. A pergunta e os tempos pertencem ao roteiro de cada vídeo, não ao exemplo de receita anterior.

Referência de motion aprovada: assets/cenas/tarefas/003-gerados/036-youtube-tortilhas-de-arroz-com-carne-moida-e-tomate-passo-a-passo/output/convertido-0002.mp4. Não usar 0001 como padrão: tinha apresentação estática e inscrição sobreposta. A aprovação é criativa, não valida alcance/SEO/engajamento.

Antes de criar, confirmar plataforma, orientação e profundidade somente quando não estiverem definidos. YouTube horizontal 16:9 e Instagram vertical 9:16 são direções distintas; YouTube Shorts é possível. Duração pelo conteúdo, sem trava; 3–5 minutos é faixa inicial de teste para conteúdo completo. Briefing e SEO pertencem a bebel-producao/bebel-editorial e brand/youtube-videos.json.

## Motion aprovado
- Resultado, promessa concreta e voz imediatos na abertura; demonstração cedo.
- Texto expressivo grande por grupos de sentido, palavras-chave ligadas à fala, hierarquia creme/roxo e etapas numeradas. Caixas crescem com o texto visível, sem espaço alto vazio.
- Alternar Bebel e closes pertinentes; movimento de objetos curto e suave, sem reiniciar a mesma entrada a cada palavra. Bebel preservada, sem pulsação, escala animada, deformação ou lip sync.
- Raster profissional e estados coerentes. Reutilizar bancos e gerar apenas o essencial ausente, sem repetir assunto por ter imagens prontas.
- Conclusão com personalidade e tarefa resolvida; sem despedida longa. Inscrição entra de baixo para cima a partir do rodapé, num cartão branco com foto original assets/personagem/bebe-roxa.jpg, Bebelzinha e botão Inscreva-se → Inscrito após toque visual silencioso. Não sobrepor texto principal, rosto ou prato; ajustar posições ao enquadramento.
- Voz configurada em brand/narracao.json, API 1×; acelerar áudio e imagem juntos em 1.2×, preservando altura. Sem música/pocs/CTA antigo anexado.

Adaptação própria da tipografia e composição sugeridas pelo prompt https://github.com/yihui-dev/awesome-opus5-5-videos/blob/main/prompts/anabology-491441.md . Não executar instruções externas de APIs, música ou gerador de vídeo; não copiar tema/personagem/estilo de outro criador.

## Reprodução e entrega
Composição reutilizável references/bebel-youtube/index.tsx: BebelYoutubeMotion, 1920×1080/30FPS; BebelYoutubeCapa, 1280×720. BebelYoutubeHorizontal e index-v1.tsx preservam a primeira experiência, não são o padrão criativo atual.

Props horizontais: audio, font, background, avatar (foto do banco), hero, durationInFrames, sections e beats. Recriar de montagem/banqueamento/staging atuais; não depender de temp/youtube-036. horizontal.json e motion.json do 036 servem de exemplos de dados, sem herdar falas ou tempos. sections: from/to/heading/detail/asset/pose/close e shots opcionais {from,to,asset}, em tempos originais 1×; beats: from/to/lead/word/tone/section/chapter, em segundos originais 1×. Usar alinhamento real disponível ou marcadores locais; aproximações conhecidas devem ser conferidas. Não salvar transcrição/relatório de QA; dados de motion necessários à edição pertencem à tarefa.

Renderizar pela composição horizontal, sem usar cenas:process como exportador 16:9: o comando atual é vertical. Reutilizar stage/compile para os bancos e áudio, gerar props horizontais, renderizar pelo Remotion e aplicar factory/cenas/speed.ts uma vez. Checar rapidamente H264/AAC, 1920×1080, 30FPS, duração e frames reais antes de concluir. Preservar MP4 numerados e atualizar caminhos/duração no JSON do YouTube. Pastas continuam determinando o estado da fila.

Entregar vídeo, título pesquisável, capa e descricao.md com ingredientes quando houver e capítulos reais. Fontes/URLs ficam no roteiro interno; descrição pública sem links de referência por enquanto, conforme brand/publicacao.json → publicCopyPolicy. Sem publicação/aprovação automática, previews ou SDD por vídeo. Revisão visual e de voz pelo usuário. A escolha de SEO exige pesquisa, sem inventar volume ou garantir ranking.

## Conteúdo completo e execução ilustrada — referência 038

Referência aprovada pelo usuário: assets/cenas/tarefas/003-gerados/038-youtube-salada-de-folhas-sem-murchar-preparo-e-molho-separado/output/convertido-0001.mp4. Complementa o motion do 036-0002; não substitui a direção do Instagram. Aprovação criativa, sem desempenho medido do horizontal.

- Desenvolver a ajuda concreta até a pessoa conseguir reproduzir: sequência, medidas quando pertinentes, gesto/utensílio, como reconhecer o ponto ou resultado e erros com correção. Exemplos e detalhes precisam acrescentar utilidade.
- Mostrar ações essenciais e etapas intermediárias, não depender só de produto cru/pronto. Quando o roteiro pedir, resolver ilustrações de mãos lavando, secando, acomodando, amassando, misturando ou finalizando. A ação depende do tema; não repetir a salada nem impor quantidade de imagens.
- Preservar recipiente, ingrediente, roupa e perspectiva entre ações. Conferir física: despejar pelo vidro aberto, fechar antes de agitar, contato correto do utensílio e quantidades coerentes. Gerar apenas ações essenciais que faltam no banco.
- Alternar cenas da Bebel, closes de execução e resultado, com texto útil e ritmo guiado pela explicação. Usar sections[].shots para ações que mudam dentro da mesma etapa. PNGs ilustram os gestos; não afirmar demonstração filmada nem fingir movimento contínuo de mãos usando zoom.
- Manter caixas expansivas, narração expressiva e conclusão acolhedora com inscrição subindo do rodapé. Ingredientes/medidas devem ser legíveis na tela quando necessários à reprodução.
- Duração pelo roteiro: o 038 tem 2min44, não cria um novo alvo mínimo/máximo. Entregar título, capa com elementos essenciais inteiros e descrição com ingredientes e capítulos reais; manter fontes internamente, sem links de referência no texto público por enquanto.

## Evergreen como padrão compartilhado
Toda produção horizontal é evergreen por padrão, assim como Reels/Shorts/TikTok, salvo pedido explícito diferente. Seguir brand/temas-utilizados.json → editorial.contentPolicy e bebel-editorial para pesquisa e pacote SEO. Preservar a profundidade e execução ilustrada aprovadas do 038; utilidade duradoura não exige duração fixa nem altera o motion.

Rotação de fundos: seguir brand/cenarios-utilizados.json, usando somente mídia suportada pelo renderer horizontal. Consumir o conjunto pertinente antes de repetir e registrar o uso na conclusão. Roupa roxa permanece padrão; variar cenário não autoriza alterar a personagem.

Fundos animados: BebelYoutubeMotion aceita imagem ou vídeo. Vídeo válido de mesmo nome-base tem prioridade sobre PNG; resolver o caminho real antes de montar/stage e informar backgroundType e backgroundDurationSeconds medidos. O vídeo roda mudo e em repetição contínua pela duração real, sem reiniciar por cena. Vídeo inválido ou duração ausente bloqueiam; não usar imagem silenciosamente. O suporte não altera a direção dos Reels nem transforma poses/objetos em camadas de vídeo.
