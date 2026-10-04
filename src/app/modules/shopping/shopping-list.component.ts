import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { ShoppingItem } from './shopping.models';
import { ShoppingStore } from './shopping.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatSlideToggleModule, RouterLink],
  selector: 'app-shopping-list',
  styleUrl: './shopping-list.component.scss',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly store = inject(ShoppingStore);

  readonly listId = this.route.snapshot.paramMap.get('listId') ?? '';
  readonly list = computed(() => this.store.lists().find((list) => list.id === this.listId));
  readonly pendingItems = computed(() =>
    (this.list()?.items ?? []).filter((item) => !item.checked),
  );
  readonly cartItems = computed(() =>
    (this.list()?.items ?? []).filter((item) => item.checked),
  );
  readonly purchasedCount = computed(
    () => this.list()?.items.filter((item) => item.checked).length ?? 0,
  );

  async addItem(): Promise<void> {
    const list = this.list();

    if (!list) {
      return;
    }

    const result = await Swal.fire<string>({
      title: 'Adicionar item',
      text: `O que falta na lista “${list.name}”?`,
      input: 'text',
      inputPlaceholder: 'Ex.: Arroz',
      showCancelButton: true,
      confirmButtonText: 'Adicionar',
      cancelButtonText: 'Agora não',
      confirmButtonColor: '#6f1fb4',
      inputValidator: (value) => (value.trim() ? null : 'Escreva o nome do item.'),
    });

    if (result.isConfirmed && result.value?.trim()) {
      this.store.addItem(this.listId, result.value);
    }
  }

  async editItem(item: ShoppingItem): Promise<void> {
    const result = await Swal.fire<string>({
      title: 'Editar item',
      input: 'text',
      inputValue: item.name,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#6f1fb4',
      inputValidator: (value) => (value.trim() ? null : 'O item precisa de um nome.'),
    });

    if (result.isConfirmed && result.value?.trim()) {
      this.store.updateItem(this.listId, item.id, result.value);
    }
  }

  async deleteItem(item: ShoppingItem): Promise<void> {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Tirar esse item da lista?',
      text: `“${item.name}” será removido.`,
      showCancelButton: true,
      confirmButtonText: 'Sim, remover',
      cancelButtonText: 'Manter',
      confirmButtonColor: '#b42318',
      focusCancel: true,
    });

    if (result.isConfirmed) {
      this.store.deleteItem(this.listId, item.id);
    }
  }

  async editList(): Promise<void> {
    const list = this.list();

    if (!list) {
      return;
    }

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

  async deleteList(): Promise<void> {
    const list = this.list();

    if (!list) {
      return;
    }

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
      await this.router.navigate(['/compras']);
    }
  }

  toggleItem(item: ShoppingItem, event: MatSlideToggleChange): void {
    this.store.setItemChecked(this.listId, item.id, event.checked);
  }
}
