# Contrato ativo

Persona completa compartilhada em brand/persona-bebel.md, conectada a brand/identidade-bebel.md. Referências únicas em assets/referencias usadas por vídeo, carrossel e SDD do projeto pai. Origem .spec/ui-references consolidada por hashes; consumidores ativos atualizados. Skills consultam por demanda e respeitam formato/direção específica.

Fábrica Remotion existente; CTA estável e cena 1 de teste do miolo com camadas independentes.
Fila: assets/cta/tarefas/{001-afazer,002-desenvolvendo,003-gerados}.
Tipos: 001-inicio e 002-final. A localização da pasta é a autoridade do estado.
Modelos compartilhados em brand/cta-inicio.json e brand/cta-encerramento.json.

Mídia reutilizável em bancos: assets/{cenario,personagem,itens,fontes,logos,referencias}.
Cada cena em assets/cenas/<id>/ com roteiro.md, audio.mp3 e diagnosticos/; a cena referencia o banco, sem duplicar mídia.
Montagem (marcadores, posições, títulos) em src/data; render copia banco+cena para public/cenas/<id>/.
Esse é o protótipo preservado; fluxo ativo usa bebel-producao em três pedidos separados: roteiro, audio-imagens e video, com prompts numerados em assets/cenas e índice PROMPT.md. Modos completo/preparar foram retirados; lote pronto continua com bebel-cena. CTA usa assets/cta/PROMPT.md. Prompts separados de preparação/processamento são opcionais.

Início e final aceitam arte livre e entram em 0s, independentemente da narração. Revisão visual e de áudio é responsabilidade do usuário,
sem campo safeBottom, transcrição obrigatória para início ou evidências por vídeo.

Concluído preserva originais, config.json editável e output/MP4.
Controles temporários recuperam falhas e são removidos após a conclusão.
Validação técnica permanece automática, com resultado em memória/terminal.
Sem previews, relatórios, histórico operacional ou aprovação automática.

SDD descreve o sistema, nunca a fila ou a existência de entregas.
brand/temas-utilizados.json é memória editorial autorizada: categorias/persona e ID/tema/resumo/data de roteiros escritos. Não controla entregas/aprovação, não exige vídeos antigos, evita reciclar IDs e orienta temas automáticos. Histórico editorial permanece mesmo ao apagar produções.
Excluir conteúdos/tipos de 003-gerados não gera pendência; não há inventário externo.
Histórico anterior em history permanece preservado, fora do fluxo ativo.
Miolo agora usa fila por tema em assets/cenas/tarefas/{001-afazer,002-desenvolvendo,003-gerados}/ID-tema, sem tipos início/final.
Preparação recebe tema/duração; agente escreve roteiro.md com Narração e direção de cenas. Reutiliza bancos e gera imagens essenciais ausentes via imagegen, salvando em assets/cenario, personagem ou itens. Áudio fornecido enquanto voz desligada; quando habilitada/configurada, prompt de preparação autoriza geração ElevenLabs. Fila de render não gera mídia.
Agente monta montagem.json usando bancos existentes; BebelMioloTema renderiza múltiplas cenas com uma única narração contínua.
Comandos cenas:* reservam, retomam, renderizam, validam tecnicamente e promovem. Lock separado do CTA; controles temporários e ausência de inventário externo seguem o contrato CTA.
Provider de voz ElevenLabs preparado, desligado por padrão; geração exige comando --generate, chave e voz configuradas. Processar a fila nunca chama API paga.
Fundos de mesmo caminho/nome-base priorizam vídeo sobre imagem no motor; mídia resolvida entra nos hashes e invalida bloqueio/cache. Cena 1, composições e diagnósticos anteriores ficam preservados. Organização adicional dos bancos, dashboard e publicação estão fora desta etapa.
