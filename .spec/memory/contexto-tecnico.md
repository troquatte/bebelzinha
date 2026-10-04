# Contexto Técnico Global — Bebelzinha

## 1. Projeto

- nome técnico do projeto: **Bebelzinha**
- nome do produto/marca: **Bebel**
- namespace npm: `@bebelzinha`
- aplicação web **SPA**
- arquitetura orientada principalmente para experiência mobile
- sem SSR
- sem necessidade inicial de aplicação nativa
- evolução futura para PWA ou experiência semelhante a aplicativo pode acontecer caso exista necessidade real de produto

A **Bebel** é um app gratuito de organização prática da vida doméstica.

O produto deve funcionar como uma ajudante para tarefas e decisões do cotidiano, priorizando simplicidade, praticidade e baixa fricção.

A arquitetura técnica deve acompanhar esse princípio:

> construir somente a complexidade necessária para resolver o problema atual.

---

# 2. Stack base

## Front-end

- **Angular 22**
- TypeScript
- SPA
- Standalone Components
- Angular Router
- Signals
- Reactive Forms
- Angular `HttpClient`
- HTML
- CSS/SCSS
- arquitetura mobile-first

## Runtime

- **Node.js 22.22.3**

## Back-end futuro, quando necessário

**Estado atual:** a Bebel não possui backend ativo como parte da arquitetura corrente.

Não criar backend, banco, autenticação ou infraestrutura relacionada apenas por antecipação.

Se uma necessidade real do produto exigir backend, a stack preferencial é:

- Node.js 22.22.3
- Express
- TypeScript
- API REST
- JSON
- Prisma ORM

## Dados futuros, quando necessários

A aplicação não possui banco relacional como requisito atual.

Se persistência server-side passar a ser necessária, a preferência é:

- PostgreSQL
- Prisma ORM

## Infraestrutura local futura

Docker Compose só deve ser introduzido quando existir serviço real a subir localmente, como PostgreSQL, Redis ou MinIO.

Enquanto esses serviços não fizerem parte da aplicação corrente, não criar infraestrutura apenas para deixá-la pronta.

Quando necessária, a infraestrutura local deve ficar preferencialmente em:

```text
doc/docker/local/
```

---

# 3. Estrutura do monorepo

O projeto utiliza o namespace:

```text
@bebelzinha
```

Contratos, tipos e utilitários que realmente precisarem ser utilizados por mais de uma aplicação ou módulo devem ficar em:

```text
packages/shared
```

Exemplos futuros:

```text
@bebelzinha/shared
@bebelzinha/api
@bebelzinha/web
```

Não criar pacotes separados apenas por organização estética.

Um novo package deve existir somente quando houver necessidade concreta de compartilhamento ou isolamento.

---

# 4. Arquitetura

A arquitetura deve permanecer:

- simples;
- legível;
- incremental;
- previsível;
- fácil de ensinar;
- fácil de manter.

Evitar abstrações antecipadas.

Não utilizar uma arquitetura complexa apenas porque ela pode ser útil no futuro.

A regra principal é:

> implementar a solução mais simples que atende corretamente ao requisito atual.

---

# 5. Estratégia de evolução

Cada mudança relevante deve caber em uma **spec objetiva**.

As entregas devem ser:

- pequenas;
- rastreáveis;
- testáveis;
- independentes sempre que possível.

Evitar specs enormes envolvendo diversas funcionalidades sem relação direta.

Preferir:

```text
uma necessidade
→ uma especificação
→ uma implementação
→ uma validação
```

---

# 6. Organização por domínio

A aplicação deve ser organizada prioritariamente por domínio/feature.

Exemplo:

```text
src/
  app/
    core/
    shared/
    modules/
      home/
      shopping/
      recipes/
      routines/
```

Novos módulos devem surgir conforme funcionalidades reais da Bebel forem especificadas.

Não antecipar uma estrutura completa de módulos para funcionalidades que ainda não existem.

---

# 7. Padrões Angular

O projeto utiliza os padrões modernos do **Angular 22**.

## Componentes

Priorizar:

- Standalone Components;
- componentes pequenos;
- componentes focados em uma responsabilidade;
- composição de componentes em vez de componentes gigantes.

