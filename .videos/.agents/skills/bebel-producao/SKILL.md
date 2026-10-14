---
name: bebel-producao
description: Coordenar o miolo da Bebel em três pedidos separados — roteiro, áudio e imagens, e vídeo; retomar o mesmo ID sem avançar além da etapa solicitada.
---

Coordene somente as etapas autorizadas. Os prompts em assets/cenas/01-roteiro.md, 02-audio-imagens.md e 03-video.md continuam sendo o fluxo padrão. Sem etapa explícita, prepare apenas roteiro; um pedido explícito de produção completa autoriza encadear as três etapas, sem aprovações intermediárias inventadas.

Leia brand/identidade-bebel.md e brand/formato-reels-bebel.md uma vez por produção; carregue apenas a skill da etapa. Skills são instruções do mesmo agente, sem criar chats ou subagentes.

1. roteiro → bebel-editorial: tema, roteiro.md, legenda.md e registro editorial. RETOMAR com ID reutiliza a tarefa; novo cria outra. Sem mídia ou render.
2. audio-imagens → ID existente obrigatório. bebel-voz primeiro: preserve áudio válido ou gere somente com provedor habilitado e autorização no pedido. Sem áudio, informe o caminho esperado antes de gerar imagens. Identifique tempos reais; depois bebel-midia reutiliza/gera camadas essenciais e pode preencher montagem.json. Sem MP4.
3. video → ID existente obrigatório. bebel-cena monta/processa somente a tarefa com roteiro, áudio e materiais prontos. Não gerar voz/imagens nem reescrever fala nesta etapa.

Respeite os pontos de parada do pedido. Retome arquivos válidos sem repetir geração; divergência entre roteiro, voz e montagem é pendência explícita. Uma revisão autorizada preserva MP4/entradas anteriores e usa a próxima versão livre pelos comandos existentes; não sobrescrever nem reabrir gerados automaticamente. Apagar entregas não apaga memória editorial.

Sem publicação, aprovação automática, previews, relatórios ou SDD por vídeo. Revisão visual/áudio pelo usuário. Entregue caminhos e pendências reais, sem afirmar checagens não feitas.
