import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DinnerPlanComponent } from './dinner-plan.component';

describe('DinnerPlanComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [DinnerPlanComponent], providers: [provideRouter([])] }).compileComponents();
  });
  afterEach(() => localStorage.clear());

  it('opens the full recipe directly and changes it when another day is selected', () => {
    const fixture = TestBed.createComponent(DinnerPlanComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('#dinner-title')!.textContent).toContain('Frango');
    expect(root.textContent).toContain('Ingredientes');
    expect(root.textContent).toContain('Modo de preparo');
    expect(root.textContent).not.toContain('Ver receita');
    expect(root.textContent).not.toContain('Da semana');
    const picker = root.querySelector<HTMLSelectElement>('.dinner__day-picker select')!;
    picker.value = 'dia-2';
    picker.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(root.querySelector('#dinner-title')!.textContent).toContain('Macarrão');
    expect(root.querySelector<HTMLSelectElement>('select')!.value).toBe('dia-2');
  });

  it('uses the shared cart controls to move items and keeps them on day changes', () => {
    const fixture = TestBed.createComponent(DinnerPlanComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const first = fixture.componentInstance.plan.items()[0];
    root.querySelector<HTMLButtonElement>('mat-slide-toggle button[role="switch"]')!.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.plan.checkedCount()).toBe(1);
    expect(root.querySelector('.items-group--cart')!.textContent).toContain(first.name);
    fixture.componentInstance.plan.selectDay('dia-2');
    fixture.detectChanges();
    expect(fixture.componentInstance.plan.checkedCount()).toBe(0);
    fixture.componentInstance.plan.selectDay('dia-1');
    fixture.detectChanges();
    expect(fixture.componentInstance.plan.checkedCount()).toBe(1);
  });
});
