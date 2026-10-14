# Direção atual dos Reels da Bebel

Fonte única das preferências do miolo. Identidade/persona em identidade-bebel.md e persona-bebel.md; parâmetros reais em miolo.json e narracao.json. Leia uma vez por produção. Pedido específico do usuário prevalece. Preferências não aprovam entregas nem comprovam desempenho.

## Roteiro
- Problema específico → motivo → ação demonstrável → resultado. Cada frase responde à mesma dúvida. Não juntar objetos disponíveis nem preencher com conselhos vagos. Listas precisam de exemplos coerentes e aplicação concreta.
- Escrita guiada pela skill bebelsabetudo-carrossel-img (../.agents/skills/bebelsabetudo-carrossel-img/SKILL.md): gancho → situação reconhecível → explicação → exemplo conectado → resolução. Adaptar a pedaços e situações demonstrados, nunca a carrossel animado. Formato escolhido no teste 021: falas curtas da Bebel em balões editáveis (Title.style=speech), intercaladas com closes dos objetos/ações. Frases completas, pontuação natural e títulos conectados à fala.
- Gancho emocional nos primeiros 0–3 s: Bebel expressiva junto do problema concreto desde o primeiro frame, voz começando imediatamente e destaque curto legível. Usar humor, frustração cotidiana, identificação, curiosidade ou uma pequena treta doméstica pertinente; variar o recurso. Exemplo aprovado: “Seu feijão virou um tijolo?!”. Entregar a resposta prometida; sem fofoca inventada, humilhação, susto gratuito ou propaganda na abertura.
- Duração livre, definida pelo roteiro e pelo áudio real, sem alvo mínimo/máximo editorial de segundos. Acrescentar tempo apenas para desenvolver situação, detalhe útil, demonstração ou leitura; não alongar com repetição nem cortar explicação para caber num formato curto. Conferir receita, proporções, sequência e ponto em fonte real; preferência Panelinha. Detalhes e fonte em legenda.md, sem omitir passos essenciais na voz.
- Universo doméstico da persona; app opcional, somente funções reais. Categorias/rodadas/ideias pertencem a temas-utilizados.json.

## Imagens e composição
- Reusar bancos antes de gerar. Comida/utensílios raster profissionais, textura e luz consistentes; não substituir por SVG/CSS infantil. Estados do mesmo objeto conservam câmera, material, cor e proporções. Referências em assets/referencias e banco assets/itens/panela-lilas-*.png.
- Alternar Bebel apresentando/reagindo, closes sem personagem e Bebel junto ao resultado. Objetos grandes à frente quando compartilham enquadramento, com apoio coerente e rosto/mãos livres. Não exigir Bebel em todas as etapas ou número fixo de poses.
- Variantes somente para gesto/expressão/estado narrativamente necessários. Grupos de três alimentos quando coerentes, sem ingredientes extras para completar número. Objetos transparentes precisam de contraste, preservando transparência.
- Cozinha roxa/identidade preservadas; cenário muda por motivo narrativo. Vídeo de mesmo nome-base tem prioridade sobre imagem. Sem Kling/gerador de vídeo. Demonstrações ilustradas não fingem filmagem real.

## Texto, motion e voz
- Roboto branco, sombra discreta, mesmo tamanho entre linhas; uma caixa roxa translúcida com vidro lento por linha. Gancho maior centralizado horizontalmente: referência x105/y230/font88. Corpo à esquerda; ajustar tamanho/posição às margens do Reels e ao rosto. Coordenadas não são universais nem herdam posições antigas obrigatórias.
- Destaques de 3–5 palavras, leitura confortável na velocidade final (em geral 2–3 s para frase curta). Trechos breves podem ficar sem texto. Lista N. Texto destaca número uma vez em círculo coral. Checklist editável aparece ligado à ação e sem cobrir rosto.
- Movimento curto, suave e com desaceleração; sem zooms/cortes arbitrários. Bebel: opacidade 40→100 na entrada e 100→45 na saída/troca, sem pulsação, escala animada, deformação ou lip sync. Poses reais com intenção. Resultado em destaque discreto; não simular mãos articuladas ou ingredientes caindo com PNG único.
- Perfil em miolo.json: bokeh dourado/raios lentos atrás da Bebel, vidro lento, entradas/cascata suaves. Sem halo nos títulos, flashes fortes ou brilho repetido em tudo. Referência assets/referencias/luzes-douradas-bokeh.jpg. Configuração controla valores, sem duplicá-los nas skills.
- Voz expressiva em narracao.json, API 1×; marcadores no áudio real original. Motor aplica 1.2× ao áudio e vídeo juntos, preservando altura. Não duplicar aceleração.

