---
name: bebel-fabrica-arquitetura
description: Manter contratos, caminhos, persistência e recuperação da fábrica local da Bebel. Usar em mudanças do motor compartilhado; o processamento específico de CTA pertence a bebel-cta.
---

Leia `README.md`, `.spec/project.md` e os módulos `factory/storage.ts` e `factory/cta/` antes de alterar contratos. O projeto Remotion já existe na raiz `.videos`; use as skills remotion-* conforme a operação técnica.

Contratos ativos:
- Fila em `assets/cta/tarefas/{001-afazer,002-desenvolvendo,003-gerados}`.
- Tipos `001-inicio` e `002-final`; identidade tipo + pasta `<id>-<tema>`. ID numérico não pode repetir dentro do mesmo tipo, mesmo com slug diferente.
- Uma pasta por tarefa em apenas um estado. Mover a pasta inteira, sem precriar temas nos destinos.
- Modelos `brand/cta-inicio.json` e `brand/cta-encerramento.json` são objetos compartilhados sem fontes fixas. Valores medidos, ajustes e inspeções ficam na tarefa.
- Manifests são autoritativos; listagem é derivada. Caminhos relativos à tarefa nos registros, relativos a public apenas nas props de staging.
- Use `safe`, escrita atômica, lock exclusivo e journals. Bloqueie links/junctions, escapes, duplicação e sobrescrita. Não remova um lock de processo vivo.
- Transições e promoção de MP4 devem ser recuperáveis. Reconcile não aprova conteúdo nem ignora colisões.
- Hashes vinculam entradas, configuração, render, inspeção visual e validação. Alteração invalida checkpoints incompatíveis. Versões antigas permanecem intactas.
- Render temporário → validação completa → promoção → gerados. Nunca gerar capa/preview, nem temporária; quadros de inspeção ficam em memória.

Compartilhe `BebelCtaScene` entre `BebelInicio` e `BebelEncerramento`. As props são por tarefa; não gravar uma tarefa no modelo global. Não introduza APIs de geração, catálogos, banco ou publicação nesta fase.

Execute testes de invariantes e recuperação quando alterar persistência; lint/typecheck e diagnóstico quando alterar render. Preserve evidências reais e assets fornecidos. Remova código substituído e seus callers, sem apagar material do usuário como se fosse cache.
