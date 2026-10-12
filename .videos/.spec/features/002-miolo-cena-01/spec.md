# Cena 1 — revisão narrativa

Cena isolada vertical 1080x1920/30fps. Sequência compra → duplicata dentro da despensa → dica.
Áudio novo de 5.7991875s, integral 1x; no máximo 0.4s adicionais, sem fade preto.
Três poses inteiras: olhar para arroz, surpresa e apontar; corte limpo e âncoras faciais individuais.
Comprado permanece na bancada. Duplicata na prateleira em perspectiva, com máscara e madeira em primeiro plano.
Fundo usa MP4 fornecido, sem zoom adicional. Recorte da madeira usa o mesmo vídeo/frame; poses trocam com atenuação de opacidade sem sobreposição de braços. Títulos Comprou repetido? e Confira antes de comprar.
Sem logo grande, legendas integrais, novos objetos, música ou efeitos sonoros.
Marcadores e posições editáveis no JSON. Diagnósticos anteriores e composições CTA preservados.

## Motor — estrutura de cenas
Bancos reutilizáveis em assets/{cenario,personagem,itens,fontes,logos,referencias}; cada cena em assets/cenas/<id>/ (roteiro.md, audio.mp3, diagnosticos/).
Montagem em src/data (fora de assets/public, que o tsconfig exclui). O render copia banco+cena para public/cenas/<id>/, incluindo fontes.
Skill bebel-cena e prompts/criar-cena.md definem o fluxo: chamada → começo → meio → fim, hold final, vertical 1080x1920/30fps.
CTA intacto em assets/cta/.
