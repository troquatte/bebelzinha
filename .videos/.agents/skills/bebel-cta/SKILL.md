---
name: bebel-cta
description: Processar a fila de CTAs de início e encerramento da Bebel com apenas 1-audio.mp3, 2-video.mp4 e 3-arte.png por tema; inspecionar, renderizar, validar e retomar sem gerar prévias.
---

Leia `README.md` na raiz `.videos` para os comandos e schemas operacionais e `.spec/project.md` para o escopo ativo. Use bebel-fabrica-sdd para mudanças de código, bebel-fabrica-arquitetura para contratos e remotion-* para orientação técnica. Não reimplemente um comando existente a cada execução.

O usuário fornece somente três arquivos na pasta do tema:
`1-audio.mp3`, `2-video.mp4`, `3-arte.png`.
Não peça JSON, transcrição ou configuração prévia. O agente gera os registros técnicos. Não substitua arquivos ausentes por mídias de outra pasta.

Execute uma varredura por pedido, retomando desenvolvimento primeiro. Use `npm run cta:doctor`, `npm run cta:list` e `npm run cta:process`. Tarefas incompletas ficam em afazer; falhas reservadas ficam em desenvolvimento. Continue as independentes. Não configure monitoramento contínuo sem pedido específico.

A preparação automática mede durações decodificadas, resolução, alpha e hashes. Ela deixa inspeção pendente de propósito. Em cada tarefa:
1. Inspecione o PNG e quadros do início/meio/fim do vídeo em memória. Use `npm run cta:transcribe -- --task <tipo>/<tema>` para a transcrição offline disponível; ouça a narração quando possível e confira os tempos obtidos; registre o convite real. Metadados e nomes não comprovam conteúdo visual ou fala. Sem acesso necessário, registre a pendência exata e não invente evidência.
2. Preencha `config.json` automaticamente: timing real, layout e `inspection` conforme schema do README. `safeBottom` é o limite superior da personagem/objetos protegidos ao longo do trecho, em coordenadas finais 1080x1920 com object-fit cover. Não use y=655 sem verificar. Registre os segundos observados e a evidência da narração.
3. Use somente o áudio fornecido integral 1x, uma vez; vídeo mudo, sem lip sync. Duração e velocidade são calculadas pelo motor: ceil((áudio+0.5)*30), rate=min(1,vídeo/final). Para rate <0.5, aguarde decisão explícita do usuário e só então registre allowSlowVideo=true. Prossiga outras tarefas.
4. Arte inteira, proporcionada, com alpha; inicialmente width=880/top=24, centralizada. Ajuste ao vídeo real, com margens. Entrada fade+subida no convite (~0.5s), visível até o fim. Sem música, textos, legendas ou logos extras.
5. Execute process/render. Se a decodificação falhar, o motor pode criar all-intra derivado sem alterar o original. Não converta a velocidade do áudio.
6. Inspecione o MP4 temporário, incluindo todos os tempos solicitados em validation.json. Use `cta:frame` por pipe e ferramenta de imagem em memória; não redirecione para arquivo de imagem. Registre `visual-review.json` com hash e assinatura exatos, tempos observados e notas concretas sobre legibilidade, animação, proporção e ausência de sobreposição.
7. Execute `npm run cta:finish -- --task <tipo>/<tema>`: esse comando valida áudio PCM, streams, duração, hashes, quadros e revisão visual antes de promover/mover. Não altere flags para contornar uma falha. Aprovação editorial permanece null.

Não produzir stills, thumbnails, capas ou preview-convertido-*.jpg/png/webp, inclusive temporários. Somente a cópia técnica da arte de entrada é permitida. Render interno do Remotion não é uma entrega de prévia.

Retome registros existentes. Bloqueios sem mudanças não são repetidos automaticamente; após resolver a causa use `--retry` se necessário. Não processe gerados novamente. Entregue caminhos dos MP4, configuração editável e resumo de checks/pendências. Sem publicação ou conteúdo de miolo.

