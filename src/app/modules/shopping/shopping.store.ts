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
