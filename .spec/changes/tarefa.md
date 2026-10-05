# Tarefa — Microinterações de Achadinhos e Google Analytics

## Modo

FULL

## Necessidade

1. Adicionar microinterações sutis à experiência de Achadinhos, preservando identidade visual, acessibilidade, mobile first e suporte a `prefers-reduced-motion`.
2. Deixar o Google Analytics 4 preparado para a SPA, sem inventar Measurement ID enquanto a propriedade ainda não foi criada.

## Requisitos

- reutilizar a implementação atual de Achadinhos;
- não adicionar biblioteca de animação;
- não alterar a estrutura funcional do catálogo;
- aplicar feedback visual em cards, imagens, CTAs, filtros e detalhe;
- animações devem ser discretas e não bloquear interação;
- respeitar `prefers-reduced-motion`;
- configurar GA4 sem dependência externa de Angular;
- carregar o script do Google somente quando existir um Measurement ID válido no HTML;
- acompanhar page views da navegação SPA;
- manter a aplicação funcional sem Measurement ID;
- não criar backend, consent manager ou rastreamento de eventos customizados nesta entrega.
