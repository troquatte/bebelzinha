# Tarefa — Padronizar módulos e remover Achadinhos

## Modo

FULL

## Objetivos

1. Reorganizar os módulos atuais para seguir o padrão definido em `.spec/memory/estrutura.md`.
2. Remover completamente o domínio Achadinhos do estado atual do repositório.

## Estrutura obrigatória

```text
src/app/
  core/
  shared/
  modules/
    <feature>/
      components/
      shared/
      service/
      enum/
      interface/
      helpers/
      etc/
```

Criar somente as subpastas que tenham conteúdo real. Não criar diretórios vazios.

## Regras da reorganização

- componentes em `components/`;
- services/stores em `service/`;
- contratos/models em `interface/`;
- manter código específico dentro da feature;
- atualizar imports e lazy routes;
- não criar abstrações novas só por causa da mudança de pasta.

## Remoção de Achadinhos

Remover do estado atual do projeto:
- módulo `findings`;
- rotas;
- menu desktop/mobile;
- spotlights e referências nas telas;
- conteúdo e imagens públicas;
- tracking `ClickAchadinho`;
- continuidade para Achadinhos;
- SEO/shells relacionados;
- documentação/memória/specs específicas;
- qualquer referência residual ao domínio atual de Achadinhos.

Afiliados podem continuar apenas como possibilidade futura de monetização, sem feature, rota, catálogo ou domínio próprio.

## Compatibilidade

- preservar Comidinhas, Compras, Home e Onboarding;
- preservar dados locais existentes dessas features;
- preservar conteúdo e referências visuais adicionados no último push;
- restaurar `scripts/generate-pages.mjs`, removido no push anterior, pois o workflow ainda depende dele.

## Validação

- build Angular;
- geração dos shells estáticos;
- busca residual por Achadinhos/findings;
- revisão da estrutura final;
- merge em `development`;
- publicação em `main`;
- equalização final das branches.
