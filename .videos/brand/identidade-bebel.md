# Identidade da Bebel

Base operacional das referências fornecidas e das decisões desta conversa. A persona textual completa foi localizada na antiga skill de carrosséis e centralizada em [persona-bebel.md](persona-bebel.md), preservando o texto existente e retirando apenas o tema fixo de uma execução anterior. Essa é a fonte compartilhada de personalidade, voz, vocabulário, pilares e cores por categoria. Não inventar biografia, idade exata, profissão, região, sotaque ou histórias pessoais ausentes nela.

## Persona e escrita

Revisão em todos os formatos: frases completas e conectadas, pontuação natural e quebras por grupos de sentido. Leia a sequência de títulos como um texto contínuo; cada caixa/linha deve manter contexto, sem fragmentos desconexos. Dê preferência a uma situação clara, seguida da dica e sua consequência, sem saltos de ideia.

Antes de escrever ou derivar conteúdo, leia as seções de identidade, personalidade, voz e pilar pertinente em persona-bebel.md. A central lê uma vez e compartilha o contexto, sem repetir o documento completo em cada etapa. Carrosséis e vídeos usam a mesma fonte; o formato e as decisões específicas do usuário continuam determinando CTA, títulos e montagem.

Bebel ajuda a organizar a vida de casa. Voz acolhedora, prática e bem-humorada, em conversa próxima de cozinha. Situações cotidianas reconhecíveis, dica concreta e conclusão curta; sem bronca, humilhação, infantilização ou promessas inventadas. Linguagem simples e frases que soam naturais em voz alta, sem tom institucional/publicitário.

Exemplo real fornecido em assets/cenas/001-cena-01/roteiro.md:

“Comprou arroz e já tinha no armário? Minha filha, confira a despensa antes de comprar!”

Use esse texto como referência de cadência e proximidade, não como roteiro para repetir. “Minha filha” e os demais bordões listados na persona podem aparecer quando naturais, sem repetição obrigatória. Categorias e memória de ideias ficam em temas-utilizados.json; a persona compartilhada e as instruções específicas do usuário têm prioridade sobre interpretações desta base.

## Referências visuais principais

| Arquivo | Papel |
| --- | --- |
| assets/referencias/Bebel na cozinha, pronta para conversar.png | Rosto, aparência, roupa e integração ao cenário; inspecionado visualmente |
| assets/personagem/bebel-olhando.png | Identidade da personagem em camada independente; inspecionado visualmente |
| assets/personagem/bebel-surpresa.png e bebel-apontando.png | Poses existentes; verificar a pose pertinente antes de derivar variante |
| assets/cenario/cozinha-roxa-despensa.png e fundo-video.mp4 | Cenário e fundo disponíveis; selecionar pelo roteiro, sem assumir que nomes diferentes formam um par |
| assets/logos/dicas-da-bebel.png | Logo existente, preservar arquivo; não recriar |
| assets/referencias/luzes-douradas-bokeh.jpg | Referência fornecida para luzes desfocadas/glow atrás da personagem; não é novo cenário ou referência de rosto |

Nas duas referências inspecionadas: cabelo branco curto, cacheado e volumoso; óculos de armação escura; argolas douradas; roupa roxa; rosto, tom de pele, proporções e expressão acolhedora consistentes. Cozinha com roxos/lilases, madeira, plantas e luz quente na referência. As imagens são a autoridade para detalhes visuais: esta descrição não substitui anexá-las à geração. Não misturar versões divergentes sem orientação do usuário.

A persona descreve Bebel como senhora negra e distingue coral/receitas, rosa/dicas da vida, roxo/curiosidades e verde/achadinhos. Esses pilares não autorizam recolorir PNGs existentes ou substituir a versão roxa escolhida para o miolo. Use a referência pertinente ao formato e à direção solicitada.

Banco único: .videos/assets/referencias, relativo à raiz do projeto; dentro de .videos use assets/referencias. Migração por conteúdo: Bebel na cozinha com celular.png corresponde a 001 - cta final.png; CTA tipográfico da Bebel.png corresponde a cta-tipografico.png. A referência MP3 do ElevenLabs está no mesmo banco, preservada com o nome original; não é autorização para reutilizar sua fala em outro roteiro nem para selecionar/clonar voz.

## Aplicação por etapa

- Editorial lê Persona e escrita antes de escolher tema/roteiro. Se houver texto oficial adicional, incorpora a fonte e segue seu tom.
- Mídia inspeciona e fornece à ferramenta somente as referências pertinentes. Mantém rosto/cabelo/óculos/roupa e estilo; gera camadas separadas, sem texto embutido. Personagem/objetos transparentes. Sem referência ou acesso essencial, informar pendência.
- Voz usa a fala pronta e a voz configurada da Bebel. Não inferir sotaque a partir da imagem nem escolher/clonar outra voz automaticamente.
- Cena conserva os assets e motion definido: Bebel sem deformação/pulsação; fades40→100/100→45; títulos brancos Roboto em caixas por linha. Sem alterações de identidade para adaptar layout.
- CTA conserva seus três arquivos; não reescreve narração nem regenera arte/personagem para aplicar esta base.

Leia apenas a seção e as referências necessárias à etapa, uma vez por produção; a central compartilha o contexto entre etapas. Não varrer todo o banco a cada passo nem criar relatório de identidade por vídeo. Não gerar conteúdo por causa de uma atualização deste arquivo.

Direção de vídeo atual: consulte [formato-reels-bebel.md](formato-reels-bebel.md). Voz e motion têm parâmetros em narracao.json e miolo.json; não duplicar regras de formato nesta base de identidade.
