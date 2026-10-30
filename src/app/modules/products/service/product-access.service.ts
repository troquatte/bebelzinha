import { Injectable, signal } from '@angular/core';
import { MEAL_PRODUCT } from '../data/meal-product.config';

const ACCESS_KEY = 'bebel.product-access.refeicao-resolvida.v1';

@Injectable({ providedIn: 'root' })
export class ProductAccessService {
  private readonly allowed = signal(this.restore());
  readonly hasAccess = this.allowed.asReadonly();

  async unlock(code: string): Promise<boolean> {
    const normalized = code.trim();
    if (!/^\d{6}$/.test(normalized)) return false;
    const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(normalized));
    const hash = Array.from(new Uint8Array(buffer), value => value.toString(16).padStart(2, '0')).join('');
    if (hash !== MEAL_PRODUCT.accessCodeHash) return false;
    this.allowed.set(true);
    try {
      localStorage.setItem(ACCESS_KEY, JSON.stringify({ version: MEAL_PRODUCT.accessVersion, verifier: hash }));
    } catch { /* O acesso continua nesta sessão quando o navegador bloqueia armazenamento. */ }
    return true;
  }

  private restore(): boolean {
    try {
      const saved = JSON.parse(localStorage.getItem(ACCESS_KEY) ?? 'null');
      return saved?.version === MEAL_PRODUCT.accessVersion && saved?.verifier === MEAL_PRODUCT.accessCodeHash;
    } catch { return false; }
  }
}
