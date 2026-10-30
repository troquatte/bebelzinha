import { DinnerDay } from '../interface/dinner-day.interface';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-dinner-routine',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dinner-routine.component.html',
  styleUrl: './dinner-routine.component.scss',
})
export class DinnerRoutineComponent {
  readonly extraMeal = input(false);
  readonly storage = input<DinnerDay['storage']>();
  readonly sources = input<DinnerDay['sources']>();
  readonly dayId = input.required<string>();
}
