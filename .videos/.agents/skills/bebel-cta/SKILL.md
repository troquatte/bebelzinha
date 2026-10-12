---
name: bebel-cta
description: Processar CTAs com três mídias, checagem técnica rápida e revisão visual e de áudio pelo usuário.
---

Use comandos existentes; não reler arquitetura, SDD ou outras skills por produção. Uma varredura por pedido, desenvolvimento primeiro. Não refatorar durante processamento comum.

Entradas por tema: 1-audio.mp3, 2-video.mp4, 3-arte.png, em assets/cta/tarefas/001-afazer/{001-inicio,002-final}/<id>-<tema>. Arte livre; não exigir texto ou convite no início. Não pedir JSON ao usuário.

1. cta:list. Sem trabalho, encerrar sem doctor ou SDD.
2. cta:prepare -- --task <tipo>/<tema> mede e reserva. Início e final entram em 0s, independentemente da fala. Não transcrever nem procurar convite para definir a entrada. Se o usuário solicitar explicitamente outro tempo, aplicar somente às tarefas indicadas.
3. Usar layout da configuração: arte inteira/proporcional, width=880/top=24 inicialmente, fade+subida 0.5s até o fim. Não inspecionar PNG, vídeo ou MP4; o usuário revisa imagem e áudio. Não extrair quadros ou comparar áudio detalhadamente.
4. cta:process prepara, renderiza e conclui tarefas com timing definido. Para ajustar timing: prepare → atualizar config → render → finish. Finish faz uma única checagem rápida de hashes, resolução, FPS, H264/AAC, pixel format, frames e duração. Sem decode completo ou PCM do exportado. Não executar validate separadamente antes de finish.
5. Falhas permanecem em desenvolvimento; continuar independentes. --retry só após resolver a causa. Gerados não são processados novamente.

Áudio integral 1x, uma vez; vídeo mudo sem lip sync. Motor calcula áudio+0.5s e desacelera somente vídeo curto. Rate abaixo de 0.5 exige decisão explícita e allowSlowVideo=true. All-intra derivado apenas após falha de decodificação, original intacto.

Manter travas de três arquivos presentes, ID único, caminhos seguros e ausência de sobrescrita. Concluído conserva originais, config.json e output/MP4; controles temporários são limpos. Pastas determinam estado; apagar gerados não cria pendência SDD.

Sem relatórios, evidências, inspeções do agente, snapshots, previews JPG/PNG/WebP, stills ou capas. Não atualizar SDD por vídeo. Não chamar cta:frame no processamento normal. Doctor só em falha de ambiente; reconcile para recuperação.

Não adicionar música/textos/legendas, publicar, aprovar, criar watcher ou miolo. Revisão editorial pertence ao usuário. Responder somente com caminhos e pendências, sem comentários sobre validade da arte ou promessa de conferir quadros/áudio.
