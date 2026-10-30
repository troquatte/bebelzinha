import { Injectable, computed, inject, signal } from '@angular/core';
import { ShoppingStore } from '../../shopping/service/shopping.store';
import { DINNER_DAYS } from '../data/dinner-days';

const STORAGE_KEY = 'bebel.dinner-plan.prototype.v1';
const SETTINGS_KEY = 'bebel.dinner-plan.preferences.v1';
interface DinnerSettings { extraDays: string[]; steps: Record<string, number[]>; }
interface DinnerProgress { selectedDay: string; lists: Record<string, string>; }

@Injectable({ providedIn: 'root' })
export class DinnerPlanStore {
  private readonly shopping = inject(ShoppingStore);
  readonly days = DINNER_DAYS;
  private readonly progress = signal<DinnerProgress>(this.load());
  private readonly settings = signal<DinnerSettings>(this.loadSettings());
  readonly extraMeal = computed(() => this.settings().extraDays.includes(this.progress().selectedDay));
  readonly selectedDay = computed(() => {
    const day = this.days.find(day => day.id === this.progress().selectedDay) ?? this.days[0];
    return this.extraMeal() ? { ...day, servings: day.servings * 2,
      ingredients: day.ingredients.map(item => ({ ...item, label: item.extraLabel ?? item.label })) } : day;
  });
  private readonly stepKey = computed(() => this.selectedDay().id + (this.selectedDay().contentRevision ? ':' + this.selectedDay().contentRevision : '') + (this.selectedDay().stepsRevision ? ':' + this.selectedDay().stepsRevision : ''));
  readonly completedSteps = computed(() => this.settings().steps[this.stepKey()] ?? []);
  private readonly listKey = computed(() => this.selectedDay().id + (this.selectedDay().contentRevision ? ':' + this.selectedDay().contentRevision : '') + (this.extraMeal() ? ':extra' : ''));
  readonly currentList = computed(() => this.shopping.dinnerLists().find(list => list.id === this.progress().lists[this.listKey()]));
  readonly items = computed(() => {
    const excluded = new Set(this.selectedDay().ingredients.filter(item => item.shopping === false).map(item => item.label));
    return (this.currentList()?.items ?? []).filter(item => !excluded.has(item.name));
  });
  readonly checkedCount = computed(() => this.items().filter(item => item.checked).length);

  constructor() { this.selectDay(this.selectedDay().id); }

  selectDay(id: string): void {
    const day = this.days.find(value => value.id === id);
    if (!day) return;
    const extra = this.settings().extraDays.includes(id);
    const key = id + (day.contentRevision ? ':' + day.contentRevision : '') + (extra ? ':extra' : '');
    let listId = this.progress().lists[key];
    if (!this.shopping.dinnerLists().some(list => list.id === listId)) {
      const list = this.shopping.createList(`Refeição Resolvida — Dia ${day.day}: ${day.title}${extra ? ' — Hoje + outra refeição' : ''}`, 'dinner-plan');
      listId = list.id;
      this.shopping.addItemsIfMissing(listId, day.ingredients.filter(ingredient => ingredient.shopping !== false).map(ingredient => ({ baseName: ingredient.label.split(' — ')[0], displayName: extra ? ingredient.extraLabel ?? ingredient.label : ingredient.label })));
    }
    const next = { selectedDay: id, lists: { ...this.progress().lists, [key]: listId } };
    this.progress.set(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Mantém o estado desta sessão. */ }
  }

  setExtraMeal(extra: boolean): void {
    const id = this.selectedDay().id;
    const extraDays = this.settings().extraDays.filter(value => value !== id);
    if (extra) extraDays.push(id);
    this.saveSettings({ ...this.settings(), extraDays });
    this.selectDay(id);
  }

  toggleStep(index: number): void {
    if (index < 0 || index >= this.selectedDay().steps.length) return;
    const completed = this.completedSteps();
    const next = completed.includes(index) ? completed.filter(value => value !== index) : [...completed, index];
    this.saveSettings({ ...this.settings(), steps: { ...this.settings().steps, [this.stepKey()]: next } });
  }

  private saveSettings(settings: DinnerSettings): void {
    this.settings.set(settings);
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch { /* Mantém a sessão. */ }
  }

  private loadSettings(): DinnerSettings {
    try {
      const value = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? 'null');
      if (value && Array.isArray(value.extraDays) && value.steps && typeof value.steps === 'object' && !Array.isArray(value.steps)) {
        return { extraDays: value.extraDays.filter((id: unknown) => typeof id === 'string' && this.days.some(day => day.id === id)),
          steps: Object.fromEntries(Object.entries(value.steps).filter(([, steps]) => Array.isArray(steps)).map(([id, steps]) => [id, (steps as unknown[]).filter((step): step is number => typeof step === 'number' && Number.isInteger(step) && step >= 0)])) };
      }
    } catch { /* Preferências inválidas iniciam vazias. */ }
    return { extraDays: [], steps: {} };
  }

  setChecked(itemId: string, checked: boolean): void {
    const list = this.currentList();
    if (list) this.shopping.setItemChecked(list.id, itemId, checked);
  }

  private load(): DinnerProgress {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
      if (parsed && typeof parsed === 'object' && 'selectedDay' in parsed && 'lists' in parsed && typeof parsed.selectedDay === 'string' && parsed.lists && typeof parsed.lists === 'object' && !Array.isArray(parsed.lists)) {
        return { selectedDay: parsed.selectedDay, lists: Object.fromEntries(Object.entries(parsed.lists).filter(([, value]) => typeof value === 'string')) };
      }
    } catch { /* Progresso ausente ou inválido inicia no primeiro dia. */ }
    return { selectedDay: this.days[0].id, lists: {} };
  }
}
