# Memória editorial

Um JSON brand/temas-utilizados.json reúne personalidade, categorias, limites e temas usados. Prompt de preparação escolhe tema automático ou segue tema fornecido, evita repetição semântica pelo agente e registra somente roteiro já escrito. CLI recusa categoria desconhecida, título repetido sem autorização e alteração de ID registrado; retomada idempotente. Próximo ID considera a memória para não reciclar IDs apagados.

Campos por ideia: ID, tema, categoria, resumo curto, data. Não é inventário de vídeos; não contém aprovação, estado de fila ou existência de saída. Apagar entregas não altera memória nem cria pendência. Base inicia vazia, sem migração histórica implícita. Preservar arquitetura, CTA e controles existentes. Não gerar conteúdo ou chamar provedores nesta alteração.
