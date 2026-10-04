import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SeoService } from '../../core/seo.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Bebel - Sua casa mais leve',
      description:
        'A Bebel ajuda você a organizar a vida de casa com receitas, listas de compras e ideias práticas sem complicação.',
      path: '/',
    });
  }
}
