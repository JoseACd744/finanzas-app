import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetraDetailsBottomSheetComponent } from './letra-details-bottom-sheet.component';

describe('LetraDetailsBottomSheetComponent', () => {
  let component: LetraDetailsBottomSheetComponent;
  let fixture: ComponentFixture<LetraDetailsBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetraDetailsBottomSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetraDetailsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