Evitar componentes responsáveis simultaneamente por:

- interface;
- chamadas HTTP;
- transformação complexa de dados;
- regras de negócio;
- armazenamento de estado global.

---

# 8. Signals

Utilizar **Signals** como primeira opção para estados locais simples e reatividade da interface quando fizer sentido.

Exemplos:

```ts
const loading = signal(false);
const items = signal<Item[]>([]);
const selectedItem = signal<Item | null>(null);
```

Utilizar:

- `signal()`;
- `computed()`;
- `effect()` somente quando realmente necessário.

Não utilizar `effect()` como substituto genérico para fluxo de dados.

---

# 9. RxJS

RxJS continua sendo utilizado principalmente onde existe fluxo assíncrono.

Exemplos:

- `HttpClient`;
- streams;
- eventos assíncronos;
- composição de chamadas;
- cancelamento;
- debounce;
- operadores assíncronos.

Não transformar toda variável da aplicação em `Observable` sem necessidade.

Signals e RxJS podem coexistir.

Utilizar cada solução onde ela fizer mais sentido.

---

# 10. Injeção de dependência

Preferir:

```ts
inject()
```

quando melhorar a legibilidade.

Exemplo:

```ts
private readonly http = inject(HttpClient);
```

Evitar dependências excessivas dentro de componentes.

Quando uma responsabilidade começar a crescer, considerar movê-la para um service.

---

# 11. Formulários

Utilizar preferencialmente:

```text
Reactive Forms
```

Validações devem existir no front-end para melhorar experiência e feedback.

Porém:

> validação no client nunca substitui validação no servidor.

Mensagens devem ser claras para pessoas comuns.

Evitar mensagens técnicas como:

```text
ValidationError: field must satisfy constraint minLength
```

Preferir:

```text
Digite pelo menos 3 caracteres.
```

---

# 12. SPA

A Bebel funciona atualmente como uma **Single Page Application**.

Não existe SSR.

Portanto, não são necessários padrões arquiteturais específicos de SSR como:

- `isPlatformBrowser`;
- `PLATFORM_ID`;
- proteção contra execução de `window` no servidor;
- `afterRender` apenas para distinguir cliente de servidor;
- hydration;
- configuração de Angular SSR.

APIs de browser podem ser utilizadas normalmente quando necessárias.

Exemplos:

```ts
window
document
localStorage
sessionStorage
navigator
```

Ainda assim, acessos globais devem ser encapsulados quando isso melhorar:

- testabilidade;
- reutilização;
- manutenção.

---

# 13. Mobile first

A Bebel deve ser projetada prioritariamente para celular.

Toda interface deve considerar primeiro:

- telas pequenas;
- navegação por toque;
- áreas clicáveis confortáveis;
- leitura rápida;
- poucos passos;
- baixa fricção.

O desktop deve continuar funcional e visualmente consistente.

Entretanto:

> mobile é a experiência principal do produto.

---

# 14. Sensação de aplicativo

Mesmo sendo uma aplicação web, a Bebel deve transmitir sensação de aplicativo.

Priorizar:

- navegação rápida;
- feedback imediato;
- transições simples;
- interfaces responsivas;
- componentes amigáveis;
- poucas etapas para concluir uma ação;
- persistência de contexto quando fizer sentido.

Evitar aparência de:

- painel administrativo;
- ERP;
- dashboard corporativo;
- planilha;
- site institucional;
- sistema empresarial tradicional.

---

# 15. Integração com API futura

No estado atual, a Bebel não depende de API própria.

Quando uma funcionalidade realmente exigir comunicação com backend, utilizar `HttpClient` e preferir uma API REST simples em HTTP + JSON.

Fluxo de referência futuro:

```text
Angular SPA
    ↓
HTTP / JSON
    ↓
Express API
    ↓
Services
    ↓
Prisma
    ↓
PostgreSQL
```

Esse fluxo é uma preferência futura, não uma arquitetura que deva ser criada antecipadamente.

O front-end nunca deve acessar banco de dados diretamente.

---

# 16. Backend futuro

Não existe backend obrigatório no produto atual.

