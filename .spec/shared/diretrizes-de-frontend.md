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

## Tipografia base

A tipografia textual do app deve seguir uma fonte de verdade global em `src/styles.scss`, salvo necessidade de produto explicitamente documentada.

O arquivo `src/styles.scss` precisa permanecer carregado pelo Angular em `angular.json`, depois de `src/styles.css`. O `styles.css` mantém o Tailwind; o `styles.scss` aplica os estilos globais da Bebel por último para prevalecer sobre resets/preflight quando necessário.

Padrões globais:

- `h1` e `h2`: `font-size: fn.rem-calc(38)`, `line-height: 120%`, `margin: 0` e `font-weight: bold`;
- no mobile até `fn.rem-calc(800)`, `h1` e `h2` usam `font-size: fn.rem-calc(22)`;
- `h3`, `h4`, `h5` e `h6`: `font-size: fn.rem-calc(18)`, `line-height: 120%`, `margin: 0` e `font-weight: bold`;
- parágrafos `p`: `font-size: fn.rem-calc(16)`, `line-height: 120%` e `margin: 0.75rem 0 0`.

Os tamanhos em pixels são convertidos para `rem` por meio do utilitário `rem-calc` já existente no projeto.

Componentes devem herdar essa base. Labels, eyebrows e microcopy que não são parágrafos devem usar elementos adequados, como `span`, em vez de sobrescrever o padrão global de `p`.

Evitar redefinir `font-size`, `font-weight`, `line-height`, `letter-spacing` ou `margin` de headings e parágrafos em SCSS local sem uma necessidade visual explícita e documentada.

Cores, margens e largura podem continuar contextuais. A intenção é manter a mesma linguagem tipográfica em toda a aplicação, sem impedir composição de layout.

## Confirmações e ações sensíveis

Toda confirmação explícita de ação no produto deve utilizar **SweetAlert2** como padrão visual e comportamental.

Aplicar SweetAlert2 em confirmações como:

- deseja salvar?;
- deseja editar?;
- deseja excluir?;
- deseja substituir?;
- deseja limpar/remover dados?;
- qualquer ação destrutiva, irreversível ou que possa causar perda de informação.

Regras:

- não usar `window.confirm`, `window.alert` ou diálogos nativos do navegador;
- não criar um modal de confirmação paralelo quando SweetAlert2 resolver o caso;
- manter título, descrição e botões com linguagem natural e coerente com a voz da Bebel;
- ações destrutivas devem deixar a consequência clara antes da confirmação;
- o botão seguro/cancelar deve permanecer fácil de identificar;
- não executar a ação até a confirmação positiva da pessoa;
- quando a primeira funcionalidade que exigir confirmação for implementada, adicionar SweetAlert2 como dependência do projeto se ainda não estiver instalado.

Essa regra é transversal ao produto e deve ser considerada em qualquer spec que inclua salvar, editar, excluir ou outra confirmação de alteração de estado.

## Microinterações dos heroes da Bebel

Heroes que usam a personagem Bebel devem reutilizar o padrão global de movimento definido em `src/styles.scss`, em vez de criar keyframes equivalentes dentro de cada componente.

Classes disponíveis:
- `bebel-hero-motion`: entrada do container do hero;
- `bebel-hero-motion__portrait`: entrada do retrato da Bebel;
- `bebel-hero-motion__speech`: flutuação suave do balão;
- `bebel-hero-motion__spark--one` e `--two`: brilho alternado dos elementos decorativos;
- `bebel-hero-motion__sticker`: entrada do sticker, quando a composição possuir esse elemento.

O layout, conteúdo, cores e microinterações específicas da página continuam locais. Não duplicar os keyframes do padrão compartilhado. O fallback para `prefers-reduced-motion` já faz parte do padrão global.

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

## Linguagem e voz da Bebel

Todo texto criado para a interface deve soar humano e coerente com a Bebel.

A voz da Bebel é:
- simples;
- próxima;
- prática;
- acolhedora;
- direta;
- experiente;
- bem-humorada quando fizer sentido.

Escrever como alguém de verdade falaria no dia a dia, evitando texto excessivamente polido, genérico ou com “cara de IA”.

Preferir frases naturais, com ritmo de conversa e vocabulário cotidiano.

Preferir:

> “Prontinho 💜 Já coloquei na sua lista.”

> “Ô, minha filha… vamos resolver isso sem complicação.”

> “Hoje dá pra fazer só o básico. E tá tudo bem.”

Evitar:

> “Operação realizada com sucesso.”

> “Descubra uma nova forma de transformar sua rotina.”

> “Potencialize sua organização com uma experiência prática e intuitiva.”

Também evitar:
- clichês de marketing;
- tom corporativo;
- jargão técnico;
- frases artificiais;
- excesso de emojis;
- diminutivos em toda frase;
- bordões repetidos;
- humor forçado.

A personalidade deve aparecer sem sacrificar clareza. Se o texto ficar engraçadinho porém menos compreensível, simplifique.

## Pós-implementação

Registrar de forma objetiva:

- arquivos criados/alterados;
- decisões relevantes;
- componentes reutilizáveis adicionados;
- validações executadas;
- validações pendentes;
- desvios da spec, se houver.
