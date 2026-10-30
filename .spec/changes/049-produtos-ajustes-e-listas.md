# Ajustes da apresentação e listas de refeições

29/10/2026. Remover aviso de prévia e card do prato; preparar vídeo opcional sem gerar mídia. Numerar passos e espaçar título, centralizar rodapé e preço, texto/ícone brancos no CTA principal. Código salvo redireciona entrada de produtos/acesso para refeições. Parâmetro explícito apresentacao=1 permite revisar a apresentação mesmo com código salvo, sem alterar proteção do conteúdo pago.

Listas: o protótipo criava listas gerais ao visitar dias/modos. Identificar novas listas com source dinner-plan; reconhecer antigas somente por IDs do vínculo persistido, sem inferir pelo nome. Mantê-las no mesmo armazenamento e com itens/marcações intactos, mas separar as listas de refeições das manuais na API do store. Não excluir nem limpar localStorage.


## Verificação concluída
Build Angular aprovado, com avisos de estilos/CommonJS já existentes. Teste isolado do ShoppingStore aprovado: vínculo por ID, nenhuma classificação por nome, listas/itens pessoais intactos, marcações persistidas e repetição de listas pessoais funcionando. Navegador: listas automáticas saíram de compras gerais, continuaram presentes na receita; visitar Dia 20 não repovoou compras. Entrada acesso?dia=20 com código salvo abriu jantar-resolvido?dia=20. Apresentação explícita em apresentacao=1 conferida em 390 px sem overflow: card e aviso removidos, lista decimal com 20px de margem, preço e rodapé centralizados, CTA principal branco. Vídeo não produzido: configuração opcional de vídeo vertical preparada e invisível sem mídia.
