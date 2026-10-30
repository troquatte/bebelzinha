import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ShoppingItem } from '../interface/shopping.models';

@Component({
  selector: 'app-shopping-checklist',
  host: { '[class.compact-headings]': 'compactHeadings()' },
  imports: [MatSlideToggleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shopping-checklist.component.html',
  styleUrl: './shopping-checklist.component.scss',
})
export class ShoppingChecklistComponent {
  readonly items = input.required<ShoppingItem[]>();
  readonly editable = input(false);
  readonly compactHeadings = input(false);
  readonly idPrefix = input('shopping');
  readonly checkedChange = output<{ item: ShoppingItem; checked: boolean }>();
  readonly edit = output<ShoppingItem>();
  readonly remove = output<ShoppingItem>();
  readonly groups = computed(() => [
    { id: 'pending', eyebrow: 'Pra não esquecer', title: 'Falta pegar', checked: false,
      items: this.items().filter(item => !item.checked), empty: 'Prontinho. Não falta pegar mais nada.' },
    { id: 'cart', eyebrow: 'Já resolvido', title: 'Já no carrinho', checked: true,
      items: this.items().filter(item => item.checked), empty: 'Quando você marcar um item, ele vem pra cá.' },
  ]);
}
