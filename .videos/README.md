# Fábrica de vídeos da Bebel

Para a equipe: comece por [COMO-USAR.md](COMO-USAR.md). Miolo em três pedidos com bebel-producao: `assets/cenas/01-roteiro.md`, `02-audio-imagens.md`, `03-video.md`; índice em `assets/cenas/PROMPT.md`. CTA: `assets/cta/PROMPT.md`. Preparação/render separados continuam opcionais em prompts/.

O usuário entrega três arquivos por tema: 1-audio.mp3, 2-video.mp4 e 3-arte.png.
A arte pode conter qualquer mensagem, como “Dicas da Bebel”; não há texto obrigatório.

## Pastas

assets/cta/tarefas/{001-afazer,002-desenvolvendo,003-gerados}/{001-inicio,002-final}/001-tema/

A pasta determina o estado. O motor move o tema inteiro, preservando tipo e nome.
Não precrie o mesmo tema nos destinos. IDs não se repetem no mesmo tipo entre pastas existentes.
Você pode apagar entregas antigas ou pastas de tipo em 003-gerados. Não há catálogo externo
nem SDD que exija sua existência; os destinos são recriados quando necessários.

## Operação econômica

Use a skill bebel-cta e uma varredura por pedido. Não releia toda a arquitetura por vídeo.
- npm run cta:list: lista compacta dos temas e estados.
- npm run cta:prepare -- --task 001-inicio/001-tema: mede as mídias e reserva o tema.
- A revisão visual e de áudio é feita pelo usuário após a entrega.
- Início e final: arte entra em 0s, independentemente da fala. Layout inicial width=880/top=24.
- Não transcrever nem procurar convite para definir a entrada da arte.
- npm run cta:render -- --task <tipo>/<tema>: renderiza temporário.
- npm run cta:finish -- --task <tipo>/<tema>: valida uma vez, promove e move para gerados.
- npm run cta:process: atalho de preparação, render, validação e conclusão para tarefas com timing definido.
  Bloqueios inalterados são ignorados; --retry força nova tentativa.
- npm run cta:reconcile: recupera movimentos e limpa controles de tarefas concluídas.
- cta:doctor apenas na instalação ou falha de ambiente; cta:validate para checagem adicional solicitada.
- cta:frame -- --task <tipo>/<tema> --source video|art|output --seconds <n>: imagem por stdout;
  consumir em memória, nunca redirecionar para arquivo.
- cta:stage -- --task <tipo>/<tema>: prepara props e informa o comando do Studio para edição.

## Contrato

Áudio fornecido integral, 1x, uma vez; vídeo mudo, sem lip sync.
Duração em quadros = ceil((áudio + 0.5) * 30). Vídeo rate=min(1, vídeo/duração final).
Rate abaixo de 0.5 exige decisão explícita e allowSlowVideo=true na configuração.
PNG inteiro, proporcional, fade+subida de 0.5s, visível até o fim. Sem texto novo, música ou legendas.
Layout usa a configuração; revisão visual pelo usuário, sem safeBottom ou texto obrigatório. Limites do quadro são validados pelo motor.
Modelos: brand/cta-inicio.json e brand/cta-encerramento.json. Cena: BebelCtaScene.
Composições: BebelInicio e BebelEncerramento. Nenhuma fonte fixa nos modelos.
MP4 H.264/AAC, yuv420p, 1080×1920, 30fps; output/convertido-0001.mp4, sem sobrescrever versões.
Checagem automática rápida: hashes, streams H264/AAC, resolução, FPS, pixel format, frames e duração via FFprobe.
Sem comparação PCM, decodificação completa ou extração de quadros. Revisão de imagem e áudio pelo usuário.

Concluído: três originais + config.json editável (inclui referência da saída) + output/MP4.
Manifest, lock e journals são controles temporários para retomada/concorrência, removidos após conclusão.
Sem histórico por vídeo, validation.json, visual-review.json, transcript.json ou snapshots de configuração.
Nenhuma imagem de prévia JPG/PNG/WebP, still ou capa, nem temporária.
SDD registra somente mudanças do sistema; nunca inventaria entregas. Gerado não significa aprovado.
Sem publicação ou watcher contínuo. Histórico anterior permanece preservado.

## Manutenção

npm run lint · npm run cta:test · npm run skills:check
Sem render automático para mudanças apenas de contratos/persistência; respeite o pedido de não gerar vídeo.

## Miolo por tema, com várias cenas

Fila independente: `assets/cenas/tarefas/{001-afazer,002-desenvolvendo,003-gerados}/001-tema/`.
Não há subpastas de início/final. O usuário fornece tema/duração ao prompt de preparação; o agente escreve `roteiro.md`, com `## Narração` contendo apenas a fala e `## Cenas` com a direção desejada. Também aceita roteiro fornecido. Exemplo em `examples/roteiro-tema.md`.
Forneça `audio.mp3` enquanto a voz estiver desligada; sem ele o tema fica em desenvolvimento com pendência. Não reutilizar áudio de outro roteiro.

O agente usa `$bebel-cena` para montar `montagem.json` automaticamente, referenciando os bancos atuais. O usuário não precisa escrever JSON. O comando sozinho prepara/reserva e processa montagens prontas; a escolha criativa de camadas e marcadores pertence ao agente. Não escolher materiais genéricos se faltar o asset adequado.

