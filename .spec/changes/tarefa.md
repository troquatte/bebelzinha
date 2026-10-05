# Tarefa — Padronizar módulos e limpar feature descontinuada

## Modo

FULL

## Objetivos

1. Tornar obrigatória a organização de cada feature em subpastas por responsabilidade.
2. Remover completamente uma feature de monetização descontinuada do app e da documentação viva.

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

Regras:
- arquivos de feature não ficam soltos em `modules/<feature>/`;
- criar somente as subpastas realmente necessárias;
- componente visual fica em `components/`;
- store e serviços específicos da feature ficam em `service/`;
- contratos/tipos/interfaces ficam em `interface/`;
- código genérico/global continua em `core/` ou `shared/`.

## Remoção da feature descontinuada

Remover:
- rotas;
- navegação desktop/mobile;
- componentes;
- serviços;
- modelos;
- conteúdo JSON;
- imagens;
- recomendações contextuais;
- eventos específicos de analytics;
- continuidade;
- referências em Home, Comidinhas e Compras;
- memória/documentação viva;
- specs arquivadas exclusivas da feature;
- geração estática de páginas dessa feature.

## Preservação

- manter os novos arquivos de conteúdo/story e referências visuais adicionados pelo usuário;
- manter Comidinhas, Compras, Onboarding, Home, Analytics e continuidade;
- não alterar regra funcional dessas features além da remoção da feature descontinuada e atualização de imports/caminhos.
