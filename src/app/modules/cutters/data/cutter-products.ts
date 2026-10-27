import { CutterProduct } from '../interface/cutter-product.interface';

export const SHOPEE_STORE_URL = 'https://s.shopee.com.br/2VsoUjTdLF';

// Preencher shopeeUrl com o anúncio de cada produto. Até lá, abre a loja real.
export const CUTTER_PRODUCTS: readonly CutterProduct[] = [
  {
    id: 'gratidao-cliente',
    name: 'Gratidão aos clientes',
    category: 'Para agradecer',
    description: 'Um carinho a mais para acompanhar suas encomendas.',
    image: 'images/cortadores/gratidao-cliente.webp',
    imageAlt:
      'Mensagem Gratidão em ter você como cliente marcada na massa, ao lado do marcador branco',
    shopeeUrl: 'https://s.shopee.com.br/3qOC4w8gdK',
  },
  {
    id: 'obrigada-presenca',
    name: 'Obrigada pela presença',
    category: 'Para celebrar',
    description: 'Uma lembrancinha para quem fez parte de um dia especial.',
    image: 'images/cortadores/obrigada-presenca.webp',
    imageAlt: 'Biscoito com bordas onduladas, corações e a mensagem Obrigada pela presença',
    shopeeUrl: 'https://s.shopee.com.br/2qVet9KDds',
  },
  {
    id: 'colecao-fe',
    name: 'Mensagens de fé',
    category: 'Para presentear',
    description: 'Desenhos e palavras para uma lembrança com significado.',
    image: 'images/cortadores/colecao-fe.webp',
    imageAlt: 'Três biscoitos com as mensagens Foi por você, Ele Vive e Você ora Deus ouve',
    shopeeUrl: 'https://s.shopee.com.br/6Am6rK6JiU',
  },
  {
    id: 'nossa-senhora',
    name: 'Nossa Senhora',
    category: 'Para presentear',
    description: 'Um modelo com detalhes para lembrancinhas religiosas.',
    image: 'images/cortadores/nossa-senhora.webp',
    imageAlt:
      'Cortador e marcador branco no formato de Nossa Senhora, com coroa e detalhes do manto',
    shopeeUrl: 'https://s.shopee.com.br/7Ky4FZuZzV',
  },
  {
    id: 'todos',
    name: 'Veja todos',
    category: 'Todos',
    description: 'Veja os outros modelos disponíveis na loja.',
    image: 'images/cortadores/amanda.webp',
    imageAlt:
      'Cortador e marcador branco no formato de Nossa Senhora, com coroa e detalhes do manto',
    shopeeUrl: 'https://s.shopee.com.br/2VsoUjTdLF',
  },
];
