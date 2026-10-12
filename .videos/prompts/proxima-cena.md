Use $bebel-cena para criar a próxima cena, ex.: cena-02, a partir de assets/cenas/<id>/ (roteiro.md, audio.mp3).
Retome o desenvolvimento antes de refazer e use o motor existente.

Crie o que faltar para a cena nova: pasta assets/cenas/<id>/, componente em src/scenes/, Composition no src/Root.tsx,
montagem em src/data, script de render em scripts/ e a entrada correspondente em package.json.
A cena referencia os bancos assets/{cenario,personagem,itens,fontes,logos}; não duplicar mídia.

Estrutura de Reel: chamada -> começo -> meio -> fim (CTA), com hold final; nada fora do roteiro.
Vertical 1080x1920/30fps; áudio integral 1x; fundo mudo com rate ajustado; marcadores/posições/títulos no montagem.
Motion: entradas 0.44–0.48s; poses com fade curto sem sobreposição; título em cascata por linha; ênfase por scale/glow que segue a silhueta; sem retângulos embutidos.

Rodar npm run lint e o render de diagnóstico numerado da cena; não sobrescreve nem aprova.
Faça apenas a checagem técnica rápida; eu revisarei imagem e áudio.

Economize tokens: sem inspeção visual do agente, prévias, relatórios, evidências ou atualização da SDD por vídeo.
Preserve originais, diagnósticos e composições anteriores. Não publique nem aprove.
Responda somente com o caminho do MP4 e pendências.
