import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app shell', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the responsive navigation foundation', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sidebar')).toBeTruthy();
    expect(compiled.querySelector('.bottom-nav')).toBeTruthy();
    expect(compiled.textContent).toContain('Início');
    expect(compiled.textContent).toContain('Comidinhas');
  });

  it('should keep future navigation items unavailable', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const unavailableItems = fixture.nativeElement.querySelectorAll('[aria-disabled="true"]');
    expect(unavailableItems.length).toBeGreaterThan(0);
  });
});
