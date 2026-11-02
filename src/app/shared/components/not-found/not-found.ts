import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SeoService } from '../../../core/seo.service';
import { BebelHeroComponent } from '../bebel-hero/bebel-hero.component';

@Component({
  selector: 'app-not-found',
  imports: [BebelHeroComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section aria-labelledby="not-found-title">
      <app-bebel-hero
        eyebrow="PÁGINA NÃO ENCONTRADA"
        title="Esse cantinho não foi encontrado."
        titleId="not-found-title"
        subtitle="Confira o endereço ou volte às receitas da Bebel."
        speech="Vamos por aqui 💜"
      >
        <p><a routerLink="/comidinhas">Ver receitas e vídeos</a></p>
      </app-bebel-hero>
    </section>
  `,
})
export class NotFound {
  constructor() {
    inject(SeoService).update({
      title: 'Página não encontrada | Bebelzinha',
      description: 'Confira o endereço ou volte às receitas e ferramentas da Bebel.',
      path: inject(Router).url,
      indexable: false,
    });
  }
}
