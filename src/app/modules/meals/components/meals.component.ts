import { RouterLink } from '@angular/router';
import { publishedCategories, recipesByCategory, recipePath } from '../helpers/recipe-library';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SeoService } from '../../../core/seo.service';
import { BebelHeroComponent } from '../../../shared/components/bebel-hero/bebel-hero.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-meals',
  styleUrl: './meals.component.scss',
  templateUrl: './meals.component.html',
  imports: [BebelHeroComponent, RouterLink],
})
export class MealsComponent {
  private readonly seo = inject(SeoService);

  readonly recipeGroups = publishedCategories().map(category => ({ ...category, recipes: recipesByCategory(category.id) }));
  readonly recipePath = recipePath;


  constructor() {
    this.seo.update({
      title: 'Receitas da Bebel | Blog de receitas caseiras',
      description:
        'Encontre receitas caseiras da Bebel por categoria, com ingredientes, porções, modo de preparo e lista de compras marcável.',
      path: '/comidinhas',
    });
  }
}
