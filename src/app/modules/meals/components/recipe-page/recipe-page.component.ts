import { RecipeProductCtaComponent } from '../../../products/components/recipe-product-cta/recipe-product-cta.component';
import { RecipeToolsComponent } from '../../../../shared/components/recipe-tools/recipe-tools.component';
import { recipeStructuredData } from '../../helpers/recipe-structured-data';
import { ShoppingChecklistComponent } from '../../../shopping/components/shopping-checklist.component';
import { DinnerActionsComponent } from '../../../dinner-plan/components/dinner-actions.component';
import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/seo.service';
import { NotFound } from '../../../../shared/components/not-found/not-found';
import { recipeBySlug, recipePath } from '../../helpers/recipe-library';
import { PublicRecipe, RecipeIngredient } from '../../interface/public-recipe.models';

interface RecipeProgress {
  ingredients: string[];
  steps: string[];
  listId: string | null;
}
const emptyProgress = (): RecipeProgress => ({ ingredients: [], steps: [], listId: null });

@Component({
  selector: 'app-recipe-page',
  host: { '(window:scroll)': 'updateShortcut()', '(window:resize)': 'updateShortcut()', '(window:beforeprint)': 'preparePrint()', '(window:afterprint)': 'restoreAfterPrint()' },
  imports: [RouterLink, NotFound, ShoppingChecklistComponent, DinnerActionsComponent, RecipeToolsComponent, RecipeProductCtaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss',
})
export class RecipePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly pageTop = viewChild<ElementRef<HTMLElement>>('pageTop');
  private readonly shoppingHeading = viewChild<ElementRef<HTMLElement>>('shoppingHeading');
  private closedPrintPanels: HTMLDetailsElement[] = [];
  readonly showingShopping = signal(false);
  readonly videoStarted = signal(false);
  private ready = false;
  readonly recipe = signal<PublicRecipe | undefined>(undefined);
  readonly servings = signal(1);
  readonly selectedPortion = computed(() => this.recipe()?.recipe.portions?.find(portion => portion.servings === this.servings()));
  readonly equipment = computed(() => this.selectedPortion()?.equipment ?? this.recipe()?.recipe.equipment ?? []);
  readonly ingredients = computed(() => (this.recipe()?.recipe.ingredients ?? []).map(item => ({ ...item, ...this.selectedPortion()?.ingredientOverrides.find(override => override.id === item.id) })));
  readonly steps = computed(() => (this.recipe()?.recipe.steps ?? []).map(step => ({ ...step, ...this.selectedPortion()?.stepOverrides.find(override => override.id === step.id) })));
  readonly progress = signal<RecipeProgress>(emptyProgress());
  readonly storageAvailable = signal(true);
  readonly videoUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.recipe()?.videoId ?? '')}?rel=0&autoplay=1`,
  ));
  readonly shoppingItems = computed(() => this.ingredients().filter(item => item.shopping !== false).map(item => ({ id: item.id, name: `${item.name} — ${this.amount(item)}${item.note ? ` (${item.note})` : ''}`, checked: this.progress().ingredients.includes(item.id), createdAt: '', updatedAt: '' })));
  readonly resolvedShopping = computed(() => this.shoppingItems().filter(item => item.checked).length);
  readonly completedSteps = computed(() => this.progress().steps.length);

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const recipe = recipeBySlug(params.get('slug') ?? '');
      this.recipe.set(recipe);
      this.videoStarted.set(false);
      this.servings.set(recipe?.recipe.yield.servings ?? 1);
      this.progress.set(emptyProgress());
      if (recipe) this.seo.update({ ...recipe.seo, path: recipePath(recipe.slug), image: recipe.image.src, imageAlt: recipe.image.alt, type: 'article', structuredData: recipeStructuredData(recipe) });
      if (this.ready) this.restoreSelection();
    });
    afterNextRender(() => {
      this.ready = true;
      this.restoreSelection();
    });
  }

  printRecipe(): void { window.print(); }
  preparePrint(): void {
    if (this.closedPrintPanels.length) return;
    this.closedPrintPanels = Array.from(this.element.nativeElement.querySelectorAll<HTMLDetailsElement>('details.recipe-print-panel:not([open])'));
    this.closedPrintPanels.forEach(panel => panel.open = true);
  }
  restoreAfterPrint(): void {
    this.closedPrintPanels.forEach(panel => panel.open = false);
    this.closedPrintPanels = [];
  }
  updateShortcut(): void {
    const heading = this.shoppingHeading()?.nativeElement;
    if (heading) this.showingShopping.set(window.scrollY > 100 && heading.getBoundingClientRect().top < window.innerHeight * .55);
  }
  useShortcut(): void {
    const target = this.showingShopping() ? this.pageTop()?.nativeElement : this.shoppingHeading()?.nativeElement;
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ behavior: 'instant', block: 'start' });
    this.updateShortcut();
  }

  chooseServings(servings: number): void {
    if (!this.recipe()?.recipe.portions?.some(portion => portion.servings === servings)) return;
    this.servings.set(servings);
    this.progress.set(emptyProgress());
    this.restore();
    this.syncStructuredData();
    try { localStorage.setItem(this.selectionKey(), String(servings)); }
    catch { this.storageAvailable.set(false); }
  }

  private selectionKey(): string { return `bebel.public-recipe.portion.v1:${this.recipe()?.id}`; }

  private restoreSelection(): void {
    try {
      const saved = Number(localStorage.getItem(this.selectionKey()));
      if (this.recipe()?.recipe.portions?.some(portion => portion.servings === saved)) this.servings.set(saved);
    } catch { this.storageAvailable.set(false); }
    this.restore();
    this.syncStructuredData();
  }

  private syncStructuredData(): void {
    const recipe = this.recipe();
    if (recipe) this.seo.setStructuredData(recipeStructuredData(recipe, this.servings()));
  }

  amount(item: RecipeIngredient): string {
    return item.quantity === null ? item.unit : `${item.quantity.toLocaleString('pt-BR')} ${item.unit}`;
  }

  toggle(group: 'ingredients' | 'steps', id: string, checked: boolean): void {
    const current = this.progress();
    this.progress.set({ ...current, [group]: checked ? [...new Set([...current[group], id])] : current[group].filter(value => value !== id) });
    this.persist();
  }

  private key(): string { return `bebel.public-recipe.v1:${this.recipe()?.id}:${this.servings()}`; }

  private restore(): void {
    const recipe = this.recipe();
    if (!recipe) return;
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(this.key()) ?? (this.servings() === recipe.recipe.yield.servings ? localStorage.getItem(`bebel.public-recipe.v1:${recipe.id}`) : null) ?? 'null');
      if (!stored || typeof stored !== 'object') return;
      const value = stored as Partial<RecipeProgress>;
      const ids = (items: unknown, allowed: string[]) => Array.isArray(items) ? [...new Set(items.filter((id): id is string => typeof id === 'string' && allowed.includes(id)))] : [];
      this.progress.set({
        ingredients: ids(value.ingredients, recipe.recipe.ingredients.map(item => item.id)),
        steps: ids(value.steps, recipe.recipe.steps.map(step => step.id)),
        listId: typeof value.listId === 'string' ? value.listId : null,
      });
    } catch { this.storageAvailable.set(false); }
  }

  private persist(): void {
    if (!this.ready || !this.recipe()) return;
    try { localStorage.setItem(this.key(), JSON.stringify(this.progress())); }
    catch { this.storageAvailable.set(false); }
  }
}
