---
name: bebel-fabrica-sdd
description: Manter requisitos e plano das mudanças do sistema; SDD não controla entregas nem registra execuções de vídeo.
---

Mudanças de código: leia .spec/project.md e index.md, atualize a feature correspondente. Consultas/auditorias são somente leitura; implementação autorizada avança sem confirmações repetidas.

SDD descreve contratos/decisões do sistema, nunca inventário de vídeos. Não registrar temas concluídos, contagens da fila, hashes de entregas nem exigir existência de gerados. Apagar entregas antigas não reabre especificação.

Processamento comum usa bebel-cta ou a central bebel-producao (editorial, mídia, voz, cena), com comandos existentes. Sem feature por vídeo, evidências/transcrições/relatórios operacionais por tarefa; sem leitura de toda documentação por execução. Preserve versões anteriores quando houver revisão autorizada.

Mudanças do motor: requisitos → plano → implementação → testes pertinentes e resumo técnico curto na feature. Não afirmar testes não realizados. Respeite pedido de não renderizar. Gerado não significa aprovado.

Escopo atual: CTA estável; miolo por tema com múltiplas cenas e bancos existentes; ElevenLabs integrado, respeitando brand/narracao.json e autorização explícita para geração. Preparação de temas agora inclui roteiro e imagens essenciais nos bancos atuais; voz quando explicitamente habilitada. Expansão estrutural dos bancos, dashboard e publicação ficam para outra etapa. Preserve mídias, protótipos e diagnósticos históricos; não reinstalar Remotion nem alterar aplicativo pai.
