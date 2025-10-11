import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Widget } from '../models/widget';
import { CountriesComponent } from '../pages/dashboard/widgets/countries.component';


@Injectable()
export class DashboardService {
  widgets = signal<Widget[]>([
      {
          id: 1,
          label: 'Total Number of Cases This Month',
          value: '99',
          content: CountriesComponent
      },
  ])
   

  constructor() { }
}
