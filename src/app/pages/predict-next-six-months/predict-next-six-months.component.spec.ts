import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictNextSixMonthsComponent } from './predict-next-six-months.component';

describe('PredictNextSixMonthsComponent', () => {
  let component: PredictNextSixMonthsComponent;
  let fixture: ComponentFixture<PredictNextSixMonthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictNextSixMonthsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictNextSixMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
