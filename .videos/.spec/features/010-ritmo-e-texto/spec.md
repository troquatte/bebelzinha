# Ritmo e revisão textual

Direção vigente: duração conforme necessidade do roteiro, sem alvo editorial de segundos. cenas:new não impõe estimativa de 20s; --seconds é opcional e, quando informado, positivo/finito, sem teto de 120s. Render continua determinado pela narração real e sustentação. Prompt 01 e bebel-editorial usam a direção de escrita da skill dos carrosséis, adaptada a situações demonstradas e balões editáveis, sem slides animados. Não alongar sem conteúdo nem regenerar produções anteriores para aplicar preferências. Validar criação sem estimativa, estimativa longa e rejeição de número inválido.

Extensão pontual de texto: Title.style opcional `speech` exibe fala curta da personagem em balão creme com contorno roxo, ponta e entrada suave. Texto, posições e marcadores continuam editáveis em montagem.json; máximo de duas linhas, validado pelo contrato. Ausência do campo preserva caixas de vidro/listas existentes. O teste usa direção narrativa dos carrosséis em situações demonstradas, sem importar estética de slides. Plano: extensão compatível do contrato → renderer → lint/typecheck e teste de contrato → render solicitado. Não altera automaticamente produções anteriores ou a preferência global de títulos.

Usuário solicita padrão de miolo final1.2x em áudio, fundo e motion juntos; original preservado1x para montagem e tempos reais, atempo mantém altura da voz. Configuração compartilhada brand/miolo.json e código entram na assinatura do render. Validação técnica usa frames acelerados. CTA pronto anexado após a aceleração, em velocidade natural; ver feature012. Exportação é retimada antes de promoção; Studio mostra montagem original1x.

Textos revisados em todos os formatos por base compartilhada: frases conectadas, pontuação e quebras por grupos de sentido. Produção atual e diagnóstico sem narração revisados, anterior preservado; não promover diagnóstico nem inventar áudio real. Sem mudança de identidade.

Teste de retenção: texto padrão em y360 e largura850px, mantendo área acima da personagem e afastando controles superiores do Reels. Objeto de resultado com initiallyVisible=true e at=0 aparece desde o primeiro quadro, sem esperar entrada. Primeira dica útil imediata; alvo de15–20s de miolo, CTA pronto separado.

Validação da extensão de balão: npm run lint (ESLint + TypeScript) passou; npm run cenas:test passou, 24 testes. Render do piloto solicitado usa style=speech sem alterar títulos tradicionais de produções anteriores. Revisão visual continua com o usuário.

Validação da duração livre: lint/typecheck e cenas:test passaram (25 testes), incluindo criação sem estimativa e estimativa de 180s. As oito skills passaram em skills:check.
