# Validação

Lint/TypeScript, 16 testes do miolo e oito skills passaram. Teste real de retiming confirmou469 quadros/30fps, aproximadamente15.633s para609 quadros originais, com H264/AAC/yuv420p. Teste de áudio existente passou:5.7991875s original →4.468s a1.3x, dentro da tolerância; atempo preserva altura da voz. Fonte e arquivo real de produção preservados.

FFmpeg do Remotion não possui setpts/fps/tpad; implementação usa timestamps de entrada com -itsscale, CFR30 e atempo/asetpts, todos disponíveis. Diagnóstico novo renderizado sem narração e com tempos provisórios; continua em desenvolvimento, anterior preservado. Nenhuma voz nova foi gerada ou produção aprovada.
