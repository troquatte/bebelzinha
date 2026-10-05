# Tarefa — Achadinhos da Bebel

## Modo

FULL

## Necessidade

Criar a área Achadinhos como catálogo leve de recomendações úteis da Bebel e também permitir recomendações contextuais dentro do app.

Requisitos:
1. Ativar o menu Achadinhos.
2. Criar catálogo local estruturado em JSON, preparado para futura migração para API/banco.
3. Cada achadinho deve ter título, descrição, categoria, loja, imagem, URL externa, tags, contextos e indicação se o link é afiliado.
4. Criar página de catálogo com filtros simples por categoria.
5. Criar página compartilhável de detalhe por slug.
6. Abrir links externos em nova aba com segurança; links afiliados devem usar `rel="sponsored"`.
7. Mostrar aviso transparente de afiliados.
8. Inserir apenas uma recomendação contextual discreta por tela relevante:
   - Home;
   - Comidinhas;
   - Lista de compras.
9. Não transformar a experiência em marketplace nem inserir anúncios entre cada item.
10. Links iniciais podem apontar para buscas públicas dos marketplaces; o contrato deve permitir substituir pela URL de afiliado depois sem alterar componentes.
11. Atualizar SEO/shells estáticos do GitHub Pages para Achadinhos.
12. Sem backend, login, API de marketplace, sincronização de preço ou nova dependência.
