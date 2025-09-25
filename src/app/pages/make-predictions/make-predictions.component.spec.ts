import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePredictionsComponent } from './make-predictions.component';

describe('MakePredictionsComponent', () => {
  let component: MakePredictionsComponent;
  let fixture: ComponentFixture<MakePredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakePredictionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
