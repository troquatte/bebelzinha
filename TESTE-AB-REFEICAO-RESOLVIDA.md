# Refeição Resolvida — Teste A/B de página de vendas

## URLs após publicação

- **Principal (distribuição automática 50/50):** `https://bebelzinha.com.br/produtos/refeicao-resolvida?venda=instagram`
- **Prévia A:** `https://bebelzinha.com.br/produtos/refeicao-resolvida/teste-a?apresentacao=1`
- **Prévia B:** `https://bebelzinha.com.br/produtos/refeicao-resolvida/teste-b?apresentacao=1`
- **Forçar a versão em uma visita:** `?ab=a` ou `?ab=b` (ex.: `?venda=instagram&ab=b`). Não usar esses parâmetros no anúncio principal se desejar distribuição aleatória.

## O que muda

**A — Emocional:** problema do almoço/jantar → benefício → fotografias ilustrativas de 4 receitas que integram o produto → vídeo real existente → funcionamento → preço e dúvidas.

**B — Direta:** funcionalidades e preço na primeira dobra, vídeo na capa, cartões de benefício e pratos. Cada variante usa exatamente o mesmo produto, código, preço e checkout da Hotmart.

## Como o teste funciona

O primeiro visitante sem seleção explícita recebe aleatoriamente A ou B; a escolha fica em `localStorage`, chave `bebel.refeicao-resolvida.ab-v1`. Limpar essa chave (ou usar navegação anônima) permite repetir a atribuição em testes. A distribuição não exige cookies de terceiros. Ao visitar links de prévia, a atribuição automática não é sobrescrita.

Os eventos GA4 e Pixel existentes `ProductSalesView`, `ProductVideoPlay`, `ProductCheckoutClick` recebem `sales_variant` (`A`/`B`) e `sales_experiment` (`refeicao-resolvida-ab-v1`). O clique também informa `cta_position`. Consulte a configuração de dimensões personalizadas no GA4 se quiser segmentar esses parâmetros nos relatórios.

O link da Hotmart mantém o `bid` e ganha **`sck=bebel-ab-a` ou `sck=bebel-ab-b`**. Na Hotmart, vá a **Vendas > Gestão de vendas > Dashboard de Origem de Vendas > SCK** para verificar vendas por versão. O parâmetro SCK em links diretos de checkout é documentado pela Hotmart: https://suportehotmart.zendesk.com/hc/pt-br/articles/216441797-Como-identificar-a-origem-das-minhas-vendas-na-Hotmart.

**Atenção:** o evento `ProductCheckoutClick` mede o clique de saída, não comprova que o checkout carregou nem que o cliente iniciou o pagamento. Compare **vendas aprovadas por SCK / visitantes por versão**, e não apenas CTR. Aguarde volume suficiente antes de declarar vencedora; evite mudar anúncios, preço e página ao mesmo tempo.

## Revisões antes de anunciar

1. Conferir as duas versões no celular e verificar que todos os botões abrem **o mesmo produto de R$ 27 na Hotmart**, com os parâmetros SCK corretos.
2. Conferir se o código de acesso é realmente entregue a quem compra. **O mecanismo existente é local e não verifica pagamento com a Hotmart**. Este teste não altera esse comportamento; ele ainda precisa de validação para vendas reais.
3. Conferir o relatório SCK após uma venda real de teste validada pelo produtor (não é necessário efetuar compras apenas para validar a interface).
4. Publicar o build da aplicação usando o fluxo de deploy já existente; esta entrega é de **código-fonte**, não representa publicação automática no domínio.

## Comandos

Instalar dependências e compilar no ambiente Node.js exigido pelo Angular 22:

```bash
npm ci
npm run build
npm test
```
