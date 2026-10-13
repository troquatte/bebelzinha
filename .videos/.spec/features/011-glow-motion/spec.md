# Glow e ritmo do motion

Continuidade de itens entre cenas: mesmo ID/asset/posição/tamanho em cena seguinte, com at=0, mantém o item já visível, sem repetir fade ou brilho de entrada. Isso permite terceiro alimento de apoio contínuo em composições de trio, sem alterar voz/identidade.

Perfil escolhido pelo usuário salvo em brand/miolo.json.visualEffects e lido pelo renderer: bokeh-dourado-atras-da-bebel. Parâmetros mantêm o visual da versão escolhida; skill de cena determina reutilização nas próximas produções. Escolha do perfil não aprova automaticamente novas entregas. Alteração de configuração entra na assinatura de render já existente.

Preferência mais recente: referência luzes-douradas-bokeh.jpg, dourado desfocado atrás da Bebel e raios giratórios lentos em camada atrás da personagem/itens. Halo de títulos removido; vidro lento preservado. Movimento no tempo global evita saltos nas trocas de cena; nenhum elemento sobre o rosto. Referência copiada ao banco e verificada por hash, sem gerar nova imagem.

Direção atual: estética de jogo com halo violeta/dourado, raios giratórios e anel de luz em sentidos opostos atrás dos títulos; entrada e saída em fade. Reflexo largo de vidro em3.6s na timeline original, aproximadamente2.77s após1.3x. Personagem não gira, texto permanece branco e legível; sem interface de jogo, música ou objetos novos.

Brilhos determinísticos por frame, pontuais e legíveis: reflexo único nos títulos, borda iluminada e luz seguindo silhueta dos itens. Personagem com luz ambiente discreta, sem pulsação/escala/deformação. Texto branco, identidade e velocidade final1.3x preservados.

Refinamento de ritmo solicitado: reflexo de títulos3.6s, entrada0.75s, fade0.3s e cascata0.22s; itens com entrada padrão0.8s e luz sustentada brevemente. Valores na timeline original, antes de1.3x final. Trocas de personagem preservadas. Diagnóstico novo validado com469 quadros/15.633s, anteriores mantidos. Sem narração real, tempos provisórios e sem promoção/aprovação.

Itens suportam until/exit locais para saída suave e substituição no mesmo espaço. Continuidade não reinicia itens encerrados; evitar repetição de alimentos no fechamento.