## Fechamento e entrega
Resultado visível e reação breve, alegre e própria do tema: sensação de tarefa resolvida, sem bordão obrigatório. Exemplo: “Olha esse douradinho! Agora sim, minha filha!”. Integrar à conclusão sem despedida longa. Convite para salvar/compartilhar pode ficar na legenda.

Sem CTA anexado, botões de curtir/comentar/compartilhar, música ou “poc”/efeitos sonoros automáticos. Regra do miolo; CTA independente continua disponível. Preserve versões e revisão do usuário. Checagem técnica rápida, sem previews/relatórios por vídeo, publicação ou aprovação automática.

## Referências escolhidas
- 016-alho-amargando-no-refogado-coloque-a-cebola-primeiro/output/convertido-0003.mp4 (~12 s): dica curta com final celebrado. 0002 é referência anterior de ritmo; seu pedido para salvar foi superado.
- 017-tres-jantares-decididos-antes-de-guardar-a-compra/output/convertido-0001.mp4 (~14 s): rotina com exemplos coerentes, escolhas anotadas e tarefa resolvida. Não basta dizer “planeje” ou “faça uma lista”.
- 013-pao-de-ontem-vira-cubinhos-crocantes: raster profissional e transformação de receita; seu CTA antigo não integra o padrão atual.

Produções em assets/cenas/tarefas/003-gerados. Referências opcionais: apagar entrega não bloqueia fluxo. Não copiar automaticamente temas/receitas/frases; preserve memória editorial e versões históricas.

Variedade de cenário: durante o planejamento, escolha uma localização/enquadramento pertinente diferente dos vídeos recentes quando houver alternativa adequada no banco. Se faltar e o pedido autorizar imagens, prepare apenas o fundo necessário. Não selecionar fundo-video.mp4 automaticamente em toda produção; manter identidade e continuidade dentro da história. Não atribuir penalidade do Instagram à repetição visual sem evidência.

Padrão atual aprovado: linguagem do alho corrigido, refinada pelos testes 030 e 031 — gancho emocional com Bebel e problema visível → motivo curto → correção demonstrada em estados/closes → resultado celebrado com personalidade → cartão de seguir integrado. O gancho chama atenção e a solução concreta cumpre a promessa; não sustentar o mesmo plano apenas mudando textos. Essa aprovação é criativa, sem comprovar retenção ou alcance.

Cartão de seguir aprovado: integrar no fechamento com foto original da Bebel, bebelzinha.app e botão Seguir → Seguindo, inspirado no teste 028. Cartão branco com entrada suave e toque visual silencioso; não alongar o vídeo só para o CTA nem encobrir personagem/demonstração. Campo editável Scene.follow; não voltar com CTA anexado ou botões de curtir/comentar/compartilhar. Sem obrigar convite na voz.

## Foco do produto
Facilitar o jantar da mulher com rotina corrida: uma ajuda pequena e concreta que prepara o caminho antes da noite. Escolher entre decisão, compras, pré-preparo, combinações e finalização, mantendo problema, ação e resultado conectados. Conferir temas e ideias na memória antes de criar; não repetir mudando somente o título. Duração acompanha o conteúdo, sem transformar os ~19 s dos testes em trava.

Referência criativa atual: 031-feijao-ou-tijolo-congele-por-jantar-nao-por-panelao/output/convertido-0001.mp4 — frustração bem-humorada, porcionamento demonstrado, resultado acolhedor e seguir no fim. Preservar voz expressiva 1.2×, balões/caixas legíveis, raster profissional, movimento suave e ausência de música/pocs conforme configurações existentes.
