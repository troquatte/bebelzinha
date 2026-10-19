import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebelHeroComponent } from './bebel-hero.component';

describe('BebelHeroComponent', () => {
  let component: BebelHeroComponent;
  let fixture: ComponentFixture<BebelHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BebelHeroComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BebelHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
