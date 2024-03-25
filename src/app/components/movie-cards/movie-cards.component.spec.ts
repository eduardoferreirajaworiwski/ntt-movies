import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardsComponent } from './movie-cards.component';

describe('MovieCardsComponent', () => {
  let component: MovieCardsComponent;
  let fixture: ComponentFixture<MovieCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCardsComponent]
    });
    fixture = TestBed.createComponent(MovieCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
