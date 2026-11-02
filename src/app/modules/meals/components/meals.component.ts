import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { publishedRecipes, publishedCategories, recipePath } from '../helpers/recipe-library';
import { libraryPath, libraryPageWindow, queryRecipeLibrary, RECIPE_PAGE_SIZE } from '../helpers/library-navigation';
import { SeoService } from '../../../core/seo.service';
import { BebelHeroComponent } from '../../../shared/components/bebel-hero/bebel-hero.component';
import { NotFound } from '../../../shared/components/not-found/not-found';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-meals',
  styleUrl: './meals.component.scss',
  templateUrl: './meals.component.html',
  imports: [BebelHeroComponent, RouterLink, NotFound],
})
export class MealsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  readonly categories = publishedCategories();
  readonly recipePath = recipePath;
  readonly libraryPath = libraryPath;
  readonly pageSize = RECIPE_PAGE_SIZE;
  readonly searchTerm = signal('');
  readonly draftSearch = signal('');
  readonly category = signal('');
  private readonly rawPage = signal<string | null>(null);
  readonly result = computed(() => queryRecipeLibrary(publishedRecipes, this.searchTerm(), this.category(), this.rawPage()));
  readonly pages = computed(() => libraryPageWindow(this.result().page, this.result().pageCount));
  readonly queryParams = computed(() => ({ q: this.searchTerm() || null, categoria: this.category() || null }));

  constructor() {
    combineLatest([this.route.paramMap, this.route.queryParamMap]).pipe(takeUntilDestroyed()).subscribe(([params, query]) => {
      this.rawPage.set(params.get('page'));
      this.searchTerm.set((query.get('q') ?? '').trim().slice(0, 120));
      this.draftSearch.set(this.searchTerm());
      this.category.set(query.get('categoria') ?? '');
      const result = this.result();
      this.seo.update({
        title: result.page > 1 ? 'Receitas da Bebel | Página ' + result.page : 'Receitas da Bebel | Blog de receitas caseiras',
        description: 'Encontre receitas caseiras da Bebel por categoria, com ingredientes, porções, modo de preparo e lista de compras marcável.',
        path: result.valid ? libraryPath(result.page) : this.router.url,
        indexable: result.valid && params.get('page') !== '1' && !query.has('q') && !query.has('categoria'),
      });
    });
  }

  search(event: Event): void {
    event.preventDefault();
    void this.router.navigate(['/comidinhas'], { queryParams: { q: this.draftSearch().trim().slice(0, 120) || null, categoria: this.category() || null } });
  }
}
