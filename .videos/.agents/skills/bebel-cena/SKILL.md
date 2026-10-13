---
name: bebel-cena
description: Montar e processar temas do miolo com várias cenas, bancos existentes e checagem técnica rápida, preservando a revisão pelo usuário.
---

Use brand/identidade-bebel.md como base comum. Conserve personagem, cores, proporções e assets de identidade recebidos; não deformar/recriar Bebel para acomodar movimento. Não reabrir geração nem transcrever textos de persona em títulos.


Uma varredura por pedido; use comandos existentes. Não releia arquitetura/SDD nem crie componente ou script por tema. Desenvolvimento antes de afazer. Preserve CTA, protótipo e diagnósticos anteriores.

Fila: assets/cenas/tarefas/{001-afazer,002-desenvolvendo,003-gerados}/ID-tema/. Sem subpastas início/final. Entrada da fila: roteiro.md, com ## Narração contendo somente a fala e direção em ## Cenas. A preparação editorial cria esse roteiro a partir do tema informado. Áudio correspondente em audio.mp3; se ausente, reserve e informe a pendência, sem usar voz de outro roteiro. Não exigir JSON do usuário.

Fluxo econômico:
1. npm run cenas:list; retomar desenvolvimento antes de reservar afazer.
2. npm run cenas:prepare -- --task ID-tema. Cria montagem.json editável e reserva o tema inteiro.
3. Leia somente roteiro/montagem e os bancos pertinentes assets/{cenario,personagem,itens,fontes,logos}. Monte cenas em montagem.json usando BebelMioloTema. Consulte factory/cenas/contracts.ts e examples/montagem-tema.json se necessário, sem copiar o exemplo como direção obrigatória. Na renderização da fila, não gerar mídia nova. Asset essencial ausente: pendência exata; geração pertence à preparação.
4. Marque cenas contíguas de 0 até o fim real do áudio; tempos de poses, itens e títulos são locais à cena. Use tempos reais da fala; cenas:transcribe é opcional e local, sem download. Se aproximados, informe que precisam de conferência. Não cortar, repetir ou acelerar áudio; há uma única faixa contínua e sustentação só na última cena.
5. npm run cenas:process (com --task ID quando a central selecionou um só tema): render, checagem técnica e conclusão das montagens prontas. Bloqueios inalterados ficam pendentes; não repetir tentativas sem mudança ou --retry. Comandos render/finish/reconcile/stage disponíveis para recuperação e edição.

Motion aprovado: Bebel sem pulsada, quique, escala animada ou deformação. Entrada 40→100% em0.32s, saída 100→45% em0.28s antes da troca; uma pose por vez e rosto alinhado. Títulos brancos Roboto900 de100px, mesmo tamanho por linha, cada linha em caixa roxa translúcida, gap4px. Cascata0.14s, entrada0.6s com fade/movimento curto e acomodação única; sem pulsação. Itens comuns na frente, sombra separada e apoio coerente; camada atrás somente quando o roteiro exigir armário/oclusão. Fundo mudo fornecido, sem zoom adicional; mantém continuidade global quando reutilizado. Ajuste posições e marcações por tema. Sem abertura; CTA pronto anexado na exportação.

Preparação de conteúdo é coordenada por bebel-producao, com bebel-editorial, bebel-midia e bebel-voz. Esta skill recebe roteiro, assets e áudio prontos para montar/renderizar. Não gerar imagem/voz ou reescrever fala durante processamento da fila.
Checagem rápida de hashes/FFprobe antes de mover a gerados. Usuário revisa imagem e áudio; sem inspeção visual obrigatória do agente, extração de quadros, prévias JPG/PNG/WebP, relatórios, transcrições em disco ou SDD por tema. Sem publicação/aprovação. Concluído mantém roteiro, áudio, montagem e output/MP4 numerado; controles temporários são limpos. Apagar gerados não reabre tarefas.

Responda apenas caminhos dos MP4 e pendências. Não prometa revisar visual/áudio.


Padrão do miolo: brand/miolo.json define velocidade final1.2x, aplicada pelo motor ao vídeo completo e áudio juntos, com atempo preservando altura da voz. Monte marcadores no áudio original1x; não acelerar outra vez os dados/voz. Confira frases dos títulos completas e conectadas entre cenas, com pontuação, quebra por grupos de sentido e mesmo tamanho por linha.


Aproveitar as duas variantes de personagem/item preparadas: alternar poses e estados nos momentos relevantes da fala, com transições suaves. Bebel permanece uma pose visível por vez, sem deformação ou pulsação. Itens podem coexistir ou entrar alternadamente quando o roteiro justificar, com apoio e sombra coerentes; itens comuns ficam à frente da personagem. Não dobrar densidade indiscriminadamente nem cobrir rosto/mãos. Variante de item pode ser camada distinta com timing próprio; não trocar estado do objeto antes do evento narrado. Não gerar assets durante render; falta de variante essencial volta como pendência do passo2.


Glow/game feel: reflexo curto único na entrada das caixas de título, borda iluminada e luz suave no contorno dos itens ao aparecerem. Brilho segue a silhueta, sem retângulo luminoso atrás do PNG. Bebel tem apenas luz ambiente discreta, sem pulso, escala ou deformação. Texto continua branco/legível. Sem flashes fortes ou pulsos repetidos, mudança de cor da personagem ou efeitos em todos os elementos ao mesmo tempo. Intensidade deve apoiar a ação, não competir com a fala.


