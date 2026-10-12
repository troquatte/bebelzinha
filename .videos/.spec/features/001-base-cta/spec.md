# Base CTA

Problema: comandos de fábrica geral, prompts divergentes e configurações fixas
misturavam fontes antigas e staging. O usuário autorizou refatorar e remover código
sem uso, reiniciar SDD e começar somente por CTA.

## Aceite
- Um motor Remotion, duas composições e dois modelos sem fontes fixas.
- Usuário fornece três arquivos por tema; configuração e manifest automáticos.
- Reserva exclusiva, caminhos seguros, movimentos recuperáveis, retomada e colisões bloqueadas.
- Áudio integral 1x uma vez, vídeo mudo; duração ceil((áudio+0.5)*30), rate min(1, vídeo/final).
- Inspeção real registrada por tarefa; rate abaixo de 0.5 exige decisão registrada.
- PNG inteiro, proporcionado, entrada sincronizada e espaço seguro medido.
- H264/AAC yuv420p 1080x1920 30fps; versões sem sobrescrita, sem previews.
- Validar áudio decodificado, streams, duração, originais e evidência visual vinculada ao hash.
- Só promover e mover para gerados depois da validação completa; aprovação permanece null.
- Testes de persistência/retomada e diagnóstico isolado usando mídias fornecidas.
- Remover código/comandos/configs/prompts obsoletos; manter mídias do usuário e evidências históricas.

Não implementar miolo, catálogo, carrossel, geração de fala, dashboard ou publicação.
