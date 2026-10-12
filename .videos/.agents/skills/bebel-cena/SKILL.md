---
name: bebel-cena
description: Criar e reprocessar cenas do miolo a partir de roteiro, bancos de mídia e montagem, com checagem técnica rápida e revisão visual e de áudio pelo usuário.
---

Use o motor existente; não reler arquitetura, SDD ou outras skills por cena. Uma varredura por pedido, desenvolvimento primeiro. Não refatorar durante produção comum.

Entradas por cena em assets/cenas/<id>/: roteiro.md, audio.mp3 e a montagem (src/data). Mídia reutilizável fica nos bancos assets/{cenario,personagem,itens,fontes,logos}; a cena referencia o banco e não duplica mídia.

Estrutura de Reel: chamada -> começo -> meio -> fim (CTA), com hold final. Vertical 1080x1920/30fps; áudio integral 1x; fundo mudo com rate ajustado à duração; nada fora do roteiro.

Fluxo: 1. montar componente e montagem (marcadores, posições, títulos). 2. npm run lint. 3. render diagnóstico numerado com npm run miolo:cena1 (não sobrescreve, não aprova). Preservar originais, diagnósticos e composições anteriores.

Motion: entradas 0.44–0.48s; poses com fade curto sem sobreposição; título em cascata por linha; ênfase do item por scale/glow que segue a silhueta; sem retângulos ou rótulos embutidos nas artes. Reutilizar a linguagem de easing existente.

Como no CTA: checagem técnica rápida só no fim (hash, resolução, FPS, H264/AAC, pixel format, frames e duração). Revisão de imagem e áudio pelo usuário; sem inspeção visual do agente, extração de quadros, prévias, relatórios ou evidências. Não publicar nem aprovar. Não atualizar SDD por vídeo.

Responder somente com o caminho do MP4 e pendências, sem prometer conferir quadros ou áudio.
