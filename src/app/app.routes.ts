import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MakePredictionsComponent } from './pages/make-predictions/make-predictions.component';
import { PredictNextSixMonthsComponent } from './pages/predict-next-six-months/predict-next-six-months.component';
import { HeatMapComponent } from './pages/heat-map/heat-map.component';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'make-predictions',
        component: MakePredictionsComponent,
    },
    {
        path: 'six-month-predictions',
        component: PredictNextSixMonthsComponent,
    },
    {
        path: 'heat-map',
        component: HeatMapComponent,
    },

];
