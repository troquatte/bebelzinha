import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { SeoService } from '../../../core/seo.service';
import {
  canalShortUrl,
  canalThumbnail,
  canalVideoUrl,
  groupShortsByCategory,
} from '../helpers/canal.helpers';
import { BebelHeroComponent } from '../../../shared/components/bebel-hero/bebel-hero.component';
import { CanalService } from '../service/canal.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-meals',
  styleUrl: './meals.component.scss',
  templateUrl: './meals.component.html',
  imports: [BebelHeroComponent],
})
export class MealsComponent {
  private readonly canal = inject(CanalService);
  private readonly seo = inject(SeoService);

  readonly channelUrl = this.canal.channelUrl;
  readonly videos = this.canal.videos;
  readonly loading = this.canal.loading;
  readonly error = this.canal.error;
  readonly shortGroups = computed(() => groupShortsByCategory(this.canal.shorts()));

  readonly videoUrl = canalVideoUrl;
  readonly shortUrl = canalShortUrl;
  readonly thumbnail = canalThumbnail;

  constructor() {
    this.seo.update({
      title: 'Vídeos da Bebel - Dicas práticas para a vida de casa',
      description:
        'Assista aos vídeos e shorts da Bebel com dicas práticas de comida, organização e rotina para deixar a vida de casa mais simples.',
      path: '/comidinhas',
    });
  }
}
