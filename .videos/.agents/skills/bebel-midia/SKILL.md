---
name: bebel-midia
description: Resolver cenários, poses e objetos do roteiro da Bebel, reutilizando bancos e gerando apenas imagens essenciais ausentes nas pastas corretas.
---

Receba ID, roteiro revisado, áudio real e tempos disponíveis. Sem áudio, informe pendência antes de gerar imagens. Use brand/identidade-bebel.md e a direção da rota confirmada: brand/formato-reels-bebel.md para Reels/Shorts no formato vertical aprovado; brand/formato-youtube-bebel.md para YouTube horizontal completo; não alterar narração ou inventar marcadores.

Procure primeiro camadas pertinentes nos bancos assets/{cenario,personagem,itens,fontes,logos,referencias}, inclusive materiais de produções anteriores. Inspecione candidatos relevantes para conteúdo, identidade, enquadramento e transparência. Reuse arquivos que servem; não duplicar por tema/nome. Preserve bancos e versões, sem migração durante produção.

Fundo de mesmo caminho/nome-base: MP4/WebM/MOV tem prioridade sobre PNG/JPG/JPEG/WebP. Nomes parecidos não formam par. Vídeo inválido bloqueia, sem fallback silencioso. Vídeo só é suportado como fundo; pose/objeto em vídeo essencial exige informar limitação. Sem geração de vídeo.

Camada essencial ausente: use imagegen e suas instruções, com referências visuais reais anexadas. Sem identidade/acesso suficiente, informe item exato; não substituir por personagem genérica, SVG/CSS culinário ou composição inteira. Cenário separado; poses/objetos com transparência e sem texto embutido. Não gerar logo novo.

Planeje variantes somente para mudanças de gesto/expressão/estado que a narrativa exige; busque-as no banco antes de gerar. Não impor duas variantes a todo objeto. Grupos de três alimentos são preferência quando coerentes, nunca ingredientes extras para completar contagem. Mantenha câmera/material/proporções entre estados e objetos grandes, à frente da Bebel quando compartilham enquadramento. Em receitas, conferir ingredientes e estado do preparo contra o roteiro: não acrescentar sementes, ervas ou outros ingredientes como enfeite quando não pertencem à receita.

Importe o arquivo real retornado: cenas:asset --source <PNG> --kind cenario|personagem|itens --name slug. Referencie caminhos dos bancos em roteiro/montagem; não deixar dependência só na pasta de geração. Confira transparência das camadas novas. Sem previews ou inventários extras, voz/render ou geração duplicada na retomada. Entregue caminhos e pendências.

## Imagens por formato
Reels/Shorts/TikTok vertical: manter a referência 035, com Bebel original + objetos/estados sem mãos extras. Planos da personagem e closes de objetos não recebem braços soltos laterais. Mãos são permitidas em close isolado de uma ação clara, com enquadramento natural e sem pose da Bebel sobreposta; exemplo aprovado: assets/itens/papel-toalha-umido-maos.png. Para a tábua, usar assets/itens/tabua-papel-toalha-sem-bracos.png. A variante assets/itens/tabua-papel-toalha-teste-firmeza.png foi rejeitada para esses planos verticais; preservar no banco sem selecioná-la automaticamente para Reels.

Não importar a obrigação de mãos/braços da execução YouTube 038 para os curtos. A separação está em brand/formato-reels-bebel.md → Correção 039. Conferir se o conjunto pose + objeto cria membros duplicados ou braços sem origem; corrigir a camada antes de renderizar. O close isolado aprovado não autoriza mãos adicionais em todos os objetos.

YouTube horizontal completo: seguir a execução ilustrada aprovada do 038 em brand/formato-youtube-bebel.md. Resolver camadas das ações essenciais (mãos, utensílio em contato e etapa intermediária), com continuidade de ingrediente/recipiente. Conferir coerência física antes de importar: tampa retirada ao despejar, utensílio correto, quantidade e estado compatíveis com a fala. Reutilizar ações do banco e gerar apenas lacunas; não fixar oito imagens nem apresentar ilustração como filmagem real.

YouTube horizontal: quando a etapa de imagens/produção completa estiver autorizada, produzir também capa final 16:9 seguindo o briefing editorial: resultado em destaque, Bebel e poucas palavras legíveis em tamanho pequeno. Reutilizar bancos e compor texto editável sobre raster; capa é arte separada, não preview de QA nem texto embutido em pose/objeto do banco. Salvar capa.png na tarefa e registrar seu caminho no JSON do YouTube. Pedido apenas de roteiro entrega direção de capa, sem geração.

Rotação de cenários: consultar brand/cenarios-utilizados.json antes de escolher fundo. Filtrar por assunto, adequação visual e suporte da composição/formato; usar cada fundo elegível uma vez antes de repetir. Esgotado o conjunto, reiniciar rodada pelo menos recente, evitando o último quando houver alternativa. Só um adequado/continuidade/pedido específico permite exceção com motivo registrado; não gerar cenários desnecessários. PNG e vídeo de mesmo nome-base contam como um fundo, com prioridade de vídeo apenas quando o renderer realmente o suporta. Na tarefa registrar escolha, conjunto elegível, rodada e exceção; no banco confirmar uso apenas após exportação concluída. Não mudar a roupa da Bebel para cumprir rotação de cenário.

