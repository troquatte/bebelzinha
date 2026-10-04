import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { SeoService } from '../../core/seo.service';
import { ShoppingList } from './shopping.models';
import { ShoppingStore } from './shopping.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-shopping-lists',
  styleUrl: './shopping-lists.component.scss',
  templateUrl: './shopping-lists.component.html',
})
export class ShoppingListsComponent {
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  readonly store = inject(ShoppingStore);
  readonly lists = this.store.lists;

  constructor() {
    this.seo.update({
      title: 'Lista de compras da Bebel - Organize o mercado sem complicação',
      description:
        'Crie suas listas de compras, marque o que já foi para o carrinho e leve ingredientes das receitas da Bebel para o mercado.',
      path: '/compras',
    });
  }

  async createList(): Promise<void> {
    const result = await Swal.fire<string>({
      title: 'Nova lista',
      text: 'Como você quer chamar essa lista?',
      input: 'text',
      inputPlaceholder: 'Ex.: Compras da semana',
      showCancelButton: true,
      confirmButtonText: 'Criar lista',
      cancelButtonText: 'Agora não',
      confirmButtonColor: '#6f1fb4',
      inputValidator: (value) => (value.trim() ? null : 'Dê um nome para a lista.'),
    });

    if (!result.isConfirmed || !result.value?.trim()) {
      return;
    }

    const list = this.store.createList(result.value);
    await this.router.navigate(['/compras', list.id]);
  }

  async editList(list: ShoppingList): Promise<void> {
    const result = await Swal.fire<string>({
      title: 'Editar nome da lista',
      input: 'text',
      inputValue: list.name,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#6f1fb4',
      inputValidator: (value) => (value.trim() ? null : 'A lista precisa de um nome.'),
    });

    if (result.isConfirmed && result.value?.trim()) {
      this.store.updateList(list.id, result.value);
    }
  }

  async deleteList(list: ShoppingList): Promise<void> {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Excluir essa lista?',
      text: `“${list.name}” e todos os itens dela serão apagados deste aparelho.`,
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Manter lista',
      confirmButtonColor: '#b42318',
      focusCancel: true,
    });

    if (result.isConfirmed) {
      this.store.deleteList(list.id);
    }
  }

  purchasedCount(list: ShoppingList): number {
    return list.items.filter((item) => item.checked).length;
  }
}
