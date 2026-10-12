# Base CTA

Aceite atual:
- Três mídias por tema; arte livre. Início e final entram em 0s, independentemente da fala.
- Pastas determinam estado; apagar gerados não cria dependências externas.
- Configuração editável por tarefa; controles temporários para recuperação e concorrência.
- Sem evidências por vídeo, previews, histórico de ações ou sincronização de entregas com SDD.
- Áudio integral 1x uma vez, vídeo mudo; duração ceil((áudio+0.5)*30), rate min(1,vídeo/final).
- PNG inteiro/proporcional; layout configurado sem safeBottom obrigatório; revisão pelo usuário.
- H264/AAC yuv420p 1080x1920 30fps. Validar antes de promover; versões sem sobrescrita.
- Comandos compactos, sem releitura geral ou transcrição de início em cada execução.
- Preservar mídias, MP4 existentes e diagnósticos históricos; sem aprovação/publicação.
