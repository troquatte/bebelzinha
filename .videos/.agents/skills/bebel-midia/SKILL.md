---
name: bebel-midia
description: Resolver cenários, poses e objetos do roteiro da Bebel, reutilizando bancos e gerando apenas imagens essenciais ausentes nas pastas corretas.
---

Consulte Referências visuais em brand/identidade-bebel.md. Para gerar ou derivar Bebel, inspecione a referência real pertinente e forneça-a à ferramenta, mantendo rosto, cabelo, óculos, roupa, proporções e estilo. Descrição textual ou nome do arquivo não substituem a referência visual. Não misturar versões divergentes silenciosamente.


Receba ID, roteiro revisado, áudio real e tempos disponíveis da central na etapa audio-imagens. Sem áudio, retornar pendência antes de gerar imagens; não atuar durante roteiro ou video. Adeque quantidade de cenas/camadas ao ritmo da fala, sem alterar a narração nem inventar timings. Leia apenas direção e bancos pertinentes: assets/{cenario,personagem,itens,fontes,logos,referencias}. Preserve todos os arquivos; não organizar/migrar bancos durante produção. Reutilize assets existentes antes de gerar.

Reuso antes de geração: para cada camada necessária, procure candidatos nos bancos compartilhados, inclusive assets de produções anteriores, usando nomes descritivos e direção do roteiro. Inspecione somente candidatos pertinentes para conferir conteúdo, identidade, proporções, transparência e possibilidade de uso no enquadramento. Se servir, referencie o arquivo existente; se não servir ou não existir, gere apenas a camada essencial faltante usando referências adequadas. Não regenerar para trocar nome ou porque o tema é novo. Referências compostas servem de identidade/inspiração, não automaticamente de pose/objeto isolado; não usar composição inteira no lugar das camadas. Vídeos existentes são reaproveitáveis como fundo; o motor atual não suporta vídeo como pose ou objeto. Se esse uso for essencial, informe a limitação em vez de substituir silenciosamente. Salve novas imagens com nomes descritivos no banco correto, preservando versões; outras IAs devem consultar esses mesmos bancos e esta regra, sem depender desta conversa.

Fundo: mesmo caminho e nome-base resolve vídeo MP4/WebM/MOV antes de imagem PNG/JPG/JPEG/WebP pelo motor. cozinha.mp4 vence cozinha.png; nomes parecidos são distintos. Não gerar imagem de fundo se vídeo correspondente já atender. Vídeo inválido é pendência, sem fallback silencioso. Sem geração de vídeo nesta etapa.

Imagem essencial ausente: use imagegen; siga sua skill e ferramenta disponível, sem fallback pago não autorizado. Inspecione apenas referências necessárias à geração. Para Bebel, use referências reais de identidade/pose, proporções e estilo; sem referência suficiente informe pendência em vez de personagem genérica. Gere camadas independentes: cenário sem personagem/objetos já previstos em outras camadas, personagem e objetos com transparência, sem texto embutido ou composição inteira. Não gerar logo novo.

Salve o arquivo real retornado pela ferramenta via cenas:asset --source <PNG> --kind cenario|personagem|itens --name slug. Fundo fica em assets/cenario; poses em assets/personagem; objetos em assets/itens. Nunca deixar asset referenciado só no diretório de geração. Importação preserva versões e reaproveita hash idêntico. Confira transparência necessária à camada nova; não criar PNG/JPG de preview.

Anote caminhos escolhidos na direção de roteiro/montagem, sem alterar fala nem criar inventário/relatório extra. Se montagem já pronta e asset correto existe, reutilize. Informe à central paths e pendência exata. Não chamar voz/render nem gastar geração novamente na retomada.


Variações para animação: planejar duas variantes utilizáveis por personagem/item relevante, em vez de uma pose única, quando houver mudança de expressão, gesto ou estado na narrativa. Primeiro procurar as duas no banco; se faltarem, gerar as variantes necessárias na etapa2, com identidade/proporções/enquadramento consistentes e transparência. Ex.: Bebel olhando e apontando; item fechado e aberto quando fizer sentido. Uma duplicata idêntica não conta como variante, exceto quando o roteiro pede dois objetos iguais. Não criar diferenças arbitrárias que contradigam a fala. Nomear claramente cada pose/estado e manter camadas independentes. Planejar mais itens visíveis quando contribuírem para a ação, sem preencher a tela com objetos irrelevantes.


Composição com alimentos: quando houver alimentos em destaque, planejar grupo de três alimentos por composição, se fizer sentido para a narrativa e o espaço. Evitar padrão automático de duplas que entram e somem juntas. Reutilizar o terceiro alimento do banco quando coerente; gerar apenas se essencial e ausente. Não inventar ingrediente obrigatório de receita nem usar alimento sem relação só para completar número. Manter itens grandes/legíveis e preservar rosto da Bebel. Uma mesma composição pode manter um alimento de apoio enquanto outros entram suavemente.

Cenários podem mudar entre cenas quando a narrativa justificar. Escolher fundo coerente no banco, com vídeo de mesmo nome-base prioritário; preservar identidade, enquadramento e legibilidade. Fazer transição suave, sem zoom artificial ou cortes bruscos, sem trocar apenas para criar movimento. Se faltar cenário essencial, resolver na etapa de mídia com referências adequadas.


Padrão atual: consultar brand/formato-reels-bebel.md uma vez por produção; referência principal é a produção011, convertido-0003. Essa orientação prevalece sobre o teste da alface, closes sem personagem e duração rígida antiga. Manter as travas e o CTA curto definido em brand/miolo.json.



Acabamento culinário: imagens raster profissionais dos estados, mesma panela/câmera e transições suaves. No preparo de pratos, Bebel atrás da panela em TODAS as etapas, rosto livre e comida em destaque. Não usar os vetores culinários antigos como referência. Detalhes e banco de reuso em brand/formato-reels-bebel.md.


