export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: ShoppingItem[];
}
