---
name: bebel-fabrica-arquitetura
description: Manter contratos e recuperação compartilhados dos motores CTA e miolo; não usar em cada produção.
---

Em mudanças do motor, leia README, módulos afetados e storage se persistência mudar. Use bebel-fabrica-sdd para alterações do sistema; produção comum usa bebel-cta ou bebel-cena.

CTA: assets/cta/tarefas/{001-afazer,002-desenvolvendo,003-gerados}/{001-inicio,002-final}/ID-tema. Identidade tipo+ID, sem duplicação numérica dentro do tipo. Três entradas 1-audio.mp3,2-video.mp4,3-arte.png; início/final arte livre em0s. Modelos objetos compartilhados brand/cta-inicio.json e cta-encerramento.json; config.json por tarefa. BebelCtaScene compartilhada, composições existentes preservadas.

Miolo: assets/cenas/tarefas/{001-afazer,002-desenvolvendo,003-gerados}/ID-tema, sem tipos; IDs únicos conforme pastas e memória editorial, sem reutilizar IDs de entregas apagadas. Preparação por tema gera roteiro.md pelo agente e imagens essenciais via imagegen; áudio fornecido ou ElevenLabs quando habilitado; agente monta montagem.json com referências aos bancos atuais. BebelMioloTema suporta cenas contíguas, uma narração integral e marcadores locais. Não criar código por produção. Preservar BebelMioloCena01 e diagnóstico original.

Localização determina estado. Sem catálogo externo de concluídos; excluir gerados não quebra fila. Recriar destinos necessários. safe, escrita atômica, hashes, locks por recurso e journals temporários protegem escapes, colisões, concorrência e retomada. Lock assíncrono só libera após conclusão. Não remover lock de processo vivo.

Render temporário → checagem técnica em memória → promoção numerada → gerados → limpeza. Preservar originais/MP4 e versões de revisões autorizadas. Limpar staging, runtime e controles concluídos; não gerar relatórios, previews, históricos operacionais, validation.json, transcript.json ou snapshots por tarefa. Montagem/config editável conserva referência da saída. Revisão visual/áudio pelo usuário; FFprobe rápido, sem comparação PCM de saída ou decode completo rotineiros.

ElevenLabs é adaptador explícito: provider conforme brand/narracao.json, geração somente quando habilitada e autorizada, chave no ambiente, voz configurável, velocidade1, áudio existente preservado. Processamento da fila não chama API. Requisição incerta não é repetida automaticamente; proteger custos e nunca registrar chave. Imagens da preparação ficam nos bancos existentes, importação sem sobrescrever. Fundo resolve mesmo nome-base em runtime, vídeos MP4/WebM/MOV antes de imagens; a mudança invalida cache/bloqueio. Sem API pública, catálogo, dashboard ou publicação.

Teste invariantes/recuperação ao mudar persistência; lint/typecheck e regressão CTA. Diagnóstico de sistema isolado quando pertinente e autorizado; nunca renderizar se usuário pedir apenas análise/ajustes sem vídeo. Preserve histórico anterior fora do fluxo.
