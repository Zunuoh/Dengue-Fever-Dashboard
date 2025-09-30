import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatCardModule } from '@angular/material/card'; 
import { DengueStore } from '../../store/dengue.store';
import { PredictSixMonths } from '../../models/monthly-predictions-model';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-predict-next-six-months',
  imports: [MatExpansionModule, MatCardModule, MatIconModule],
  templateUrl: './predict-next-six-months.component.html',
  styleUrl: './predict-next-six-months.component.css'
})
export class PredictNextSixMonthsComponent implements OnInit {
  private dengueStore = inject(DengueStore)
  nextSixMonths$: Signal<PredictSixMonths> = this.dengueStore.predictNextSixMonths;

  ngOnInit(): void {
      this.dengueStore.getPredictionForNextSixMonths();
      
  }

}
