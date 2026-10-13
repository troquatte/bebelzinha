# Plano

1. Separar fila/contracts/preparação/render do miolo, reutilizando storage e checagem técnica.
2. Adicionar renderer genérico BebelMioloTema e montagem por tema, mantendo protótipo.
3. Implementar reserva, lock assíncrono independente, staging, cache, promoção, recuperação e limpeza.
4. Preparar ElevenLabs via adaptador com timestamps, provider desativado e comando explícito.
5. Atualizar prompt, skills e SDD do sistema; testar invariantes e diagnóstico real isolado.

Direção criativa e escolha dos bancos pertencem ao agente; CLI não inventa assets ou cenas. Uma única faixa de voz evita cortes entre cenas. Staging congela mídia durante render; hashes recusam entradas alteradas. Diagnóstico usa fixture, não a fila operacional.
