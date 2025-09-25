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
    //   {
    //       id: 2,
    //       label: 'Predicted Cases For Next Month',
    //       value: '103',
    //       content: ViewsComponent
    //   },
    //   {
    //       id: 3,
    //       label: 'High Risk Regions',
    //       value: '1,024',
    //       content: ViewsComponent
    //   },
    //   {
    //       id: 4,
    //       label: 'Views',
    //       value: '1,024',
    //       content: ViewsComponent
    //   },
  ])
   

  constructor() { }
}
