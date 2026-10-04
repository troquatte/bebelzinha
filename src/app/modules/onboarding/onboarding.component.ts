import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  effect,
  signal,
} from '@angular/core';

const STORAGE_KEY = 'bebel:onboarding-completed';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-onboarding',
  styleUrl: './onboarding.component.scss',
  templateUrl: './onboarding.component.html',
})
export class OnboardingComponent implements OnDestroy {
  @ViewChild('track') private track?: ElementRef<HTMLElement>;

  readonly visible = signal(localStorage.getItem(STORAGE_KEY) !== 'true');
  readonly currentSlide = signal(0);

  constructor() {
    effect(() => {
      document.body.style.overflow = this.visible() ? 'hidden' : '';
    });
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  next(): void {
    const nextIndex = Math.min(this.currentSlide() + 1, 3);
    this.scrollToSlide(nextIndex);
  }

  onScroll(): void {
    const element = this.track?.nativeElement;

    if (!element?.clientWidth) {
      return;
    }

    const index = Math.round(element.scrollLeft / element.clientWidth);
    this.currentSlide.set(Math.max(0, Math.min(index, 3)));
  }

  goTo(index: number): void {
    this.scrollToSlide(index);
  }

  complete(): void {
    localStorage.setItem(STORAGE_KEY, 'true');
    this.visible.set(false);
  }

  private scrollToSlide(index: number): void {
    const element = this.track?.nativeElement;

    if (!element) {
      return;
    }

    this.currentSlide.set(index);
    element.scrollTo({
      left: element.clientWidth * index,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }
}