Somente criar backend quando uma spec demonstrar necessidade concreta de persistência server-side, autenticação, integração protegida ou outra responsabilidade que não possa permanecer adequadamente no front-end.

Quando necessário, a preferência técnica é:

```text
Node.js 22.22.3
+
Express
+
TypeScript
```

A implementação deve começar pequena e crescer conforme a necessidade real.

Não criar previamente camadas, módulos, repositories, controllers ou abstrações apenas para preparar uma arquitetura futura.

---

# 17. API REST futura

Quando existir backend e uma API for necessária, a comunicação deve utilizar:

```text
HTTP + JSON
```

Utilizar corretamente os métodos:

```text
GET
POST
PUT
PATCH
DELETE
```

E códigos HTTP apropriados.

Exemplos:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
500 Internal Server Error
```

---

# 18. Tratamento de erros no backend futuro

Quando existir backend, o tratamento de erros deve ser centralizado sempre que isso reduzir duplicação e melhorar previsibilidade.

Evitar repetir:

```ts
try {
  ...
} catch {
  ...
}
```

em todos os controllers quando o tratamento puder ser centralizado.

Erros devem ser convertidos para uma estrutura previsível.

Exemplo:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Os dados enviados são inválidos."
  }
}
```

O front-end deve transformar essas respostas em mensagens compreensíveis.

---

# 19. Banco de dados futuro

Não existe banco de dados obrigatório no estado atual da aplicação.

Quando uma necessidade real exigir persistência server-side, preferir:

```text
PostgreSQL
+
Prisma ORM
```

Nesse cenário, Prisma deve concentrar:

- schema;
- migrations;
- acesso ao banco;
- relacionamentos;
- constraints compatíveis com o domínio.

Evitar utilizar SQL manual quando Prisma resolver o caso de forma simples.

---

# 20. Autenticação

Quando autenticação for necessária, utilizar cookies seguros:

```text
accessToken
refreshToken
```

Preferencialmente com:

```text
HttpOnly
Secure
SameSite
```

de acordo com o ambiente.

Tokens de autenticação não devem ser armazenados em:

```text
localStorage
sessionStorage
```

O backend é responsável pelo gerenciamento da sessão.

O Angular apenas realiza as requisições autenticadas necessárias.

---

# 21. Segurança

Aplicar segurança proporcional ao produto.

Princípios:

- validar entradas no backend;
- nunca confiar exclusivamente no client;
- proteger cookies de autenticação;
- utilizar HTTPS em produção;
- não expor secrets no front-end;
- utilizar variáveis de ambiente;
- minimizar dados coletados;
- evitar armazenar informações desnecessárias.

---

# 22. Privacidade

A Bebel deve coletar somente os dados necessários para entregar suas funcionalidades.

Priorizar:

- minimização de dados;
- transparência;
- baixa coleta;
- ausência de cadastro obrigatório quando não houver necessidade;
- conformidade progressiva com LGPD.

Não coletar dados antecipadamente apenas porque poderão ser úteis no futuro.

---

# 23. Persistência local

Como a Bebel deve permitir baixa fricção, algumas funcionalidades poderão utilizar armazenamento local quando apropriado.

Exemplos:

```text
localStorage
IndexedDB
```

Pode ser utilizado para:

- preferências;
- dados não sensíveis;
- progresso local;
- experiências antes do cadastro;
- cache apropriado.

Nunca utilizar armazenamento local para:

```text
accessToken
refreshToken
senha
dados sensíveis
```

---

# 24. Conta opcional

Sempre que possível, permitir que o usuário experimente funcionalidades antes de criar uma conta.

O produto deve evitar:

```text
Abra a Bebel
→ faça cadastro
→ confirme e-mail
→ configure perfil
→ escolha preferências
→ só então use
```

Preferir:

```text
Abra a Bebel
→ use
→ perceba valor
→ crie uma conta quando houver motivo real
```

---

# 25. Performance

A aplicação deve ser rápida principalmente em dispositivos móveis.

Priorizar:

- bundles pequenos;
- lazy loading;
- carregamento sob demanda;
- imagens otimizadas;
- componentes simples;
- evitar bibliotecas grandes para problemas pequenos;
- evitar dependências desnecessárias.