- `npm run cenas:list`: lista compacta; desenvolvimento tem prioridade.
- `npm run cenas:new -- --theme "Tema" --seconds 20`: cria próximo ID e estrutura do roteiro; o agente escreve a fala/direção.
- `npm run cenas:editorial`: categorias, personalidade e assuntos utilizados em `brand/temas-utilizados.json`.
- `npm run cenas:remember -- --task ID-tema --category categoria --summary "Ideia"`: registra roteiro já escrito, idempotente por ID. Títulos repetidos exigem `--allow-repeat`; sem vínculo com existência/aprovação de vídeos. O agente compara também ideias similares, não só nomes. IDs já utilizados no banco não são reciclados.
- `npm run cenas:asset -- --source <PNG-gerado> --kind cenario|personagem|itens --name <slug>`: copia para o banco correto, reutiliza hash idêntico e preserva versões existentes.
- `npm run cenas:prepare -- --task 001-tema`: reserva, extrai a fala e prepara a montagem editável.
- `npm run cenas:transcribe -- --task 001-tema`: tempos locais em memória, se o reconhecedor já estiver instalado. Nenhum download automático; marcadores aproximados precisam de revisão.
- `npm run cenas:process`: uma varredura, render e checagem técnica; pendências inalteradas são ignoradas. `--retry` força tentativa.
- `npm run cenas:render` / `cenas:finish -- --task 001-tema`: etapas individuais.
- `npm run cenas:reconcile`: recupera movimentos/promoções e limpa controles concluídos.
- `npm run cenas:stage -- --task 001-tema`: props para abrir `BebelMioloTema` no Studio. Execute reconcile após a revisão para limpar staging de gerados.

Composição reutilizável: `src/scenes/BebelTema.tsx`. Dados por tema em `montagem.json`: cenas contíguas em segundos, marcadores locais a cada cena, camadas, poses, itens, títulos e fontes. Narração contínua integral, 1x, uma vez; apenas a última cena recebe sustentação de 0.3s. Fundo fornecido mudo, desacelerado se necessário, sem zoom adicional. O mesmo vídeo de fundo continua no tempo global do tema.

Preserve o estilo aprovado: Bebel só com fade 40→100% / 100→45%, sem pulsação; títulos Roboto brancos, mesmo tamanho, uma caixa por linha com cascata e gap4px. O agente ajusta posições e tempos ao roteiro; exemplos não são templates obrigatórios. Não adicionar CTA, abertura ou encerramento.

Concluído: `roteiro.md`, `audio.mp3`, `montagem.json` e `output/convertido-0001.mp4`. Próximo número livre preserva MP4 anteriores. Controles `.work.json`, `.runtime`, staging e journals são temporários. A saída é verificada uma vez por FFprobe e hashes; imagem e áudio ficam para revisão do usuário. Sem prévias, relatórios ou SDD por tema. Apagar gerados não reabre tarefas. O protótipo `miolo:cena1` e seus diagnósticos continuam preservados.

## Voz preparada para ElevenLabs

`brand/narracao.json` começa com `provider: provided`. `cenas:process` nunca chama a API.
Para ativar depois, configure `provider: elevenlabs`, a voz da Bebel em `ELEVENLABS_VOICE_ID` (ou voiceId) e `ELEVENLABS_API_KEY` no ambiente/local `.env` ignorado pelo Git. Use `.env.example`, sem colocar chaves em roteiros ou JSON.

- `npm run cenas:voice-status`: mostra somente se chave/voz estão configuradas.
- `npm run cenas:audio -- --task 001-tema`: preparação sem chamada paga.
- `npm run cenas:audio -- --task 001-tema --generate`: chamada explicitamente solicitada, fala integral e velocidade 1. Preserva áudio existente; retorna marcadores reais por palavra em memória para atualizar a montagem.

O adaptador usa `with-timestamps` / `eleven_multilingual_v2`. Não repete requisições automaticamente: falha incerta pode já ter consumido créditos; confira o provedor antes de `--retry-request`. Respostas válidas viram `audio.mp3`; a montagem guarda referência/hash da voz, sem chave. Integração testada com resposta simulada, sem geração paga. Somente o passo 2 (áudio e imagens) autoriza voz quando habilitada; imagens essenciais via imagegen são preparadas depois do áudio real, com referências reais e bancos existentes. O passo 1 produz só roteiro e o passo 3 só montagem/render. A renderização da fila não chama geração. Organização adicional dos bancos fica para outra etapa.

Fundos: mesmo caminho/nome-base resolve vídeo MP4/WebM/MOV antes de PNG/JPG/JPEG/WebP. Novo vídeo muda hashes/cache; fundo inválido gera pendência, sem troca silenciosa. Sem vídeo, usa imagem. MP4 entregue não é atualizado automaticamente.

Verificação do sistema: `npm run lint`, `npm run cta:test`, `npm run cenas:test`, `npm run skills:check`. Teste opcional de render real em fixture: PowerShell `$env:CENAS_RENDER_TEST='1'; node --experimental-strip-types --test tests/cenas-render.test.ts`. Não faz parte do processamento comum.
