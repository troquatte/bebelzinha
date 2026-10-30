import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-return',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<a routerLink="/"><span class="material-symbols-outlined" aria-hidden="true">arrow_back</span>Voltar para a Bebel</a>',
  styles: ':host{display:block;margin-bottom:.7rem}a{display:inline-flex;align-items:center;gap:.3rem;min-height:2.75rem;color:var(--bebel-primary-soft);font-size:.8rem;text-decoration:none}a:focus-visible{outline:3px solid var(--bebel-orange);outline-offset:3px}@media print{:host{display:none}}',
})
export class ProductReturnComponent {}
