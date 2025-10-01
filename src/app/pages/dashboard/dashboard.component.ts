import { Component, effect, inject, OnInit, Signal} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import { DashboardService } from '../../services/dashboard-service.service';
import { DengueStore } from '../../store/dengue.store';
import { ApiService } from '../../services/api.service';
import { PredictNextMonth } from '../../models/monthly-predictions-model';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  dengueStore = inject(DengueStore);
  dashboardService = inject(DashboardService);
  apiService = inject(ApiService)

  chartData: any;
  labelData: any[] = [];
  realData: any[] = [];
  colorData: any[] = [];
  dengueMonthlyPredictions$: Signal<PredictNextMonth>
  topFiveAffectedCountries$: Signal<any>
  topFiveAffectedRegions$: Signal<any>
  nextSixMonths$: Signal<any>
  ngOnInit(): void {
    this.renderChart(this.labelData, this.realData);
    this.dengueStore.fetchNextMonth();
    this.dengueStore.getTopFiveAffectedCountries();
    this.dengueStore.getTopFiveAffectedRegions();
    this.dengueStore.getPredictionForNextSixMonths();

    this.apiService.getCasesPerRegion().subscribe((response) => {
      console.log('chart res', response)
      this.chartData = response;
      console.log('chart data', this.chartData);
      if(this.chartData != null){
        for(let i=0; i<this.chartData.length; i++){
          // console.log(this.chartData[i]);
          this.labelData.push(this.chartData[i].Region);
          this.realData.push(this.chartData[i].Total_Cases);
        }
      }
    })
  }

  

  constructor(){
    this.dengueMonthlyPredictions$ = this.dengueStore.nextMonthPrediction;
    this.topFiveAffectedCountries$ = this.dengueStore.topFiveAffectedCountries;
    this.topFiveAffectedRegions$ = this.dengueStore.topFiveAffectedRegions;
    this.nextSixMonths$ = this.dengueStore.predictNextSixMonths
    
    effect(() => {
      console.log('Next month prediction', this.nextSixMonths$());
      // console.log('Top five affected countries', this.topFiveAffectedRegions$);
    })
  }
  renderChart(labelData: any, mainData: any){
    // colours: move from yellow to red based on lowest to highest
      // 1️⃣ Find min and max for scaling
  const min = Math.min(...mainData);
  const max = Math.max(...mainData);

  // 2️⃣ Create a color for each value: low = yellow, high = red
  const colors = mainData.map((value:number) => {
    // ratio 0 → 1
    const ratio = max === min ? 0 : (value - min) / (max - min);
    // Interpolate from yellow (255, 255, 0) to red (255, 0, 0)
    const g = Math.round(255 * (1 - ratio)); // green decreases as value rises
    return `rgb(255, ${g}, 0)`;
  });
  
    new Chart("barChart", {
    type: 'bar',
    data: {
      labels: labelData,
      datasets: [{
        label: 'Number of Cases',
        data: mainData,
        backgroundColor: colors,
        borderWidth: 1,
        borderColor: 'rgb(75, 192, 192)',
      }]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Regions',
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Cases',
          }
        }
      }
    }
  });

}
}
