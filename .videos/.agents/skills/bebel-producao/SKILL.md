---
name: bebel-producao
description: Coordenar roteiro, áudio/imagens e vídeo da Bebel; executar somente as etapas autorizadas, incluindo produção completa quando solicitada, retomando o mesmo ID.
---

Para pedido de carrossel, usar bebelsabetudo-carrossel-img: roteiro, imagens e legenda na mesma fila de pastas dos vídeos, com tipo carousel e manifesto carrossel.json. Procedimento em assets/cenas/PUBLICACAO.md; não perguntar vertical/horizontal nem gerar voz/MP4 para carrossel. IDs/memória editorial são compartilhados; aprovação preserva ordem, imagens e legenda. Carrossel vai somente para Instagram e tem horários independentes dos curtos. Não migrar históricos automaticamente.

Antes de criar uma nova produção, confirme plataforma, orientação e profundidade do conteúdo. Se faltar informação, pergunte em uma única mensagem: “É para Instagram vertical ou YouTube horizontal? Você quer um conteúdo curto e direto ou mais completo?”. Se o pedido/contexto já definir esses dados, não pergunte novamente. Instagram vertical e YouTube horizontal são rotas preferidas, não restrições: YouTube também pode receber Shorts. Curto/completo orienta o roteiro; duração acompanha a necessidade real, sem trava de segundos. Não criar tarefa nem gerar mídia enquanto o briefing essencial estiver pendente ou o usuário pedir conversar antes.

Para YouTube, consulte brand/youtube-videos.json junto de brand/temas-utilizados.json; registre plataforma/orientação/profundidade e IDs de origem quando adaptar conteúdos. O JSON é memória editorial e de publicação/métricas, não substitui o estado das pastas da fila. Não inferir publicação, aprovação ou métricas ausentes; não retomar rascunhos com productionAuthorizedNow=false sem autorização posterior do usuário. A rota horizontal usa a composição própria BebelYoutubeMotion, conforme brand/formato-youtube-bebel.md; não esticar/cortar automaticamente o vertical nem usar o exportador vertical.

Coordene somente as etapas autorizadas. Modelos de pedido estão em assets/cenas/PROMPT.md; 01-roteiro.md, 02-audio-imagens.md e 03-video.md permitem revisar entre etapas. Um pedido claro de vídeo pronto, como “faça outro Reels”, autoriza encadear roteiro, áudio/imagens e MP4 com os recursos já habilitados; não exigir a expressão “produção completa” nem inventar aprovações intermediárias. Pedido apenas de roteiro ou de uma etapa respeita esse limite. Perguntas ou pedidos para conversar antes não autorizam gerar mídia.

Interação regional aprovada pelo usuário no formato com mapa: nos novos Reels/Shorts e vídeos horizontais, planejar uma pergunta falada breve no meio narrativo/ponto de expectativa, com mapa animado e convite para comentar a região. Seguir a direção da plataforma em brand/formato-reels-bebel.md ou brand/formato-youtube-bebel.md; pergunta, posição e duração acompanham cada roteiro, sem copiar os nomes/tema da receita anterior. Retomar explicitamente o conteúdo, preservar o seguir/inscrever final, o rosto livre e as rotas separadas. Aprovação criativa não comprova ganho de retenção.

Leia brand/identidade-bebel.md e somente a direção da rota confirmada (brand/formato-reels-bebel.md ou brand/formato-youtube-bebel.md) uma vez por produção; carregue apenas a skill da etapa. Skills são instruções do mesmo agente, sem criar chats ou subagentes.

## Execução econômica, preservando a qualidade

- Leia regras compartilhadas e direção do formato uma vez por produção; carregue a skill de cada etapa ao entrar nela. Releia somente trechos necessários após mudança, perda de contexto ou dúvida concreta.
- Consulte bancos por campos/registros pertinentes: histórico suficiente para detectar repetição, disponibilidade/rotação de fundos e tarefa atual. Evite imprimir JSONs, scripts e documentos completos quando uma consulta pontual bastar.
- Filtre retornos do Postiz para contas, IDs, horários, estados e erros necessários à decisão. Preserve comprovantes locais e não oculte falhas parciais; continue consultando calendário e regras reais antes do envio conforme PUBLICACAO.md.
- Reutilize comandos e renderizadores existentes. Crie ou altere ferramentas somente quando faltar capacidade ou houver defeito, sem reconstruir o fluxo a cada vídeo.
- Acompanhe renderizações com consultas espaçadas, normalmente 30–60 s, ajustando à duração e às falhas; mantenha atualizações úteis ao usuário. Amplie diagnóstico somente diante de dúvida ou problema concreto.
- Economia de contexto não autoriza simplificar roteiro, omitir etapas da receita, gerar menos estados visuais necessários ou mudar motion, voz, duração narrativa e identidade aprovados. Preserve pesquisa necessária, inspeção de referências/imagens, transparência real dos PNGs, checagem técnica do MP4, aprovação explícita e confirmação remota do agendamento.
- Entregue mídia, legenda e status de forma curta. Este bloco não cria meta fixa de tokens, garantia de economia nem obrigação de gerar previews, relatórios ou testes extras por vídeo.

