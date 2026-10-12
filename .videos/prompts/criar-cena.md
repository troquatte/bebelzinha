Use $bebel-cena para criar UMA cena a partir de assets/cenas/<id>/ (roteiro.md, audio.mp3, montagem).
Retome o desenvolvimento antes de refazer e use o motor existente.

Bancos de mídia reutilizáveis: assets/{cenario,personagem,itens,fontes,logos}. A cena referencia o banco; não duplicar mídia.

Estrutura de Reel: chamada -> começo -> meio -> fim (CTA), com hold final; nada fora do roteiro.
Vertical 1080x1920/30fps; áudio integral 1x; fundo mudo com rate ajustado; marcadores/posições/títulos no montagem (src/data).

Motion: entradas 0.44–0.48s; poses com fade curto sem sobreposição; título em cascata por linha; ênfase por scale/glow que segue a silhueta; sem retângulos embutidos.

Montar, npm run lint e render diagnóstico numerado (npm run miolo:cena1); não sobrescreve nem aprova.
Faça apenas a checagem técnica rápida; eu revisarei imagem e áudio.

Economize tokens: sem inspeção visual do agente, prévias, relatórios, evidências ou atualização da SDD por vídeo.
Preserve originais, diagnósticos e composições anteriores. Não publique nem aprove.
Responda somente com o caminho do MP4 e pendências.

Personagem: sem pulsada, quique ou escala animada. Entrada suave de40% a100% em0.32s;
saída de100% a45% em0.28s antes da troca. Uma pose por vez, rosto alinhado e sem braços sobrepostos.

Títulos: uma caixa roxa translúcida por linha, gap4px, texto branco Roboto900 de100px em todas as linhas.
Entrada em cascata (intervalo0.16s), fade e movimento curto com acomodação discreta única; sem pulsação contínua.
Caixa e texto animados juntos; não usar tamanhos diferentes entre linhas. Personagem continua só com fade40→100/100→45.
