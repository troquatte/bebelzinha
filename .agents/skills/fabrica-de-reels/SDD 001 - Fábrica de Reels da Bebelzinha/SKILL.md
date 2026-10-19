# SDD 001 — Fábrica de Reels da Bebelzinha

## Contexto

Estamos desenvolvendo uma fábrica reutilizável de Reels usando HyperFrames, TypeScript e FFmpeg.

O projeto já possui uma composição funcional que gerou um MP4. Preserve esse trabalho.

A identidade da Bebel está documentada em uma skill que contém personalidade, tom de voz, categorias, cores e diretrizes de conteúdo. Localize e leia essa documentação; caso não esteja acessível, informe antes de implementar as regras editoriais.

Leia primeiro o `AGENTS.md`, as instruções locais e a estrutura existente do HyperFrames.

## Objetivo

Criar uma fábrica capaz de receber um tema e produzir um Reels vertical animado, utilizando roteiros estruturados, templates e imagens reutilizáveis.

Nesta primeira versão, o roteiro será preparado pelo agente de IA e salvo em JSON. O renderizador deverá consumir esse JSON sem exigir alterações manuais no código.

## Fase 1 — Especificação

Crie `specs/001-reels-factory.md` contendo:

- Objetivos e escopo
- Arquitetura proposta
- Formato de entrada
- Esquema do roteiro JSON
- Regras de composição
- Critérios de aceitação
- Estratégia de validação
- Limitações da primeira versão

## Fase 2 — Gerador de roteiros

Defina um formato JSON contendo:

- Tema
- Categoria
- Título
- Gancho inicial
- Cenas ordenadas
- Texto de cada cena
- Imagem opcional
- Duração por cena
- Tipo de animação
- CTA final

Crie um exemplo sobre economia no supermercado.

O conteúdo deve seguir a identidade da Bebel, com frases curtas, informações úteis e linguagem natural em português brasileiro.

Não invente fatos, números ou promessas.

## Fase 3 — Templates reutilizáveis

Implemente templates para:

1. Abertura com gancho
2. Dica ou curiosidade
3. Lista de dicas
4. Encerramento com CTA

As cenas deverão ser produzidas dinamicamente a partir do JSON.

Reaproveite imagens existentes sempre que possível.

Se uma imagem não existir, utilize uma composição gráfica com texto, cores e elementos disponíveis. Não presuma que uma nova imagem foi gerada.

Preserve a identidade visual da Bebel e priorize a legibilidade no celular.

## Fase 4 — Renderização

Integre os templates à versão instalada do HyperFrames.

Requisitos:

- Formato 1080 × 1920
- 30 FPS
- Duração ajustável
- Transições suaves
- Área segura para elementos do Instagram
- Textos e imagens sem cortes
- Exportação MP4

Não adicione música, voz ou publicação automática nesta versão.

## Fase 5 — Automação

Crie um comando documentado que receba o caminho de um roteiro JSON e gere sua composição.

O comando não deve precisar de alterações no código para cada novo tema.

Garanta que uma renderização não sobrescreva vídeos anteriores.

Organize a saída por identificador de conteúdo.

## Fase 6 — Validação

Crie e execute verificações para:

- JSON válido e inválido
- Campos obrigatórios
- Ordem das cenas
- Durações positivas
- Imagens ausentes
- Template selecionado
- Composição e renderização

Renderize um vídeo completo de demonstração e informe o caminho real do MP4.

## Restrições

- Não alterar o aplicativo Angular.
- Não modificar arquivos fora de `.videos/reels`.
- Não apagar composições, imagens ou renderizações anteriores.
- Não instalar dependências desnecessárias.
- Não usar APIs pagas.
- Não fazer commits.
- Não publicar automaticamente.
- Seguir as APIs reais da versão instalada do HyperFrames.
- Responder em português brasileiro.

## Entrega

Informe a arquitetura implementada, estrutura de arquivos, exemplo de roteiro, comandos de execução, resultado das verificações e localização do vídeo gerado.

Não declare funcionalidades concluídas sem implementá-las e verificá-las.
