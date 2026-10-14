---
name: bebel-midia
description: Resolver cenários, poses e objetos do roteiro da Bebel, reutilizando bancos e gerando apenas imagens essenciais ausentes nas pastas corretas.
---

Receba ID, roteiro revisado, áudio real e tempos disponíveis. Sem áudio, informe pendência antes de gerar imagens. Use brand/identidade-bebel.md e brand/formato-reels-bebel.md; não alterar narração ou inventar marcadores.

Procure primeiro camadas pertinentes nos bancos assets/{cenario,personagem,itens,fontes,logos,referencias}, inclusive materiais de produções anteriores. Inspecione candidatos relevantes para conteúdo, identidade, enquadramento e transparência. Reuse arquivos que servem; não duplicar por tema/nome. Preserve bancos e versões, sem migração durante produção.

Fundo de mesmo caminho/nome-base: MP4/WebM/MOV tem prioridade sobre PNG/JPG/JPEG/WebP. Nomes parecidos não formam par. Vídeo inválido bloqueia, sem fallback silencioso. Vídeo só é suportado como fundo; pose/objeto em vídeo essencial exige informar limitação. Sem geração de vídeo.

Camada essencial ausente: use imagegen e suas instruções, com referências visuais reais anexadas. Sem identidade/acesso suficiente, informe item exato; não substituir por personagem genérica, SVG/CSS culinário ou composição inteira. Cenário separado; poses/objetos com transparência e sem texto embutido. Não gerar logo novo.

Planeje variantes somente para mudanças de gesto/expressão/estado que a narrativa exige; busque-as no banco antes de gerar. Não impor duas variantes a todo objeto. Grupos de três alimentos são preferência quando coerentes, nunca ingredientes extras para completar contagem. Mantenha câmera/material/proporções entre estados e objetos grandes, à frente da Bebel quando compartilham enquadramento.

Importe o arquivo real retornado: cenas:asset --source <PNG> --kind cenario|personagem|itens --name slug. Referencie caminhos dos bancos em roteiro/montagem; não deixar dependência só na pasta de geração. Confira transparência das camadas novas. Sem previews ou inventários extras, voz/render ou geração duplicada na retomada. Entregue caminhos e pendências.
