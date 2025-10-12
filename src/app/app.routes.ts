import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    },
    {
        path: 'make-predictions',
        loadComponent: () => import('./pages/make-predictions/make-predictions.component').then(m => m.MakePredictionsComponent)
    },
    {
        path: 'six-month-predictions',
        loadComponent: () => import('./pages/predict-next-six-months/predict-next-six-months.component').then(m => m.PredictNextSixMonthsComponent),
    },
    {
        path: 'heat-map',
        loadComponent: () => import('./pages/heat-map/heat-map.component').then(m => m.HeatMapComponent),
    },
    {
        path: 'prevention-tips',
        loadComponent: () => import('./pages/prevention-tips/prevention-tips.component').then(m => m.PreventionTipsComponent),
    },

];
