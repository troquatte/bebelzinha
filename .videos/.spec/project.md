# Contrato ativo

Fábrica Remotion existente; escopo somente CTA com três entradas por tema.
Fila: assets/cta/tarefas/{001-afazer,002-desenvolvendo,003-gerados}.
Tipos: 001-inicio e 002-final. A localização da pasta é a autoridade do estado.
Modelos compartilhados em brand/cta-inicio.json e brand/cta-encerramento.json.

Início e final aceitam arte livre e entram em 0s, independentemente da narração. Revisão visual e de áudio é responsabilidade do usuário,
sem campo safeBottom, transcrição obrigatória para início ou evidências por vídeo.

Concluído preserva originais, config.json editável e output/MP4.
Controles temporários recuperam falhas e são removidos após a conclusão.
Validação técnica permanece automática, com resultado em memória/terminal.
Sem previews, relatórios, histórico operacional ou aprovação automática.

SDD descreve o sistema, nunca a fila ou a existência de entregas.
Excluir conteúdos/tipos de 003-gerados não gera pendência; não há inventário externo.
Histórico anterior em history permanece preservado, fora do fluxo ativo.
Miolo, dashboard, publicação e automação contínua ficam fora desta etapa.
