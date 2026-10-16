---
name: bebel-voz
description: Preparar a narração da Bebel com áudio fornecido ou ElevenLabs explicitamente habilitado, preservando fala e evitando gerações duplicadas.
---

Receba ID e roteiro completo. Use a persona em brand/identidade-bebel.md e o fechamento da rota confirmada (brand/formato-reels-bebel.md no vertical; brand/formato-youtube-bebel.md no horizontal) sem reescrever silenciosamente a fala. A voz real é configurada em brand/narracao.json; não escolher/clonar outra voz ou inferir sotaque da imagem.

Use cenas:prepare quando necessário. cenas:audio sem --generate não faz chamada paga. audio.mp3 existente tem prioridade: preserve e confira correspondência com ## Narração. Divergência conhecida é pendência, não motivo para adaptar outro roteiro ao áudio.

Sem áudio, consulte cenas:voice-status e brand/narracao.json. Provedor desligado/provided: informe o caminho esperado. ElevenLabs exige configuração/chave/voz e autorização de geração no pedido (o prompt 02-audio-imagens autoriza quando habilitado). Roteiro ou render isolado não autorizam voz. Não ativar provedor nem comprar créditos automaticamente.

Autorizado: cenas:audio --task ID --generate, somente a seção Narração integral, uma faixa contínua em velocidade 1. Preserve configuração escolhida: Rivs, eleven_multilingual_v2, stability 0.30, similarity_boost 0.85, style 0.45 e speaker boost ligado. A aceleração final 1.2× pertence ao motor; não duplicar na API.

Use timestamps retornados ou transcrição local disponível para marcadores reais. Retorne áudio/timings ou pendência, sem transcrição/relatório em disco. Requisição incerta exige conferir recuperação/provedor antes de --retry-request, com autorização específica; não repetir cobrança automaticamente. Chave somente no ambiente/.env ignorado, nunca em JSON, logs ou resposta. Sem render ou próxima etapa.
