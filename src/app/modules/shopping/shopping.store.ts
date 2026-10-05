import { Injectable, signal } from '@angular/core';

import { ShoppingItem, ShoppingList } from './shopping.models';

const STORAGE_KEY = 'bebel.shopping-lists.v1';

@Injectable({ providedIn: 'root' })
export class ShoppingStore {
  private readonly state = signal<ShoppingList[]>(this.load());

  readonly lists = this.state.asReadonly();

  createList(name: string): ShoppingList {
    const now = new Date().toISOString();
    const list: ShoppingList = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: now,
      updatedAt: now,
      items: [],
    };

    this.commit([...this.state(), list]);

    return list;
  }

  repeatList(listId: string): ShoppingList | null {
    const source = this.state().find((list) => list.id === listId);

    if (!source) {
      return null;
    }

    const now = new Date();
    const timestamp = now.toISOString();
    const dateLabel = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`;
    const baseName = source.name.replace(/\s+—\s+\d{2}\/\d{2}$/, '').trim();
    const repeated: ShoppingList = {
      id: crypto.randomUUID(),
      name: `${baseName} — ${dateLabel}`,
      createdAt: timestamp,
      updatedAt: timestamp,
      items: source.items.map((item) => ({
        ...item,
        id: crypto.randomUUID(),
        checked: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      })),
    };

    this.commit([...this.state(), repeated]);
    return repeated;
  }

  updateList(listId: string, name: string): void {
    const now = new Date().toISOString();

    this.commit(
      this.state().map((list) =>
        list.id === listId
          ? { ...list, name: name.trim(), updatedAt: now }
          : list,
      ),
    );
  }

  deleteList(listId: string): void {
    this.commit(this.state().filter((list) => list.id !== listId));
  }

  addItemIfMissing(
    listId: string,
    baseName: string,
    displayName = baseName,
  ): 'added' | 'duplicate' | 'list-not-found' {
    const result = this.addItemsIfMissing(listId, [{ baseName, displayName }]);

    if (result.listNotFound) {
      return 'list-not-found';
    }

    return result.added > 0 ? 'added' : 'duplicate';
  }

  addItemsIfMissing(
    listId: string,
    items: Array<{ baseName: string; displayName?: string }>,
  ): { added: number; duplicated: number; listNotFound: boolean } {
    const currentLists = this.state();
    const listIndex = currentLists.findIndex((list) => list.id === listId);

    if (listIndex < 0) {
      return { added: 0, duplicated: 0, listNotFound: true };
    }

    const list = currentLists[listIndex];
    const existingNames = new Set(
      list.items.map((item) => this.normalizeItemName(item.name.split(' — ')[0])),
    );
    const timestamp = new Date().toISOString();
    const newItems: ShoppingItem[] = [];
    let duplicated = 0;

    for (const item of items) {
      const normalized = this.normalizeItemName(item.baseName);

      if (existingNames.has(normalized)) {
        duplicated += 1;
        continue;
      }

      existingNames.add(normalized);
      newItems.push({
        id: crypto.randomUUID(),
        name: (item.displayName ?? item.baseName).trim(),
        checked: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    }

    if (newItems.length === 0) {
      return { added: 0, duplicated, listNotFound: false };
    }

    const nextLists = [...currentLists];
    nextLists[listIndex] = {
      ...list,
      updatedAt: timestamp,
      items: [...list.items, ...newItems],
    };

    this.commit(nextLists);
    return { added: newItems.length, duplicated, listNotFound: false };
  }

  addItem(listId: string, name: string): ShoppingItem | null {
    const now = new Date().toISOString();
    const item: ShoppingItem = {
      id: crypto.randomUUID(),
      name: name.trim(),
      checked: false,
      createdAt: now,
      updatedAt: now,
    };

    let inserted = false;

    const lists = this.state().map((list) => {
      if (list.id !== listId) {
        return list;
      }

      inserted = true;
      return {
        ...list,
        updatedAt: now,
        items: [...list.items, item],
      };
    });

    if (!inserted) {
      return null;
    }

    this.commit(lists);
    return item;
  }

  updateItem(listId: string, itemId: string, name: string): void {
    const now = new Date().toISOString();

    this.commit(
      this.state().map((list) =>
        list.id === listId
          ? {
              ...list,
              updatedAt: now,
              items: list.items.map((item) =>
                item.id === itemId
                  ? { ...item, name: name.trim(), updatedAt: now }
                  : item,
              ),
            }
          : list,
      ),
    );
  }

  deleteItem(listId: string, itemId: string): void {
    const now = new Date().toISOString();

    this.commit(
      this.state().map((list) =>
        list.id === listId
          ? {
              ...list,
              updatedAt: now,
              items: list.items.filter((item) => item.id !== itemId),
            }
          : list,
      ),
    );
  }

  setItemChecked(listId: string, itemId: string, checked: boolean): void {
    const now = new Date().toISOString();

    this.commit(
      this.state().map((list) =>
        list.id === listId
          ? {
              ...list,
              updatedAt: now,
              items: list.items.map((item) =>
                item.id === itemId
                  ? { ...item, checked, updatedAt: now }
                  : item,
              ),
            }
          : list,
      ),
    );
  }

  private normalizeItemName(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  private commit(lists: ShoppingList[]): void {
    this.state.set(lists);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  }

  private load(): ShoppingList[] {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    try {
      const parsed: unknown = JSON.parse(stored);
      return Array.isArray(parsed) ? (parsed as ShoppingList[]) : [];
    } catch {
      return [];
    }
  }
}