O Angular deve utilizar lazy loading nas principais áreas quando isso trouxer benefício real.

---

# 26. SEO

A aplicação é SPA.

SEO não deve determinar toda a arquitetura do produto.

Áreas cujo principal objetivo seja uso dentro do aplicativo não precisam ser tratadas como páginas de conteúdo indexável.

Quando existirem páginas públicas importantes para aquisição orgânica, avaliar soluções específicas para essas páginas sem transformar obrigatoriamente toda a aplicação em SSR.

---

# 27. Experiência offline e PWA

PWA não é requisito inicial.

A arquitetura não deve receber complexidade antecipada apenas para permitir PWA futuramente.

Se o comportamento dos usuários justificar, poderão ser adicionados posteriormente:

- manifest;
- instalação;
- service worker;
- cache offline;
- notificações;
- sincronização.

Esses recursos devem nascer de uma necessidade real.

---

# 28. Monetização

O acesso principal à Bebel é gratuito.

A monetização inicial poderá ocorrer por:

- afiliados;
- recomendações contextuais;
- futuras ofertas próprias.

Produtos afiliados não devem contaminar a arquitetura do domínio.

Uma recomendação comercial deve existir porque é útil para aquele contexto.

Não transformar o produto em um marketplace genérico.

---

# 29. Integrações de afiliados

Integrações com parceiros como:

- Amazon;
- Shopee;
- Mercado Livre;
- outros programas;

devem ser adicionadas incrementalmente.

Evitar criar previamente uma arquitetura universal de afiliados para dezenas de plataformas.

Começar pelo parceiro realmente utilizado.

Generalizar somente quando aparecer repetição concreta.

---

# 30. IA

IA não faz parte da infraestrutura obrigatória do projeto.

Não introduzir inicialmente:

- agentes;
- embeddings;
- bancos vetoriais;
- pipelines de IA;
- LLMs;
- recomendadores complexos.

IA pode ser adicionada futuramente quando resolver claramente um problema do usuário.

---

# 31. Redis

Redis não deve ser utilizado apenas porque está disponível.

Pode entrar quando existir necessidade concreta, como:

- cache;
- rate limiting;
- sessão;
- jobs;
- processamento assíncrono.

Enquanto PostgreSQL e memória da aplicação forem suficientes, evitar complexidade adicional.

---

# 32. MinIO

MinIO deve ser utilizado somente quando houver necessidade concreta de armazenamento de objetos.

Exemplos:

- imagens enviadas pelo usuário;
- documentos;
- arquivos;
- mídia gerenciada pela aplicação.

Não utilizar armazenamento de objetos antecipadamente.

---

# 33. Docker

Docker Compose pode ser utilizado para padronizar serviços locais.

Exemplo:

```text
doc/
  docker/
    local/
      docker-compose.yml
```

O objetivo é permitir que outro desenvolvedor consiga subir dependências locais facilmente.

Não containerizar toda a aplicação apenas por princípio arquitetural.

---

# 34. UX

A Bebel deve transmitir:

- leveza;
- simplicidade;
- acolhimento;
- praticidade;
- organização;
- modernidade;
- proximidade.

O usuário não deve precisar aprender como utilizar o sistema.

A interface deve ser autoexplicativa sempre que possível.

---

# 35. Linguagem da interface

Evitar linguagem técnica.

Não usar:

```text
Persistir registro
Executar operação
Entidade atualizada
Processamento realizado
```

Preferir:

```text
Salvar
Adicionar
Atualizar
Pronto
```

A experiência deve respeitar a personalidade da Bebel:

- simples;
- próxima;
- prática;
- acolhedora;
- direta;
- bem-humorada quando apropriado.

---

# 36. Design

A identidade deve acompanhar a marca Bebel.

Diretrizes:

- mobile first;
- visual alegre;
- roxo/lilás como parte importante da identidade;
- cards amigáveis;
- boa hierarquia visual;
- ícones reconhecíveis;
- áreas de toque confortáveis;
- excelente legibilidade.

Não sacrificar acessibilidade para manter identidade visual.

