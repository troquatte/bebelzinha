/** Experimento da landing Refeição Resolvida: uma variante por navegador. */
export type SalesVariant = 'a' | 'b';
export const SALES_EXPERIMENT_ID = 'refeicao-resolvida-ab-v1';
export const SALES_VARIANT_STORAGE_KEY = 'bebel.refeicao-resolvida.ab-v1';

export function resolveSalesVariant(
  override: string | null,
  routeVariant: unknown,
  saved: string | null,
  random: number,
): SalesVariant {
  if (override === 'a' || override === 'b') return override;
  if (routeVariant === 'a' || routeVariant === 'b') return routeVariant;
  if (saved === 'a' || saved === 'b') return saved;
  return random < 0.5 ? 'a' : 'b';
}

/** Origem da venda no relatório SCK da Hotmart; preserva parâmetros existentes. */
export function checkoutUrlForVariant(baseUrl: string, variant: SalesVariant): string {
  return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}sck=bebel-ab-${variant}`;
}
