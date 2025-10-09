import { Component, effect, inject, OnInit, Signal} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import { DashboardService } from '../../services/dashboard-service.service';
import { DengueStore } from '../../store/dengue.store';
import { ApiService } from '../../services/api.service';
import { PredictNextMonth } from '../../models/monthly-predictions-model';
import { GoogleMapsModule } from '@angular/google-maps';
Chart.register(...registerables);

declare const google: any;

@Component({
  selector: 'app-dashboard',
  providers: [DashboardService],
  imports: [GoogleMapsModule],
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
      this.chartData = response;
      if(this.chartData != null){
        for(let i=0; i<this.chartData.length; i++){
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
  }

  renderChart(labelData: any, mainData: any){
  const min = Math.min(...mainData);
  const max = Math.max(...mainData);

  const colors = mainData.map((value:number) => {
    const ratio = max === min ? 0 : (value - min) / (max - min);
    const g = Math.round(255 * (1 - ratio)); 
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
