# 002-personalidade-visual-bebel

## Objetivo

Evoluir a fundação visual atual para uma interface com personalidade própria da Bebel, usando as referências oficiais do repositório como direção visual e evitando aparência genérica de template ou interface gerada por IA.

## Contexto

A fundação atual já possui app shell responsivo, navegação inferior no mobile, sidebar no desktop e Home simples. A nova mudança não cria funcionalidades de negócio: ela refina a identidade visual e torna o uso das referências visuais uma regra permanente do fluxo SDD.

As referências oficiais estão em:

`.spec/ui-references/`

Foram observados como princípios visuais recorrentes:
- roxo/lilás forte como identidade principal;
- contraste quente com laranja;
- fundos claros e acolhedores;
- formas arredondadas e orgânicas;
- títulos expressivos;
- elementos com sensação de adesivo, pincelada ou balão de fala;
- presença forte da personagem Bebel;
- atmosfera doméstica, simpática e próxima;
- visual alegre sem assumir aparência infantil.

## Escopo

- reformular visualmente o shell existente sem alterar sua arquitetura funcional;
- dar mais personalidade à Home;
- usar uma referência oficial da Bebel como imagem da personagem no app;
- melhorar cores, hierarquia, superfícies, navegação e microcopy;
- manter mobile bottom navigation e desktop sidebar;
- manter módulos futuros sem funcionalidade;
- registrar `.spec/ui-references/` como fonte visual obrigatória no protocolo SDD;
- registrar a mesma regra nas diretrizes compartilhadas de frontend.

## Fora de escopo

- implementar Casa, Comidinhas, Compras ou Achadinhos;
- autenticação;
- backend;
- persistência;
- novas bibliotecas;
- novas fontes externas;
- reprodução literal das telas de referência;
- testes unitários.

## Critérios de aceite

- [ ] A Home utiliza uma imagem oficial da personagem Bebel disponível no repositório.
- [ ] O visual usa roxo/lilás como identidade predominante e um acento quente coerente com as referências.
- [ ] A interface transmite personalidade própria, com elementos orgânicos/expressivos sem comprometer leitura.
- [ ] A navegação inferior continua sendo usada no mobile e a sidebar no desktop.
- [ ] Módulos futuros continuam identificados como indisponíveis, sem novas rotas funcionais.
- [ ] A Home mantém linguagem simples, próxima e coerente com a personagem Bebel.
- [ ] `.agents/SDD-CHATGPT.md` determina consulta obrigatória a `.spec/ui-references/` em mudanças visuais.
- [ ] `.spec/shared/diretrizes-de-frontend.md` registra as referências como fonte oficial de identidade.
- [ ] Nenhuma dependência nova é adicionada.

## Solução proposta

Manter a estrutura Angular existente e fazer uma evolução essencialmente visual:

- incorporar a Bebel real como elemento visual central;
- transformar o hero em uma composição mais editorial e expressiva;
- adotar superfícies claras, roxo profundo, lilás e laranja como acento;
- usar badges, balões e formas decorativas simples para remeter à linguagem dos carrosséis;
- refinar sidebar e bottom navigation para parecerem parte da marca;
- preservar acessibilidade e responsividade.

## Tasks

### Frontend

- [ ] Adicionar uma imagem oficial da Bebel aos assets públicos da aplicação.
- [ ] Reformular o app shell e navegação mantendo comportamento responsivo existente.
- [ ] Reformular a Home com presença da personagem, hierarquia mais expressiva e linguagem visual própria.
- [ ] Revisar responsividade e acessibilidade declarada no código.

### SDD / identidade

- [ ] Atualizar `.agents/SDD-CHATGPT.md` com consulta obrigatória às referências visuais.
- [ ] Atualizar `.spec/shared/diretrizes-de-frontend.md` com a mesma regra permanente.

### Validação

- [ ] Revisar implementação contra a spec e confirmar ausência de features fora de escopo.
- [ ] Solicitar `npm run build` porque há alteração de código da aplicação.
- [ ] Registrar validação visual como check manual recomendado caso a revisão estática não indique quebra crítica.

## Riscos

- referências editoriais/carrosséis são mais expressivas que uma interface utilitária; a adaptação precisa preservar usabilidade;
- excesso de elementos decorativos pode prejudicar leitura em telas pequenas;
- a imagem da Bebel deve ser usada como identidade, não como decoração repetitiva.

## Resultado esperado

A aplicação continua simples e funcionalmente igual, mas passa a parecer claramente um produto da Bebel: reconhecível, acolhedor, expressivo e menos genérico.
