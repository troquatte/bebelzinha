# Fábrica CTA da Bebel

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
Sem publicação, watcher contínuo ou miolo nesta etapa. Histórico anterior permanece preservado.

## Manutenção

npm run lint · npm run cta:test · npm run skills:check
Sem render automático para mudanças apenas de contratos/persistência; respeite o pedido de não gerar vídeo.
