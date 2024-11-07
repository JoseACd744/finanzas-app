import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCardsListComponent } from './history-cards-list.component';

describe('HistoryCardsListComponent', () => {
  let component: HistoryCardsListComponent;
  let fixture: ComponentFixture<HistoryCardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryCardsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
