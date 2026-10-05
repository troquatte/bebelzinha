import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FindingContext } from './findings.models';
import { FindingsCatalog } from './findings-catalog.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-finding-spotlight',
  styleUrl: './finding-spotlight.component.scss',
  templateUrl: './finding-spotlight.component.html',
})
export class FindingSpotlightComponent {
  private readonly catalog = inject(FindingsCatalog);

  readonly context = input.required<FindingContext>();
  readonly finding = computed(() => this.catalog.byContext(this.context())[0] ?? null);
}
