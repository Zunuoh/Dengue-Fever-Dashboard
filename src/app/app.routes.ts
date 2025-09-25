import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { MakePredictionsComponent } from './pages/make-predictions/make-predictions.component';
import { PredictNextSixMonthsComponent } from './pages/predict-next-six-months/predict-next-six-months.component';


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
        path: 'analytics',
        component: AnalyticsComponent,
    },
    {
        path: 'make-predictions',
        component: MakePredictionsComponent,
    },
    {
        path: 'six-month-predictions',
        component: PredictNextSixMonthsComponent,
    },

];
