export function recipeYieldLabel(servings: number, unit: string): string {
  const plurals: Record<string, string> = { 'porção': 'porções', 'bolinho': 'bolinhos', 'pedaço': 'pedaços', 'fatia': 'fatias', 'unidade': 'unidades', 'pão': 'pães', 'brigadeiro': 'brigadeiros', 'banana': 'bananas', 'bolo': 'bolos' };
  return servings + ' ' + (servings === 1 ? unit : plurals[unit] ?? unit);
}
