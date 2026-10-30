import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dinner-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dinner-actions.component.html',
  styleUrl: './dinner-actions.component.scss',
})
export class DinnerActionsComponent {
  readonly showingShopping = input(false);
  readonly printRecipe = output<void>();
  readonly navigate = output<void>();
}
