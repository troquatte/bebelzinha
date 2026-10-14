---
name: bebel-cena
description: Montar e processar temas do miolo com várias cenas, bancos existentes e checagem técnica rápida, preservando a revisão pelo usuário.
---

Receba roteiro, áudio e assets prontos. Use brand/identidade-bebel.md e brand/formato-reels-bebel.md; brand/miolo.json fornece os parâmetros reais de motion e velocidade. Preserve CTA, protótipo e diagnósticos. Não criar componente/script por tema nem reler arquitetura/SDD.

Fila: assets/cenas/tarefas/{001-afazer,002-desenvolvendo,003-gerados}/ID-tema. Uma varredura por pedido, desenvolvimento antes de afazer; ID explícito limita a tarefa. Não exigir configuração preparada pelo usuário.

1. cenas:list; fila vazia encerra.
2. cenas:prepare --task ID prepara/reserva a pasta e montagem.json editável.
3. Leia somente roteiro/montagem e bancos pertinentes. Monte BebelMioloTema; consulte factory/cenas/contracts.ts e examples/montagem-tema.json apenas quando necessário. Sem gerar voz/imagens ou reescrever fala na fila; falta essencial é pendência exata.
4. Cenas contíguas de 0 até o fim do áudio original; marcadores de poses/itens/títulos locais à cena. Uma faixa integral, sem cortar/repetir fala, sustentação apenas no fim. Use tempos reais; cenas:transcribe é opcional/local. Se marcadores aproximados, informe necessidade de conferência.
5. cenas:process --task ID (ou sem filtro para fila autorizada) renderiza, confere tecnicamente e conclui montagens prontas. Bloqueio inalterado não recebe tentativas repetidas; --retry somente após resolver causa. render/finish/reconcile/stage servem à recuperação/revisão pelos comandos existentes.

Monte dados em áudio 1×. O motor aplica 1.2× ao áudio e vídeo juntos, preservando altura; não acelerar outra vez marcadores/API. Fundos mudos, contínuos quando reutilizados, sem zoom artificial adicional. Bebel sem pulsação, escala animada, deformação ou lip sync. Alternar poses/closes conforme narrativa. Objetos à frente com apoio/sombra; manter continuidade sem reiniciar entradas. O resultado pode reaparecer no fechamento, sem repetir revelações desnecessárias.

Antes da promoção, somente checagem rápida de hashes/FFprobe pelos comandos: formatos, dimensões, FPS, áudio e duração. Usuário revisa visual/voz. Sem decode completo/comparação PCM rotineiros, extração de frames, previews, relatórios, transcrições ou SDD por tema. Preserve entradas e MP4 numerados; não publicar/aprovar. Responda caminhos e pendências.

Cartão de seguir aprovado: use Scene.follow no fechamento, sem substituir a conclusão da dica. Avatar assets/personagem/bebe-roxa.jpg, handle bebelzinha.app, subtítulo curto pertinente. Referência do teste 028: cartão branco, entrada suave, botão azul Seguir, toque visual e mudança para Seguindo, silencioso; y260 e tapAt1.6 são pontos de partida, ajustáveis à cena. É uma animação gráfica, não ação real no perfil. Preserve rosto/objetos e tempo para ler; pedido específico pode omitir.

Abertura emocional aprovada: Bebel e problema visíveis desde o primeiro frame, fala imediata, texto curto e legível; alternar com closes da correção e voltar à personagem no resultado. Referência 031 e direção em brand/formato-reels-bebel.md. Preserve configurações existentes e integre Scene.follow depois de entregar a solução, sem introdução/despedida longas.
