# Tarefa — Corrigir GA4 e microinterações dos heroes

## Modo

FULL

## Necessidade

1. Corrigir a integração do Google Analytics 4 para a SPA usando o snippet oficial fornecido pelo usuário.
2. Tornar as microinterações dos heroes visíveis e consistentes nas páginas Home, Compras, Comidinhas e Achadinhos.
3. Ao final, sincronizar `development` e `main`.

## Requisitos

- usar `G-RL10XLKR71`;
- carregar o snippet oficial no `<head>`;
- usar `send_page_view: false` para evitar duplicidade em SPA;
- Angular deve enviar `page_view` nas mudanças de rota;
- não carregar um segundo `gtag.js` dinamicamente;
- manter `prefers-reduced-motion`;
- tornar o padrão de movimento perceptível sem exagero;
- não adicionar dependências.
