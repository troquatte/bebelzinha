---
name: bebel-voz
description: Preparar a narração da Bebel com áudio fornecido ou ElevenLabs explicitamente habilitado, preservando fala e evitando gerações duplicadas.
---

Consulte Persona e escrita em brand/identidade-bebel.md para conferir que a fala vem do roteiro da Bebel, sem reescrevê-la silenciosamente. Preserve voz configurada; não inferir sotaque da imagem nem escolher/clonar uma voz nova. Texto de persona não vira trecho narrado.


Receba ID e roteiro completo da central. cenas:prepare reserva e prepara dados; cenas:audio sem --generate nunca faz chamada paga. audio.mp3 existente tem prioridade: preservar e conferir correspondência com fala sem reescrever roteiro para encaixar áudio de outra produção. Divergência conhecida é pendência.

Sem áudio, consulte cenas:voice-status e brand/narracao.json. Provider provided/desligado: informar caminho exato do audio.mp3 esperado; sem chamada externa. Provider elevenlabs exige chave/voz no ambiente e autorização de geração no pedido ou prompt invocado. Somente o pedido da etapa audio-imagens em assets/cenas/02-audio-imagens.md autoriza voz quando habilitada. Etapas roteiro e video não autorizam geração de voz. Não ativar provider, escolher/clonar voz ou comprar créditos automaticamente.

Autorizado/configurado: cenas:audio --task ID --generate. Somente seção Narração, integral, velocidade1, sem leitura de instruções; uma faixa contínua para todas as cenas. Comando preserva arquivo existente e retorna timestamps por palavra em memória para montagem. Chave somente no ambiente/.env ignorado; nunca no roteiro/JSON/logs/resposta.

Não repetir requisição incerta: conferir resultado no provedor antes de --retry-request, que exige autorização específica. Se há temporário pendente, recuperar antes de outra chamada; não apagar silenciosamente áudio recuperável. Retornar áudio/timestamps disponíveis ou pendência à central, sem arquivo de transcrição/relatório. Não renderizar nem chamar próxima skill.

Voz aprovada pelo usuário: manter Rivs / eleven_multilingual_v2, stability=0.45, similarity_boost=0.85, style=0.25, use_speaker_boost=true e speed=1. Configuração real em brand/narracao.json; não voltar aos valores antigos. A velocidade final1.2x é aplicada pelo motor ao áudio e vídeo juntos, sem duplicar aceleração na API.


Referência compartilhada do método atual: brand/formato-reels-bebel.md. Preserve o roteiro verificado e os marcadores reais da fala; não gerar novamente mídia válida.