---

# 37. Dependências

Antes de instalar uma nova biblioteca, avaliar:

1. Angular já resolve?
2. JavaScript/TypeScript já resolve?
3. a biblioteca existente já resolve?
4. realmente precisamos dessa dependência?

Evitar dependências para funções triviais.

---

# 38. Abstrações

Não criar antecipadamente:

```text
BaseRepository
BaseService
BaseController
GenericMapper
GenericCrudService
AbstractFactory
```

somente porque podem ser reutilizados no futuro.

Primeiro implementar casos concretos.

Quando repetição verdadeira aparecer, avaliar abstração.

---

# 39. Microserviços

A Bebel não utiliza microserviços inicialmente.

A arquitetura deve permanecer como uma aplicação simples.

Não introduzir:

- service discovery;
- event bus distribuído;
- múltiplos bancos por serviço;
- Kubernetes;
- gateways complexos;
- arquitetura distribuída;

sem necessidade comprovada.

---

# 40. Escalabilidade

Não otimizar prematuramente para milhões de usuários.

O projeto deve conseguir evoluir, mas o objetivo inicial é:

```text
validar
→ obter usuários
→ gerar recorrência
→ aprender
→ evoluir
```

Arquitetura preparada para mudança é mais importante do que arquitetura preparada para uma escala inexistente.

---

# 41. Testes

Como diretriz geral de engenharia, quando testes forem necessários, priorizar:

- regras importantes;
- comportamentos críticos;
- serviços;
- validações;
- fluxos com maior risco.

Não perseguir cobertura de 100% como objetivo isolado.

No fluxo automatizado do ChatGPT, testes unitários não fazem parte da validação padrão. A regra operacional definida em `.agents/SDD-CHATGPT.md` prevalece: não criar, alterar ou executar testes unitários por padrão, exceto quando houver solicitação explícita ou necessidade específica prevista pelo próprio protocolo.

O objetivo continua sendo confiança proporcional ao risco, sem transformar testes em burocracia automática.

---

# 42. Observabilidade

Logs devem ajudar a diagnosticar problemas reais.

Evitar logging excessivo.

Não registrar:

- senhas;
- tokens;
- cookies de autenticação;
- informações sensíveis.

Logs estruturados podem ser adicionados conforme necessidade.

---

# 43. Configuração

Configurações de ambiente devem permanecer fora do código sempre que possível.

Exemplo:

```text
.env
```

Nunca versionar secrets reais.

Manter um exemplo:

```text
.env.example
```

com as variáveis necessárias para executar o projeto.

---

# 44. Princípio de produto aplicado à tecnologia

Antes de adicionar uma tecnologia, integração ou arquitetura, perguntar:

1. isso resolve um problema real?
2. precisamos disso agora?
3. usuários dependem disso?
4. existe uma solução menor?
5. estamos adicionando tecnologia ou entregando valor?

Se não houver uma justificativa clara, não adicionar.

---

# 45. Regra para novas funcionalidades

Uma nova funcionalidade deve começar pela necessidade do usuário.

Fluxo esperado:

```text
problema
↓
requisito
↓
spec
↓
implementação mínima
↓
validação
↓
evolução
```

Nunca:

```text
tecnologia interessante
↓
arquitetura
↓
feature procurando um problema
```

---

# 46. Norte técnico

Quando houver dúvida entre duas soluções, preferir aquela que:

1. resolve corretamente o problema;
2. possui menos complexidade;
3. possui menos abstrações;
4. é mais fácil de entender;
5. é mais fácil de remover;
6. é mais fácil de evoluir depois.

O código da Bebelzinha deve refletir o próprio produto:

> **simples, prático e sem complicação.**

---

# 47. Norte do produto

Toda decisão técnica deve continuar subordinada à definição central da Bebel:

> **Bebel é um app gratuito de organização prática da vida doméstica, monetizado por afiliados e futuras ofertas.**

Quando houver dúvida sobre uma implementação, perguntar:

> **Isso ajuda alguém a cuidar da vida de casa de forma mais simples?**

Se a resposta for não, provavelmente não pertence ao núcleo atual do projeto.
