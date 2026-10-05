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

- [x] Menu Achadinhos ativo no mobile e desktop.
- [x] Catálogo local carregado por service.
- [x] Filtros por categoria funcionam.
- [x] Detalhe por slug funciona.
- [x] Link externo abre com `noopener noreferrer` e `sponsored` apenas quando afiliado.
- [x] Disclosure de afiliados visível.
- [x] Home, Comidinhas e Compras exibem no máximo um bloco contextual cada.
- [x] Sem preço fake ou sincronização inexistente.
- [x] SEO e shells do Pages cobrem catálogo e detalhes.
- [x] Nenhuma dependência nova adicionada.
- [x] Build validado pelo CI.


## Validação final

- revisão estática concluída;
- build Angular aprovado no GitHub Actions run `37246280179`;
- shells estáticos de SEO gerados com sucesso no CI;
- PR de implementação: #42;
- merge em `development`: `31c8b19a0da4b99c618ea9f7746024ee60ed6b58`;
- testes unitários não executados, conforme regra operacional do projeto.
