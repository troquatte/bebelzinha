---
name: bebel-producao
description: Coordenar o miolo da Bebel em três pedidos separados — roteiro, áudio e imagens, e vídeo; retomar o mesmo ID sem avançar além da etapa solicitada.
---

Entrada: assets/cenas/01-roteiro.md, 02-audio-imagens.md ou 03-video.md. MODO obrigatório: roteiro, audio-imagens ou video. Se ausente, limitar ao roteiro; modos antigos completo/preparar não autorizam avançar automaticamente: informar os três prompts atuais. Leia brand/identidade-bebel.md e as seções pertinentes da persona compartilhada uma vez. Carregar somente a skill necessária, não toda arquitetura/SDD.

Skills são instruções do mesmo agente, sem criar chats/subagentes. Uma execução por pedido; preserve CTA, protótipo, originais, saídas e travas. Cada etapa para e entrega ao usuário, sem iniciar a próxima. Não aprovar automaticamente nem presumir que a execução anterior aprova o próximo passo.

1. MODO roteiro → bebel-editorial. Novo: escolher tema/categoria conforme banco editorial, cenas:new, escrever roteiro.md com fala/direção inicial e legenda.md com texto da publicação, registrar cenas:remember. RETOMAR com ID reutiliza essa produção; novo cria outra. Nada de geração de imagens, voz, montagem com tempos finais ou render. Pode consultar nomes dos assets para viabilidade. Entregar ID e roteiro para revisão; parar.
2. MODO audio-imagens → ID exato obrigatório, já existente; não criar outro nem escolher pendente automaticamente. O pedido indica usar o roteiro revisado; não reescrever a fala. Primeiro bebel-voz: áudio fornecido ou ElevenLabs somente se habilitado/configurado e autorizado nesse pedido. Sem áudio válido, informar caminho esperado e parar antes de gerar imagens. Com áudio, medir duração e identificar tempos reais da fala (timestamps retornados ou cenas:transcribe local quando disponível). Depois bebel-midia: usar fala/direção/timings para definir camadas, reutilizar bancos antes de gerar e salvar assets nas pastas corretas. Se não conseguir identificar tempos, informar necessidade de conferência, sem inventar timings finais. Pode preencher montagem.json com assets/timings realmente identificados; sem MP4 nem mover a gerados. Entregar áudio/materiais e pendências para revisão; parar.
3. MODO video → ID exato obrigatório, já existente; bebel-cena com roteiro, áudio e materiais prontos. Completar montagem editável com tempos reais, usar cenas:process --task ID, checagem técnica rápida e promoção. Não gerar imagens, voz ou outro tema, nem reescrever roteiro. Falta essencial impede render e informa pendência. Entregar MP4 e pendências; parar.

Retomadas usam o mesmo ID e os arquivos existentes; não repetir voz/imagens prontas. Divergência entre roteiro e áudio ou montagem deve ser explicitada, sem trocar arquivo ou fala silenciosamente. Gerado é terminal; nova versão exige novo ID. Apagar entregas não reabre tarefa; memória editorial permanece independente.

Sem abertura, publicação, aprovação automática, previews, relatórios ou SDD por produção. Imagens necessárias ao vídeo são assets, não previews. Revisão visual/áudio pelo usuário. Responder caminhos relevantes e pendências reais, sem afirmar testes/geração não feitos.

Antes de criar a tarefa, consultar brand/temas-utilizados.json: tema e ideia não podem repetir registros anteriores; categoria não pode repetir na rodada atual. Escolher categoria ainda não usada na rodada atual e conferir semelhança de conteúdo, não apenas título. Registrar pelo cenas:remember. Se todas as categorias foram usadas, informar pendência; não limpar histórico, reiniciar categorias ou usar --allow-repeat sem autorização específica.

CTA final: não gerar convite, cena, texto ou áudio de CTA no roteiro do miolo. Encerrar a dica naturalmente. O motor anexa automaticamente o MP4 de brand/miolo.json, endingClip, antes de promover a exportação. Arquivo obrigatório: assets/cta/prontos/reutilizavel/encerramento-04s.mp4. Miolo em1.2x; CTA e sua voz em velocidade natural, uma única vez. Se ausente, bloquear com caminho exato. Não regenerar o CTA nem duplicar sua fala.
Revisão obrigatória de títulos: ler as linhas em sequência; formar frases completas, preservar sujeito/ação e pontuação, sem fragmentos desconexos. Título resume o trecho narrado e se conecta ao anterior. Ritmo com mudanças nos momentos da fala e pequenas antecipações dos itens; não aumentar velocidade para mascarar falta de ação, nem deixar títulos reaparecerem sem necessidade.

Encerramento único: o miolo termina assim que entrega a dica ou receita. Não acrescentar chamada narrada ao app, convite para comentar, tela promocional ou frase de encerramento redundante. A conexão com a Bebelzinha vem do tema e da utilidade; quando o CTA pronto já apresenta o app, não repetir essa apresentação no miolo. Anexar somente uma vez o vídeo de endingClip, com imagem e áudio completos. Não usar o antigo CTA gerado por texto/narração. Em revisões, cortar a reprodução apenas após a última instrução útil, preservando o áudio original.

Rodadas editoriais: brand/temas-utilizados.json, editorial.categoryRound indica a rodada atual; registros antigos sem round pertencem à rodada1. Não repetir categoria dentro da rodada atual, nem tema/ideia em qualquer rodada. A rodada2 foi autorizada pelo usuário; não apagar o histórico. Nova rodada posterior exige autorização quando todas as categorias da atual estiverem usadas.


Padrão atual: consultar brand/formato-reels-bebel.md uma vez por produção; referência principal é a produção011, convertido-0003. Essa orientação prevalece sobre o teste da alface, closes sem personagem e duração rígida antiga. Manter as travas e o CTA curto definido em brand/miolo.json.



Antes de registrar um roteiro novo ou gerar sua voz/imagens, aplicar a seção Revisão contra conteúdo vago de bebel-editorial. Se faltar problema específico, ação demonstrável e aprendizado útil, reescrever dentro do pedido autorizado antes de avançar. Não compensar roteiro raso com animação nem forçar ligação com o app. Revisão interna curta, sem relatório ou aprovação adicional.


