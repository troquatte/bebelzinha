# Diretrizes de Implementação de Frontend

Este documento deve ser seguido em qualquer alteração de tela, componente ou estilo.

## Antes de implementar

Analise obrigatoriamente:

1. `.spec/memory/produto.md`;
2. `.spec/memory/contexto-tecnico.md`;
3. a spec ativa;
4. `src/app/`;
5. `src/scss/`;
6. os componentes e padrões já existentes;
7. as referências visuais aplicáveis em `.spec/ui-references/`.

## Referências visuais do produto

A pasta `.spec/ui-references/` contém referências oficiais para orientar a personalidade visual da Bebel.

Antes de criar ou reformular uma interface:

- inspecione as referências relevantes;
- use referências da personagem para manter consistência da Bebel;
- use referências de tela para extrair composição, ritmo, contraste, hierarquia, formas, cores e sensação de uso;
- não copie layouts literalmente;
- adapte os princípios para a necessidade real da Bebel;
- evite visual genérico de template, dashboard ou interface com aparência de conteúdo gerado automaticamente por IA.

A identidade visual deve parecer intencional, humana, acolhedora e reconhecível como Bebel.

## Stack visual disponível

O projeto possui:

- Angular 22;
- SCSS;
- Angular Material;
- Tailwind CSS 4.

Não introduza outra biblioteca de UI ou grid sem necessidade explícita na spec.

Use Angular Material quando comportamento e acessibilidade prontos trouxerem benefício real. Use SCSS/Tailwind de forma consistente com o padrão já adotado, sem criar duas soluções diferentes para o mesmo problema.

## Princípios de UX

A Bebel é mobile first e deve parecer um app de uso cotidiano.

Priorizar:

- leitura rápida;
- poucos passos;
- áreas de toque confortáveis;
- feedback imediato;
- navegação simples;
- componentes leves;
- estados claros de loading, vazio, erro, sucesso e desabilitado;
- acessibilidade e contraste adequados.

Evitar aparência de:

- dashboard corporativo;
- ERP;
- painel administrativo;
- planilha;
- e-commerce genérico;
- site institucional.

## Design system

Antes de criar cores, espaçamentos, bordas, sombras, tipografia ou breakpoints novos:

1. verifique `src/scss/`;
2. reutilize tokens existentes quando houver;
3. se um novo token for realmente necessário, crie-o no lugar apropriado e mantenha consistência.

Não espalhe valores mágicos quando o valor representa uma decisão recorrente de design.

## Componentes

- componentes devem ter responsabilidade clara;
- preferir composição;
- extrair reutilização somente quando houver repetição real;
- não criar abstrações genéricas antecipadamente;
- manter lógica de negócio complexa fora da camada puramente visual;
- usar Signals para estado local simples quando fizer sentido.

## Responsividade

A implementação deve começar pelo mobile e evoluir para tablet/desktop.

Desktop não deve ser apenas uma versão esticada do celular; adapte navegação e aproveitamento do espaço quando a spec exigir.

## Linguagem

Microcopy deve seguir a voz da Bebel: simples, próxima, prática e acolhedora.

Preferir:

> “Prontinho 💜 Já coloquei na sua lista.”

Evitar:

> “Operação realizada com sucesso.”

## Pós-implementação

Registrar de forma objetiva:

- arquivos criados/alterados;
- decisões relevantes;
- componentes reutilizáveis adicionados;
- validações executadas;
- validações pendentes;
- desvios da spec, se houver.
