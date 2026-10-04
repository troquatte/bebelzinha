# Processo SDD — Bebelzinha

Este diretório é a fonte de verdade para especificações, contexto permanente e decisões do projeto **Bebelzinha**.

A regra central é simples:

> mudança relevante → spec → revisão → implementação → validação → memória

## Estrutura

```text
.spec/
├── changes/
│   ├── tarefa.md
│   └── archive/
├── memory/
│   ├── changelog.md
│   ├── contexto-tecnico.md
│   ├── estrutura.md
│   └── produto.md
├── shared/
│   ├── como-executar.md
│   ├── diretrizes-de-frontend.md
│   └── regras-de-nomenclatura.md
└── templates/
```

As automações e regras dos agentes ficam em `.agents/`.

## Ordem de leitura obrigatória

Antes de planejar ou implementar uma mudança:

1. `.spec/memory/produto.md`
2. `.spec/memory/contexto-tecnico.md`
3. `.spec/memory/estrutura.md`
4. documentos relevantes em `.spec/shared/`
5. a spec ativa em `.spec/changes/`

Para alterações de frontend, também é obrigatório ler:

- `.spec/shared/diretrizes-de-frontend.md`
- a estrutura existente em `src/app/`
- o design system existente em `src/scss/`

## Ciclo de uma mudança

### 1. Rascunho
Registre a necessidade em `.spec/changes/tarefa.md` ou em outro rascunho explícito.

### 2. Especificação
Use a skill `sdd-spec-generator` para transformar o rascunho em uma spec numerada e objetiva.

### 3. Revisão da spec
Use `sdd-reviewer` antes de escrever código. A revisão deve confirmar escopo, critérios de aceite, riscos e alinhamento com a memória do projeto.

### 4. Implementação
Use `sdd-executor` e implemente somente o necessário para satisfazer a spec.

Status recomendados:
- `[ ]` pendente;
- `[~]` implementado, aguardando validação;
- `[x]` validado.

### 5. Revisão da implementação
Compare código e spec. Não considerar concluído o que não foi efetivamente validado.

### 6. Entrega
Use `sdd-git-delivery` para preparar branch/commit/PR conforme as regras do workspace.

### 7. Fechamento
Use `sdd-delivery-closer` para arquivar a spec, atualizar changelog e sincronizar decisões permanentes com `.spec/memory/`.

## Princípios

- produto antes de tecnologia;
- mobile first;
- simplicidade antes de abstração;
- não antecipar infraestrutura;
- não adicionar IA sem necessidade de produto;
- não criar cadastro obrigatório sem motivo;
- monetização deve ser contextual;
- decisões permanentes devem ser registradas na memória;
- specs devem ser pequenas, rastreáveis e verificáveis.

## Norte

Quando houver dúvida, volte para `.spec/memory/produto.md`:

> **Bebel é um app gratuito de organização prática da vida doméstica, monetizado por afiliados e futuras ofertas.**
