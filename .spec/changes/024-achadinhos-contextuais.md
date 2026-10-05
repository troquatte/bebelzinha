# 024-achadinhos-contextuais

## Objetivo

Criar a primeira camada de monetização contextual da Bebel sem prejudicar a utilidade do app.

## Produto

Achadinhos possui duas superfícies:
- catálogo próprio em `/achadinhos`;
- recomendações contextuais discretas em áreas onde o produto realmente pode ajudar.

A recomendação contextual deve parecer uma indicação útil da Bebel, não um banner genérico.

## Modelo

Cada item contém:
- `id`;
- `slug`;
- `title`;
- `description`;
- `bebelNote`;
- `image`;
- `category`;
- `store`;
- `affiliateUrl`;
- `isAffiliate`;
- `badge`;
- `tags`;
- `contexts`;
- `active`.

## Catálogo inicial

Usar seis itens genéricos úteis à rotina doméstica, com imagens locais e links públicos de busca dos marketplaces. Esses links não devem ser marcados como afiliados até serem substituídos por URLs reais de programas de afiliados.

## UX

- catálogo mobile-first;
- filtros: Todos, Cozinha, Limpeza, Organização e Lavanderia;
- card com imagem, nome, frase curta da Bebel, loja e CTA `Ver achadinho`;
- detalhe compartilhável por slug;
- disclosure: alguns links podem ser afiliados e gerar comissão sem custo extra;
- recomendação contextual limitada a um bloco por tela.

## Integrações contextuais

- Home: recomendação geral útil.
- Comidinhas: itens ligados a cozinha/organização de alimentos.
- Compras: itens ligados a mercado/organização.

## SEO

Adicionar metadata runtime e shells estáticos para:
- `/achadinhos`;
- `/achadinhos/:slug`.

## Fora de escopo

- preço sincronizado;
- carrinho/checkout;
- API de marketplace;
- scraping;
- ranking por comissão;
- personalização por dados pessoais;
- backend;
- autenticação.

## Critérios de aceite

- [~] Menu Achadinhos ativo no mobile e desktop.
- [~] Catálogo local carregado por service.
- [~] Filtros por categoria funcionam.
- [~] Detalhe por slug funciona.
- [~] Link externo abre com `noopener noreferrer` e `sponsored` apenas quando afiliado.
- [~] Disclosure de afiliados visível.
- [~] Home, Comidinhas e Compras exibem no máximo um bloco contextual cada.
- [~] Sem preço fake ou sincronização inexistente.
- [~] SEO e shells do Pages cobrem catálogo e detalhes.
- [~] Nenhuma dependência nova adicionada.
- [~] Build validado pelo CI.
