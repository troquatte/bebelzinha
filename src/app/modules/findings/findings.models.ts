export type FindingCategory = 'cozinha' | 'limpeza' | 'organizacao' | 'lavanderia';
export type FindingStore = 'amazon' | 'shopee' | 'mercado-livre';
export type FindingContext = 'home' | 'meals' | 'shopping';

export interface Finding {
  id: string;
  slug: string;
  title: string;
  description: string;
  bebelNote: string;
  image: string;
  category: FindingCategory;
  store: FindingStore;
  affiliateUrl: string;
  isAffiliate: boolean;
  badge: 'bebel-indica' | 'bom-custo-beneficio' | 'facilita-a-vida';
  tags: string[];
  contexts: FindingContext[];
  active: boolean;
}