1. roteiro → bebel-editorial: tema, roteiro.md, legenda.md e registro editorial. RETOMAR com ID reutiliza a tarefa; novo cria outra. Sem mídia ou render.
2. audio-imagens → ID existente obrigatório. bebel-voz primeiro: preserve áudio válido ou gere somente com provedor habilitado e autorização no pedido. Sem áudio, informe o caminho esperado antes de gerar imagens. Identifique tempos reais; depois bebel-midia reutiliza/gera camadas essenciais e pode preencher montagem.json. Sem MP4.
3. video → ID existente obrigatório. bebel-cena monta/processa somente a tarefa com roteiro, áudio e materiais prontos. Não gerar voz/imagens nem reescrever fala nesta etapa.

Respeite os pontos de parada do pedido. Retome arquivos válidos sem repetir geração; divergência entre roteiro, voz e montagem é pendência explícita. Uma revisão autorizada preserva MP4/entradas anteriores e usa a próxima versão livre pelos comandos existentes; não sobrescrever nem reabrir gerados automaticamente. Apagar entregas não apaga memória editorial.

Gerar vídeo não aprova nem publica. Sem aprovação automática, previews, relatórios ou SDD por vídeo. Revisão visual/áudio pelo usuário. Depois de aprovação explícita de ID/versão, seguir assets/cenas/PUBLICACAO.md e brand/publicacao.json: mover para 004-aprovados e agendar no Postiz quando conectado, sem pedir autorização repetida para o envio já solicitado. 005-postados exige confirmação remota de todos os destinos; agendado ou sucesso parcial fica em aprovados. Não inferir aprovação por elogio ambíguo. Entregue caminhos e pendências reais, sem afirmar checagens não feitas.

Entrega padrão local: MP4 e pacote textual na tarefa. Sincronização/envio ao Google Drive foi cancelado pelo usuário; não retomar automaticamente nem apagar arquivos locais para liberar espaço. Postiz foi autorizado como destino após aprovação, conforme PUBLICACAO.md; isso não reativa o Google Drive.

Todo vídeo/carrossel deve incluir legenda pronta e, para YouTube, descrição adaptada. Seguir brand/publicacao.json → publicCopyPolicy: sem links de referência nos textos públicos por enquanto; fontes internas preservadas. Links do app só após autorização e URL real.

Entrega YouTube: além do MP4, incluir título pesquisável, capa final, descrição pronta e capítulos quando aplicáveis. A editorial prepara a busca, promessa, direção de capa e estrutura; mídia cria a capa na etapa autorizada; vídeo atualiza capítulos com tempos reais da exportação. Detalhes em bebel-editorial e brand/youtube-videos.json. Um pedido apenas de roteiro entrega a proposta de capa, sem gerar imagem ou vídeo.

Duas direções criativas salvas: Instagram vertical → brand/formato-reels-bebel.md (referência 035); YouTube horizontal → brand/formato-youtube-bebel.md (motion 036-0002 e referência de conteúdo completo 038). Consultar apenas a direção correspondente ao briefing. Bancos visuais e persona compartilhados; memória YouTube separada e vinculada à editorial global.

Padrão editorial para toda plataforma: evergreen, conforme brand/temas-utilizados.json → editorial.contentPolicy e bebel-editorial. Instagram Reels, YouTube Shorts, TikTok vertical e YouTube horizontal usam essa política, mantendo suas direções visuais e profundidades próprias. Pedido explícito de tendência, sazonalidade, notícia/campanha ou outro tipo substitui o padrão naquela produção; não pedir confirmação para a exceção solicitada. SEO pertence ao roteiro e ao pacote textual de cada plataforma, sem alterar o motion aprovado.

Ambientes usam rotação compartilhada em brand/cenarios-utilizados.json: a etapa de mídia escolhe entre fundos pertinentes/compatíveis e a etapa de vídeo registra o uso confirmado. A política vale entre plataformas, preservando continuidade dentro de cada produção e as direções aprovadas.

Reels mantêm Bebel + objetos sem braços como base. A política de ações com mãos do YouTube 038 pertence ao horizontal; no vertical, mãos só em close isolado natural quando ajudarem, conforme bebel-midia e a correção 039. Aprovação de uma extensão no YouTube não autoriza copiá-la para os curtos.
