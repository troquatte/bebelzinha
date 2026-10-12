---
name: bebel-fabrica-sdd
description: Manter requisitos e plano de mudanças do sistema; SDD nunca controla entregas ou registra execuções de vídeo.
---

Para mudanças de código, leia .spec/project.md e .spec/index.md e atualize a feature correspondente. Consultas/auditorias permanecem somente leitura; implementação autorizada avança sem confirmações repetidas.

SDD documenta contratos e decisões do sistema, não inventário de vídeos. Nunca registrar temas concluídos, contagens da fila, hashes de entregas ou exigir a existência de 003-gerados. Apagar entregas antigas não reabre especificação.

Processamento comum usa somente bebel-cta e comandos existentes. Não abrir feature por vídeo, não registrar evidências, transcrições, relatórios ou histórico de ações por tarefa. Não reler toda a documentação por execução.

Mudanças do motor: requisitos → plano → implementação → testes pertinentes, com resumo técnico curto na feature. Não afirmar inspeções/testes não realizados. Respeite pedido de não renderizar. Gerado não significa aprovado pelo usuário.

Escopo CTA; miolo/dashboard/publicação só em etapa futura solicitada. Preservar diagnósticos históricos e mídias. Não reinstalar Remotion nem alterar aplicativo pai.
