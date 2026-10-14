# Diretriz de produção: variação visual nos vídeos da Bebel

Status: decisão aprovada para os próximos vídeos. Documentação apenas; não implica regeneração automática dos vídeos existentes.

## Objetivo
Deixar os vídeos curtos da Bebel mais vivos e orgânicos, evitando a sensação de imagem estática ou apresentação de slides.

## Regra de produção
- **Dobrar a quantidade de variações visuais planejadas** para a personagem Bebel e os itens/objetos que participam da cena, tomando como referência o inventário-base inicialmente planejado para cada vídeo.
- Exemplo: se uma cena previa 2 poses da Bebel, planejar até 4 poses distintas; se previa 3 estados de um objeto, planejar até 6 estados.
- Priorizar variações **úteis**: expressão, olhar, mãos, corpo, posição, estados do objeto, reações e pequenas mudanças de composição. Não gerar cópias quase idênticas só para bater uma contagem.
- Variar apenas os elementos que realmente aparecem/mudam em cena; elementos estáticos de fundo não precisam ser duplicados.
- A diretriz vale para a fábrica de vídeos da Bebel (Phaser/composição em camadas e eventuais cenas produzidas externamente), não para o app Angular nem para outros jogos.

## Qualidade de animação
- Alternar poses e estados em momentos narrativos que façam sentido; usar transições e microanimações em vez de trocar a imagem inteira sem propósito.
- Preservar a identidade visual da Bebel em todas as variações (rosto, cabelo, óculos, roupa, paleta e proporções).
- Não aumentar a densidade visual a ponto de distrair da fala, da dica ou do CTA.
- A contagem de assets é um **objetivo de cobertura visual**, não uma obrigação de mostrar todas as variações durante um único vídeo.

## Performance e reuso
- Dobrar o **banco de opções visuais**, não obrigatoriamente a quantidade de imagens carregadas ao mesmo tempo.
- Reutilizar assets entre vídeos e cenas; carregar conforme a necessidade e liberar recursos quando apropriado.
- Preferir pequenas animações de transformações (posição, escala, rotação, opacidade) quando elas dispensarem arquivos adicionais.
- Controlar dimensões, transparência, tamanho do arquivo, memória e fluidez, com atenção especial à renderização mobile.
- Não assumir que duplicar assets dobra a qualidade: avaliar a animação final visualmente.

## Checklist para novos vídeos
1. Inventariar as poses da Bebel e os estados de cada objeto na proposta inicial.
2. Planejar aproximadamente 2x as variações úteis para personagem e objetos animados.
3. Identificar quais opções podem ser reaproveitadas do banco existente.
4. Integrar as variações à timeline sem mudanças bruscas ou excesso de movimento.
5. Validar o resultado em reprodução, inclusive legibilidade, identidade e desempenho no celular.

## Critério de aceite
O vídeo precisa parecer mais vivo e fluido **sem parecer PowerPoint**, mantendo estilo, clareza e desempenho. Se uma variação não acrescentar movimento legível ou expressão, pode ser omitida mediante revisão visual.
