# SDD 002 — Direção Visual da Fábrica de Reels da Bebelzinha

## Contexto

O SDD 001 implementou uma fábrica funcional de Reels com HyperFrames, TypeScript, JSON e FFmpeg.

A fábrica já conseguiu renderizar dois roteiros diferentes sem alterar os templates.

Agora precisamos elevar a qualidade visual, mantendo a arquitetura existente.

## Objetivo

Preparar e implementar uma direção visual reutilizável para a Bebelzinha, com templates capazes de combinar ilustrações, personagens, cenários e textos dinâmicos.

O resultado precisa parecer um conteúdo original da Bebelzinha, não uma apresentação simples com fundo roxo.

## Fase 1 — Auditoria

Antes de alterar arquivos:

1. Leia AGENTS.md e specs/001-reels-factory.md.
2. Analise factory/schema.ts, templates.ts, generator.ts e validate.ts.
3. Inspecione a biblioteca de assets.
4. Consulte a skill de identidade visual da Bebel.
5. Identifique imagens com textos embutidos, quando possível.
6. Preserve a API atual e os roteiros existentes.

Não presuma que uma imagem está livre de textos se não conseguir verificá-la.

## Fase 2 — Especificação

Crie specs/002-visual-direction.md contendo:

- Objetivo e escopo.
- Identidade visual da Bebelzinha.
- Paleta por categoria.
- Tipografia e hierarquia visual.
- Áreas seguras do Instagram.
- Estratégia de uso de personagens.
- Estratégia de cenários e ilustrações.
- Contratos dos recursos visuais.
- Requisitos de acessibilidade.
- Critérios de aceitação.
- Estratégia de testes.
- Plano de migração compatível com SDD 001.

## Fase 3 — Biblioteca visual

Defina uma estrutura reutilizável para:

- Personagem principal.
- Poses e expressões.
- Cenários de cozinha e supermercado.
- Objetos domésticos e alimentos.
- Fundos por categoria.
- Elementos decorativos.

Os recursos visuais deverão ser independentes dos textos do roteiro.

Não gerar imagens fictícias nem baixar imagens aleatórias da internet.

Crie um manifesto JSON com a identificação, categoria, função e caminho dos assets disponíveis.

Se faltarem imagens, documente exatamente quais devem ser produzidas, incluindo descrição, enquadramento, transparência e proporção.

## Fase 4 — Templates

Evolua os quatro templates existentes:

1. Opening — abertura com gancho e personagem.
2. Tip — uma dica com ilustração e texto legível.
3. List — lista com hierarquia visual clara.
4. CTA — Bebel em destaque com chamada para ação.

Os templates devem:

- Consumir textos do roteiro JSON.
- Permitir imagens opcionais.
- Manter a identidade visual da personagem.
- Adaptar o layout à quantidade de texto.
- Evitar sobreposições.
- Preservar áreas seguras.
- Ser reutilizáveis em outros conteúdos.

Não colocar texto dinâmico sobre imagens que já contenham textos embutidos.

Se um asset estiver ausente, usar um fallback gráfico bem composto, sem depender apenas de um monograma gigante.

## Fase 5 — Compatibilidade

- Preserve os roteiros JSON existentes.
- Não quebre a CLI.
- Não altere o aplicativo Angular.
- Não modifique arquivos fora de .videos/reels.
- Não remova renders anteriores.
- Não faça commits.
- Não utilize APIs pagas.
- Não instale dependências desnecessárias.

## Fase 6 — Validação

1. Execute os testes existentes.
2. Adicione testes específicos para a seleção de assets e layouts.
3. Gere novamente um dos roteiros existentes.
4. Execute o HyperFrames check.
5. Renderize um novo MP4 de demonstração.
6. Preserve os vídeos anteriores.
7. Não declare aprovação visual completa sem inspeção real das imagens.

## Entrega

Responda em português brasileiro e apresente:

1. Arquitetura visual implementada.
2. Arquivos criados e modificados.
3. Lista de imagens reutilizáveis disponíveis.
4. Lista exata de imagens ainda necessárias.
5. Testes executados e resultados.
6. Caminho do MP4 de demonstração.
7. Limitações ainda existentes.

IMPORTANTE: Antes de implementar templates que dependam de imagens inexistentes, faça a parte independente dos assets e apresente a lista de imagens necessárias. Não substitua a personagem por ilustrações genéricas nem descaracterize a Bebel.
