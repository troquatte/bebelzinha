import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bebel-hero',
  styleUrl: './bebel-hero.component.scss',
  templateUrl: './bebel-hero.component.html',
  imports: [NgClass],
})
export class BebelHeroComponent {
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() titleId = '';
  @Input() subtitle = '';
  @Input() speech = 'Chega mais 💜';
  @Input() sticker = '';
  @Input() kicker = '';
  @Input() variant: 'home' | 'shopping' | 'meals' = 'home';
}
