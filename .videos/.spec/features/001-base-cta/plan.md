# Plano

1. Separar evidências anteriores em history, registrar movimentos e hashes.
2. Substituir a fábrica geral por storage compartilhado + módulos CTA.
3. Implementar CLI da fila, medição, inspeção, staging, render, validação e promoção.
4. Compartilhar BebelCtaScene entre BebelInicio/BebelEncerramento.
5. Consolidar skills e um prompt operacional. Remover resíduos comprovadamente obsoletos.
6. Testar invariantes, lint/typecheck e render diagnóstico isolado.

Nenhuma dependência nova. Usar FFmpeg/FFprobe distribuídos com Remotion e Node.
Comparação PCM implementada no motor; análise semântica de fala/legibilidade é
do agente e exige evidências, não é simulada por FFprobe.
