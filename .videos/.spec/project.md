# Contrato ativo

Fábrica Remotion existente; CTA estável e cena 1 de teste do miolo com camadas independentes.
Fila: assets/cta/tarefas/{001-afazer,002-desenvolvendo,003-gerados}.
Tipos: 001-inicio e 002-final. A localização da pasta é a autoridade do estado.
Modelos compartilhados em brand/cta-inicio.json e brand/cta-encerramento.json.

Mídia reutilizável em bancos: assets/{cenario,personagem,itens,fontes,logos,referencias}.
Cada cena em assets/cenas/<id>/ com roteiro.md, audio.mp3 e diagnosticos/; a cena referencia o banco, sem duplicar mídia.
Montagem (marcadores, posições, títulos) em src/data; render copia banco+cena para public/cenas/<id>/.
Fluxo da cena pela skill bebel-cena e prompts/criar-cena.md; diagnóstico numerado não sobrescreve nem aprova. CTA mantém assets/cta/.

Início e final aceitam arte livre e entram em 0s, independentemente da narração. Revisão visual e de áudio é responsabilidade do usuário,
sem campo safeBottom, transcrição obrigatória para início ou evidências por vídeo.

Concluído preserva originais, config.json editável e output/MP4.
Controles temporários recuperam falhas e são removidos após a conclusão.
Validação técnica permanece automática, com resultado em memória/terminal.
Sem previews, relatórios, histórico operacional ou aprovação automática.

SDD descreve o sistema, nunca a fila ou a existência de entregas.
Excluir conteúdos/tipos de 003-gerados não gera pendência; não há inventário externo.
Histórico anterior em history permanece preservado, fora do fluxo ativo.
Miolo limitado ao diagnóstico da cena 1. Dashboard, publicação e automação ampla do miolo ficam fora desta etapa.
