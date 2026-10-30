import { Location } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from '../../../app';
import { AnalyticsService } from '../../../core/analytics.service';
import { ContinuityService } from '../../../core/continuity.service';

describe('Dinner landing initial load', () => {
  it('does not mount onboarding or navigation while the initial navigation is pending', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideLocationMocks(),
        { provide: AnalyticsService, useValue: {} },
        { provide: ContinuityService, useValue: {} },
      ],
    }).compileComponents();
    TestBed.inject(Location).go('/jantar-resolvido');
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(fixture.componentInstance.isLanding()).toBe(true);
    expect(root.querySelector('app-onboarding')).toBeNull();
    expect(root.querySelector('.sidebar')).toBeNull();
    expect(root.querySelector('.bottom-nav')).toBeNull();
    expect(root.querySelector('.app-content--landing')).not.toBeNull();
  });
});
