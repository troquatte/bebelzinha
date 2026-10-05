import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SeoService } from '../../core/seo.service';
import { FindingSpotlightComponent } from '../findings/finding-spotlight.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FindingSpotlightComponent],
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
