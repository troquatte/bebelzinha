import { describe, expect, it } from 'vitest';
import { checkoutUrlForVariant, resolveSalesVariant } from './sales-experiment';

describe('experimento da página de vendas', () => {
  it('distribui o primeiro acesso a partir do sorteio', () => {
    expect(resolveSalesVariant(null, null, null, 0.01)).toBe('a');
    expect(resolveSalesVariant(null, null, null, 0.99)).toBe('b');
  });
  it('mantém o grupo já salvo na mesma visita', () => {
    expect(resolveSalesVariant(null, null, 'b', 0.01)).toBe('b');
    expect(resolveSalesVariant(null, null, 'a', 0.99)).toBe('a');
  });
  it('permite prévias explícitas A/B e rotas dedicadas', () => {
    expect(resolveSalesVariant('b', 'a', 'a', 0.01)).toBe('b');
    expect(resolveSalesVariant(null, 'a', 'b', 0.99)).toBe('a');
  });
  it('mantém o checkout e identifica as vendas no SCK da Hotmart', () => {
    expect(checkoutUrlForVariant('https://pay.hotmart.com/XYZ?bid=123', 'b'))
      .toBe('https://pay.hotmart.com/XYZ?bid=123&sck=bebel-ab-b');
    expect(checkoutUrlForVariant('https://pay.hotmart.com/XYZ', 'a'))
      .toBe('https://pay.hotmart.com/XYZ?sck=bebel-ab-a');
  });
});
