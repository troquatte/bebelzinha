import { TestBed } from '@angular/core/testing';
import { ShoppingStore } from '../../shopping/service/shopping.store';
import { DinnerPlanStore } from './dinner-plan.store';

describe('DinnerPlanStore', () => {
  beforeEach(() => { localStorage.clear(); TestBed.configureTestingModule({}); });
  afterEach(() => localStorage.clear());

  it('preserves existing shopping lists and creates each dinner list only once', () => {
    const shopping = TestBed.inject(ShoppingStore);
    const original = shopping.createList('Compras que já existiam');
    shopping.addItem(original.id, 'Café');
    const before = JSON.stringify(shopping.lists()[0]);
    const plan = TestBed.inject(DinnerPlanStore);
    const firstId = plan.currentList()!.id;
    plan.selectDay('dia-1');
    expect(plan.currentList()!.id).toBe(firstId);
    expect(shopping.lists()).toHaveLength(2);
    expect(JSON.stringify(shopping.lists()[0])).toBe(before);
    expect(plan.items()).toHaveLength(plan.selectedDay().ingredients.filter(item => item.shopping !== false).length);
  });

  it('keeps shared ingredients independent between days and allows unchecking', () => {
    const plan = TestBed.inject(DinnerPlanStore);
    const cream = plan.items().find(item => item.name.startsWith('Creme de leite'))!;
    plan.setChecked(cream.id, true);
    plan.selectDay('dia-2');
    expect(plan.checkedCount()).toBe(0);
    expect(plan.items().find(item => item.name.startsWith('Creme de leite'))!.checked).toBe(false);
    plan.selectDay('dia-1');
    expect(plan.checkedCount()).toBe(1);
    plan.setChecked(cream.id, false);
    expect(plan.checkedCount()).toBe(0);
  });

  it('restores selected day and marks after reopening without duplicating lists', () => {
    const plan = TestBed.inject(DinnerPlanStore);
    plan.selectDay('dia-2');
    const listId = plan.currentList()!.id;
    plan.setChecked(plan.items()[0].id, true);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const restored = TestBed.inject(DinnerPlanStore);
    expect(restored.selectedDay().id).toBe('dia-2');
    expect(restored.currentList()!.id).toBe(listId);
    expect(restored.checkedCount()).toBe(1);
    expect(TestBed.inject(ShoppingStore).lists()).toHaveLength(2);
  });

  it('recovers only the dinner list deleted in the existing cart', () => {
    const plan = TestBed.inject(DinnerPlanStore);
    const shopping = TestBed.inject(ShoppingStore);
    const old = plan.currentList()!.id;
    shopping.deleteList(old);
    plan.selectDay('dia-1');
    expect(plan.currentList()!.id).not.toBe(old);
    expect(plan.items()).toHaveLength(plan.selectedDay().ingredients.filter(item => item.shopping !== false).length);
    expect(shopping.lists()).toHaveLength(1);
  });

  it('ignores invalid day navigation and recovers malformed progress', () => {
    localStorage.setItem('bebel.dinner-plan.prototype.v1', '{invalid');
    const plan = TestBed.inject(DinnerPlanStore);
    plan.selectDay('dia-22-inexistente');
    expect(plan.selectedDay().id).toBe('dia-1');
    expect(plan.days).toHaveLength(22);
  });
});
