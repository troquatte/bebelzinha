---
name: bebel-fabrica-sdd
description: Conduzir requisitos, plano e evidências de mudanças na fábrica Remotion da Bebel. Consultas e auditorias permanecem somente leitura; execuções de CTA usam os registros da tarefa.
---

Leia `.spec/project.md` e `.spec/index.md` na raiz `.videos`. Localize a feature ativa pelo índice, sem presumir um ID ou retomar arquivos de `history/` como instruções atuais.

Respeite o pedido atual: auditar ou planejar não autoriza implementar. Quando a implementação já estiver autorizada, execute requisitos → plano → código → validação sem pedir confirmação para cada etapa.

Para uma mudança de arquitetura, atualize a feature ativa quando for a mesma entrega; para novo escopo, aloque o próximo ID livre. Mantenha `spec.md`, `plan.md`, `tasks.md` e `validation.md` coerentes com os arquivos e comandos reais. Atualize o estado do projeto e o índice ao encerrar.

Para processar CTAs existentes, use `$bebel-cta`: manifest/config/validation por tarefa são as evidências da execução. Não abra uma feature por vídeo e não reimplemente a arquitetura a cada prompt.

Diferencie validação técnica, inspeção visual do agente e aprovação editorial do usuário. Não registre testes ou inspeções que não aconteceram. Limitações permanecem explícitas. A pasta `003-gerados` não significa aprovação.

Escopo atual: CTA. Miolo, Reel completo, carrossel, dashboard e publicação dependem de uma etapa futura solicitada. Não crie estruturas vazias para antecipá-la. Histórico anterior é preservado fora do sistema ativo; não reinstale Remotion nem altere o aplicativo pai.
