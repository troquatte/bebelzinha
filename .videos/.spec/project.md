# Estado do projeto

Remotion 4.0.534 instalado na raiz, React e TypeScript; sem reinstalação.
Escopo ativo: CTA de início e encerramento usando três arquivos fornecidos.

Fila: `assets/cta/tarefas/{001-afazer,002-desenvolvendo,003-gerados}`.
Tipos: `001-inicio`, `002-final`. Tema: `<id>-<nome-do-tema>`.
Identidade: tipo + nome completo da pasta, preservados em toda transição.
Não precriar pastas de tema nos estados seguintes.

Modelos compartilhados: `brand/cta-inicio.json`, `brand/cta-encerramento.json`.
Configuração medida e inspeções pertencem à tarefa. Somente os três arquivos
`1-audio.mp3`, `2-video.mp4`, `3-arte.png` são fornecidos pelo usuário.
O agente registra a inspeção de fala e imagem; não inferir timing por nome de arquivo.

Uma varredura por execução; sem watcher, postagem ou aprovação automática.
Saída única de mídia: MP4. Nenhuma prévia, still ou capa gerada em disco.
Assets fornecidos, entregas e diagnósticos anteriores preservados; histórico
isolado em `history/2026-10-12-reset`, fora dos imports e do fluxo operacional.

Base CTA validada: 17 testes, lint/typecheck, três skills, carregamento das duas
composições e ciclo diagnóstico completo. Novo diagnóstico em
`history/diagnostics/cta-2026-10-12`. A fila real está vazia.

Transcrição offline disponível em `cta:transcribe`, com dependências/modelo já
instalados realocados para `.cache/cta`. Nenhuma API paga ou download automático.

Pendência de material: `assets/cta/audio.mp3` solto contém frase de miolo,
“Parece uma coisa boba, até acontecer aí na sua casa”, sem convite para comentar.
Não usá-lo silenciosamente como encerramento. O diagnóstico utilizou explicitamente
uma cópia da narração histórica; isso não abasteceu nem aprovou tarefa de produção.
