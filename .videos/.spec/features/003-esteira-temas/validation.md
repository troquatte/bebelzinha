# Validação técnica do sistema

2026-10-12: lint/TypeScript passou; 16 testes CTA e 11 testes do miolo/ElevenLabs passaram; quatro skills com YAML/instruções válidos.

Render real isolado de duas cenas passou: 183 quadros, 1080×1920, 30fps, H.264/yuv420p + AAC, duração6.1s. Teste confirmou cache de render, preservação de áudio original e MP4 anterior, promoção no próximo número livre, remoção de controles/runtime e ausência de dependência após apagar gerados. Usou bancos existentes e áudio do protótipo, sem processar a fila operacional.

Teste de persistência cobriu prioridade de desenvolvimento, ID duplicado, roteiro ausente, recuperação após rename, journal fora da fila, lock assíncrono separado do CTA, timeline contínua e desbloqueio após mídia adicionada. Adaptador ElevenLabs testado com resposta simulada, provider inicialmente desativado, áudio integral1x e nenhuma repetição automática de erro. Nenhuma chamada paga realizada.

Limites: chave e voz ElevenLabs ainda não configuradas; integração real depende delas e de pedido explícito de geração. Qualidade visual e interpretação dos marcadores ficam para revisão do usuário. Bancos adicionais/imagens novas são outra etapa. Conclusão técnica não representa aprovação editorial.
