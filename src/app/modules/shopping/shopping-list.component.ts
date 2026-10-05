import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { AnalyticsService } from '../../core/analytics.service';
import { SeoService } from '../../core/seo.service';
import { FindingSpotlightComponent } from '../findings/finding-spotlight.component';
import { ShoppingItem } from './shopping.models';
import { ShoppingStore } from './shopping.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FindingSpotlightComponent, MatSlideToggleModule, RouterLink],
  selector: 'app-shopping-list',
  styleUrl: './shopping-list.component.scss',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
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

  private hasTrackedOpen = false;

  constructor() {
    effect(() => {
      const list = this.list();

      if (list && !this.hasTrackedOpen) {
        this.hasTrackedOpen = true;
        this.analytics.track('OpenShoppingList', {
          item_count: list.items.length,
          purchased_count: list.items.filter((item) => item.checked).length,
        });
      }

      this.seo.update({
        title: list ? `${list.name} - Lista de compras | Bebel` : 'Lista de compras - Bebel',
        description:
          'Organize o que falta pegar e o que já está no carrinho com uma lista de compras simples da Bebel.',
        path: this.listId ? `/compras/${this.listId}` : '/compras',
      });
    });
  }

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
      const item = this.store.addItem(this.listId, result.value);

      if (item) {
        this.analytics.track('AddItem', { source: 'shopping' });
      }
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

  async repeatList(): Promise<void> {
    const repeated = this.store.repeatList(this.listId);

    if (!repeated) {
      return;
    }

    this.analytics.track('RepeatList', {
      item_count: repeated.items.length,
    });

    await this.router.navigate(['/compras', repeated.id]);
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

    if (event.checked) {
      this.analytics.track('CompleteItem', { source: 'shopping' });
    }
  }
}
