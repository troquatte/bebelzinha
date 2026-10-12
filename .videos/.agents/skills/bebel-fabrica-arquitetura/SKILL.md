---
name: bebel-fabrica-arquitetura
description: Manter contratos e recuperação compartilhados; usar somente para mudanças do motor, não em cada produção CTA.
---

Leia README e módulos afetados antes de mudar contratos; consulte storage quando mudar persistência. Use bebel-fabrica-sdd em mudanças do sistema e bebel-cta na produção comum.

- Fila: assets/cta/tarefas/{001-afazer,002-desenvolvendo,003-gerados}; tipos 001-inicio e 002-final.
- Identidade tipo + <id>-<tema>, sem ID numérico duplicado dentro do tipo entre pastas existentes.
- Localização da pasta determina estado. Sem catálogo externo de concluídos; excluir gerados/tipo não quebra fila. Recriar destinos quando necessários.
- Usuário fornece somente 1-audio.mp3, 2-video.mp4, 3-arte.png. Arte livre; início e final em 0s, independentemente da fala.
- Modelos brand/cta-inicio.json e brand/cta-encerramento.json são objetos compartilhados; config.json contém valores medidos e referência da saída por tarefa.
- Manifest/lock/journals são controles temporários de recuperação, não histórico. Limpar ao concluir; não gerar validation.json, visual-review.json, transcript.json ou snapshots de versões.
- Hashes protegem originais e retomada; safe, escrita atômica, lock e transições recuperáveis impedem escapes, colisões e duplicação. Não remover lock de processo vivo.
- Render temporário → validação técnica em memória → promoção → gerados. Preservar MP4 anteriores e originais.
- Revisão visual e de áudio pelo usuário. Checagem automática rápida via FFprobe; sem comparação PCM, decode completo ou extração de quadros.
- Sem previews, stills ou capas em disco. Compartilhar BebelCtaScene entre BebelInicio e BebelEncerramento.

Teste recuperação/invariantes ao mudar persistência e execute lint/typecheck. Não gerar vídeo quando o usuário pedir apenas ajustes do sistema. Não adicionar API, catálogo, banco, dashboard ou publicação. Preserve histórico anterior fora do fluxo ativo.
