import { CutterProduct } from '../interface/cutter-product.interface';

export const SHOPEE_STORE_URL = 'https://shopee.com.br/nayartes';

// Preencher shopeeUrl com o anúncio de cada produto. Até lá, abre a loja real.
export const CUTTER_PRODUCTS: readonly CutterProduct[] = [
  {
    id: 'gratidao-cliente',
    name: 'Gratidão aos clientes',
    category: 'Para agradecer',
    description: 'Um carinho a mais para acompanhar suas encomendas.',
    image: 'images/cortadores/gratidao-cliente.webp',
    imageAlt: 'Mensagem Gratidão em ter você como cliente marcada na massa, ao lado do marcador branco',
    shopeeUrl: null,
  },
  {
    id: 'obrigada-presenca',
    name: 'Obrigada pela presença',
    category: 'Para celebrar',
    description: 'Uma lembrancinha para quem fez parte de um dia especial.',
    image: 'images/cortadores/obrigada-presenca.webp',
    imageAlt: 'Biscoito com bordas onduladas, corações e a mensagem Obrigada pela presença',
    shopeeUrl: null,
  },
  {
    id: 'colecao-fe',
    name: 'Mensagens de fé',
    category: 'Para presentear',
    description: 'Desenhos e palavras para uma lembrança com significado.',
    image: 'images/cortadores/colecao-fe.webp',
    imageAlt: 'Três biscoitos com as mensagens Foi por você, Ele Vive e Você ora Deus ouve',
    shopeeUrl: null,
  },
  {
    id: 'cachorrinho',
    name: 'Cachorrinho',
    category: 'Para encantar',
    description: 'O formato compridinho que deixa a mesa mais divertida.',
    image: 'images/cortadores/cachorrinho.webp',
    imageAlt: 'Cortador preto de impressão 3D no formato de um cachorro salsicha, inteiro sobre a bancada',
    shopeeUrl: null,
  },
  {
    id: 'nossa-senhora',
    name: 'Nossa Senhora',
    category: 'Para presentear',
    description: 'Um modelo com detalhes para lembrancinhas religiosas.',
    image: 'images/cortadores/nossa-senhora.webp',
    imageAlt: 'Cortador e marcador branco no formato de Nossa Senhora, com coroa e detalhes do manto',
    shopeeUrl: null,
  },
];
