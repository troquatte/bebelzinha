# Tarefa — Onboarding de primeira abertura

## Modo

FULL

## Necessidade

Criar uma apresentação curta da Bebel na primeira abertura do app.

Requisitos:

1. Onboarding com 4 slides, mobile-first, permitindo swipe lateral e botão para avançar.
2. Slides:
   - apresentação da Bebel;
   - Comidinhas;
   - Lista de compras;
   - fechamento / começar.
3. Mostrar indicador visual de progresso.
4. Nos três primeiros slides, permitir “Pular”.
5. Ao concluir o último slide ou pular, salvar `bebel:onboarding-completed = true` no `localStorage`.
6. Se essa chave já estiver concluída, não mostrar novamente automaticamente.
7. Não criar login, backend ou dependência nova.
8. Respeitar a identidade visual da Bebel e `prefers-reduced-motion`.
9. Corrigir o estado vazio de Lista de compras para centralizar corretamente o texto:
   “Crie sua primeira lista e deixe as compras mais fáceis de acompanhar.”