Ritmo dos brilhos: reflexo único dos títulos em3.6s na timeline original, em vez de flash rápido; entradas dos itens em0.65s, com luz que sobe e desaparece suavemente. Esses tempos são antes da aceleração final1.2x. Não repetir o brilho continuamente.


Estética de luz atual: bokeh dourado desfocado inspirado em assets/referencias/luzes-douradas-bokeh.jpg, glow quente e raios girando lentamente ATRÁS da Bebel, sem cobrir rosto/corpo. Pontos de luz com movimento contínuo suave no tempo global da produção, sem reiniciar nas trocas de cena. Não usar mais o halo giratório atrás dos títulos. Texto mantém vidro lento3.6s na timeline original. Preserve cozinha/identidade, sem girar a personagem ou flashes fortes.


Padrão visual escolhido pelo usuário: brand/miolo.json, visualEffects.profile=bokeh-dourado-atras-da-bebel. O renderer lê esses parâmetros diretamente: atmosfera dourada atrás da personagem, raios giratórios lentos, vidro3.6s, entrada de título0.6s, cascata0.14s e entrada de item0.65s, antes de1.2x final. Use esse perfil nas próximas produções salvo orientação diferente. Referência em assets/referencias/luzes-douradas-bokeh.jpg. Não recriar halo atrás dos títulos, girar/deformar a Bebel ou trocar a aparência escolhida. Escolha visual não equivale à aprovação automática de futuras entregas.


Preferência de alimentos: compor grupos de três quando a narrativa e o enquadramento permitirem, evitando aparições sistemáticas de2em2. Usar triângulo visual/níveis e tamanhos coerentes, com alimentos em evidência, rosto livre e apoio na bancada. Pode manter um terceiro alimento de apoio para continuidade entre cenas, sem fazer todos reaparecerem juntos. Não forçar trio se prejudicar legibilidade ou fidelidade ao roteiro; nenhuma geração de mídia na etapa de render.

Alimentos: cada ingrediente entra e sai suavemente uma única vez por produção. Reutilize os espaços da bancada com substituições, sem reapresentar alimentos no fechamento. Continuidade entre cenas mantém o item visível, sem reiniciar entrada/brilho. Use until (fim local da presença) e exit (duração da saída); trio apenas quando couber, sem repetir para completar contagem.


Listas numeradas: escrever primeira linha no formato N. Texto. O renderer destaca N num círculo coral, à esquerda das duas linhas de texto branco Roboto alinhado à esquerda, com sombra para contraste sobre a cozinha. Cada linha fica em sua própria caixa roxa translúcida com borda iluminada e reflexo de vidro lento; número aparece uma vez, com entrada/saída suaves e linhas em cascata. Referência do usuário é somente disposição visual; não copiar fundo branco da imagem para o vídeo. Títulos não numerados conservam o estilo existente.

Cenários podem mudar entre cenas quando a narrativa justificar. Escolher fundo coerente no banco, com vídeo de mesmo nome-base prioritário; preservar identidade, enquadramento e legibilidade. Fazer transição suave, sem zoom artificial ou cortes bruscos, sem trocar apenas para criar movimento. Se faltar cenário essencial, resolver na etapa de mídia com referências adequadas.

CTA final: não gerar convite, cena, texto ou áudio de CTA no roteiro do miolo. Encerrar a dica naturalmente. O motor anexa automaticamente o MP4 de brand/miolo.json, endingClip, antes de promover a exportação. Arquivo obrigatório: assets/cta/prontos/reutilizavel/encerramento-04s.mp4. Miolo em1.2x; CTA e sua voz em velocidade natural, uma única vez. Se ausente, bloquear com caminho exato. Não regenerar o CTA nem duplicar sua fala.
Revisão obrigatória de títulos: ler as linhas em sequência; formar frases completas, preservar sujeito/ação e pontuação, sem fragmentos desconexos. Título resume o trecho narrado e se conecta ao anterior. Ritmo com mudanças nos momentos da fala e pequenas antecipações dos itens; não aumentar velocidade para mascarar falta de ação, nem deixar títulos reaparecerem sem necessidade.

Encerramento único: o miolo termina assim que entrega a dica ou receita. Não acrescentar chamada narrada ao app, convite para comentar, tela promocional ou frase de encerramento redundante. A conexão com a Bebelzinha vem do tema e da utilidade; quando o CTA pronto já apresenta o app, não repetir essa apresentação no miolo. Anexar somente uma vez o vídeo de endingClip, com imagem e áudio completos. Não usar o antigo CTA gerado por texto/narração. Em revisões, cortar a reprodução apenas após a última instrução útil, preservando o áudio original.

Posição para Reels escolhida pelo usuário: títulos em y=360, largura útil850px, x=90 por padrão, acima da cabeça e abaixo dos controles superiores. Número coral com caixas de vidro por linha. Frases curtas devem caber sem quebra automática; ajustar fonte igualmente nas linhas quando necessário. Configuração real em brand/miolo.json.


Padrão atual: consultar brand/formato-reels-bebel.md uma vez por produção; referência principal é a produção011, convertido-0003. Essa orientação prevalece sobre o teste da alface, closes sem personagem e duração rígida antiga. Manter as travas e o CTA curto definido em brand/miolo.json.



Acabamento culinário: imagens raster profissionais dos estados, mesma panela/câmera e transições suaves. No preparo de pratos, Bebel atrás da panela em TODAS as etapas, rosto livre e comida em destaque. Não usar os vetores culinários antigos como referência. Detalhes e banco de reuso em brand/formato-reels-bebel.md.


