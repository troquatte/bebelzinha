# Como produzir cenas da Bebel

Abra o projeto .videos no Codex. O índice fica em assets/cenas/PROMPT.md.
Use um prompt por vez; todos os passos usam o mesmo ID. Não precisa criar pastas nem escrever JSON.

## 1. Roteiro

Copie assets/cenas/01-roteiro.md para a conversa. Deixe tema/tipo automáticos ou personalize, escolha a duração e envie.
O agente cria a produção, escreve roteiro.md com fala e direção inicial e registra a ideia no banco editorial.
Também salva legenda.md na mesma pasta, com texto da publicação e hashtags pertinentes. Revise a legenda junto ao roteiro; não é transcrição cronometrada nem texto inserido automaticamente no vídeo. Cada produção tem seu arquivo, preservado ao mover a pasta.
Ele entrega o ID e para, sem imagens, voz ou vídeo. Leia o roteiro e peça ajustes nesse mesmo ID.

## 2. Áudio e imagens

Depois de revisar o roteiro, copie assets/cenas/02-audio-imagens.md e substitua RETOMAR pelo ID do passo 1.
Primeiro o agente usa audio.mp3 fornecido ou gera a voz se ElevenLabs estiver habilitado/configurado.
Com voz desligada e sem áudio, informa o caminho exato para você colocar audio.mp3 e para antes de gerar imagens.
Grave somente a seção Narração. Coloque o arquivo nesse caminho e repita o passo 2 com o mesmo ID.
Com áudio real, o agente identifica o ritmo da fala e prepara as imagens/camadas necessárias, reutilizando os bancos antes de gerar.
Antes de chamar geração, procura candidatos nos bancos compartilhados e confere o conteúdo relevante. Materiais de produções anteriores podem ser reaproveitados; só camadas essenciais ausentes são geradas. Novos assets recebem nomes descritivos e ficam nos bancos corretos, disponíveis para outras IAs que usem estas skills. Referências inspiram a identidade; não viram automaticamente camadas prontas. Vídeos são usados como fundo; poses/objetos continuam imagens no motor atual.
Você recebe áudio e assets para revisar. Ainda não há MP4.
Para enriquecer a animação, planeje duas variantes por personagem/item relevante, como duas poses da Bebel ou dois estados de um objeto. Reutilize as variantes existentes antes de gerar. Elas entram ou alternam conforme a ação; não são duas Bebels simultâneas. Mais objetos só quando contribuírem para a narrativa, com rosto/mãos livres. Essa diretriz aumenta opções de movimento, não exige duplicar arquivos iguais.

Para habilitar ElevenLabs depois: configure .env conforme .env.example, chave e ID da voz da Bebel, e provider=elevenlabs em brand/narracao.json.
Não envie a chave na conversa. Só o passo 2 autoriza geração; passos 1 e 3 nunca chamam voz.

## 3. Vídeo

Depois de revisar áudio/materiais, copie assets/cenas/03-video.md com o mesmo ID.
O agente monta e sincroniza as cenas, renderiza, faz checagem técnica rápida e move para gerados.
O miolo final usa velocidade1.3× em brand/miolo.json: áudio e vídeo inteiro acelerados juntos, preservando a altura da voz. Marcadores são montados no áudio original1×; não acelere o arquivo de entrada outra vez. A duração entregue fica menor que a duração original. CTA mantém seu contrato separado.
Não cria outra ideia, imagem ou voz nessa etapa. Falta essencial gera pendência.
MP4: assets/cenas/tarefas/003-gerados/ID-tema/output/convertido-0001.mp4.
Você revisa o resultado; não há aprovação ou publicação automática.

## Retomadas e ajustes

Repita apenas a etapa pendente com o mesmo ID. Não use novo para continuar uma produção.
Se o roteiro precisar mudar depois do áudio, informe a alteração: não trocar fala/áudio silenciosamente nem gerar voz outra vez sem autorização.
Arquivos prontos são preservados; gerado é terminal e nova versão exige novo ID.
Para produzir outro tema, volte ao passo 1 com RETOMAR novo.

## Bancos e identidade

Alimentos em destaque: preferência por grupos de três, quando coerentes com o roteiro e o espaço, evitando sequência de duplas. Itens grandes, rosto livre e composição com continuidade; não adicionar ingrediente irrelevante apenas para completar o trio.

- Persona: brand/persona-bebel.md; aplicação/referências: brand/identidade-bebel.md.
- Visual padrão dos vídeos: brand/miolo.json, perfil bokeh-dourado-atras-da-bebel; luzes atrás da personagem, vidro lento e tempos de entrada ajustáveis. O renderer e a skill usam essa configuração.
- Categorias e ideias usadas: brand/temas-utilizados.json, independente da existência dos vídeos.
- Referências compartilhadas: assets/referencias (vídeos e carrosséis).
- Cenários/fundos: assets/cenario; Bebel: assets/personagem; objetos: assets/itens.
- Roteiro, áudio e montagem editável: pasta ID-tema na fila assets/cenas/tarefas.

Fundos de mesmo caminho/nome-base priorizam vídeo: cozinha.mp4 vence cozinha.png; sem vídeo usa imagem.
Nomes parecidos são distintos. Vídeo inválido gera pendência. Saída entregue não é refeita automaticamente.
Imagens geradas são assets reutilizáveis, não previews. Não apagar bancos de montagens que queira editar depois.
Sem previews, relatórios ou SDD por produção. Não inventar mídias, persona, receitas ou timings para contornar pendência.

## CTA e lotes

CTA continua com assets/cta/PROMPT.md e suas três entradas.
Para processar lote de temas já preparados, prompts/processar-temas.md continua disponível, sem geração de conteúdo.
As skills são instruções do mesmo agente; comandos locais organizam/renderizam. Não há watcher nem processos autônomos por etapa.
