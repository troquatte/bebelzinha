import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();
  });

  it('should render the Bebel home message', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Sua casa mais leve');
    expect(compiled.textContent).toContain('A Bebel sabe das coisas');
  });

  it('should identify future areas as coming soon', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Casa em ordem');
    expect(compiled.textContent).toContain('Comidinhas');
    expect(compiled.textContent).toContain('Compras');
    expect(compiled.textContent).toContain('Em breve');
  });
});
