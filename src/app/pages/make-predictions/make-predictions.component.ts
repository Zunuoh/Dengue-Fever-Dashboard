import { Component, inject, signal, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog'
import { PredictionDialogComponent } from '../../components/dialogs/prediction-dialog/prediction-dialog.component';
import { DengueStore } from '../../store/dengue.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';
import { MakePredictions } from '../../models/monthly-predictions-model';


@Component({
  selector: 'app-make-predictions',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule],
  providers: [MatDatepickerModule],
  templateUrl: './make-predictions.component.html',
  styleUrl: './make-predictions.component.css'
})
export class MakePredictionsComponent {
  readonly makePredictions = signal<any>(null);
readonly loading = signal<boolean>(false);

  private fb = inject(FormBuilder)
  private dialog = inject(MatDialog)
  private dengueStore = inject(DengueStore)
  makePredictions$: Signal<MakePredictions>

  form = this.fb.group({
  temperature: this.fb.control<number | null>(null),
  precipitation: this.fb.control<number | null>(null),
  airQuality: this.fb.control<number | null>(null),
  uvIndex: this.fb.control<number | null>(null),
  populationDensity: this.fb.control<number | null>(null),
  targetDate: this.fb.control<Date | null>(new Date(), { validators: [Validators.required] }),
  country: this.fb.control<string>('', { validators: [Validators.required] })
});



constructor(){
  this.makePredictions$ = this.dengueStore.makePredictions
  console.log('predictions signal', this.makePredictions$())
  this.dengueStore.makePredictions();
this.dengueStore.loading();
}

async success() {
  const formValues = this.form.value;
  const payload = {
    country: formValues.country ?? '',
    avg_temp_c: formValues.temperature ?? 0,
    precipitation_mm: formValues.precipitation ?? 0,
    air_quality_index: formValues.airQuality ?? 0,
    uv_index: formValues.uvIndex ?? 0,
    population_density: formValues.populationDensity ?? 0,
    target_date: formValues.targetDate
      ? new Date(formValues.targetDate).toISOString().split('T')[0]
      : undefined,
  };

  // this.loading = true;
  try {
    // 👇 call the rxMethod (does not return Observable)
    this.dengueStore.getPrediction(payload);

    // 👇 wait briefly for store to update (or use a store signal effect)
    setTimeout(() => {
      const response = this.dengueStore.MakePredictionsResponse();
      console.log('✅ Response from store:', response);

      // this.loading = false;

      if (response) {
        const roundedResponse = {
        ...response,
        predicted_cases: Math.round(response.predicted_cases),
      };
        this.dialog.open(PredictionDialogComponent, {
          disableClose: false,
          data: roundedResponse,
        });
      }
    }, 1000); // optional delay for async completion
  } catch (err) {
    // this.loading = false;
    console.error('Prediction failed', err);
  }
}




    
    // async success() {
    //   const formValues = this.form.value
    //   const payload = {
    //     country: formValues.country ?? '',
    //     avg_temp_c: formValues.temperature ?? 0,
    //     precipitation_mm: formValues.precipitation ?? 0,
    //     air_quality_index: formValues.airQuality ?? 0,
    //     uv_index: formValues.uvIndex ?? 0,
    //     population_density: formValues.populationDensity ?? 0,
    //     target_date: formValues.targetDate ? new Date(formValues.targetDate).toISOString().split('T')[0] : undefined
    //   }

    //   try {
    //     const response = await this.dengueStore.getPrediction(payload);
    //     console.log('response after making prediction', response)
    //     if(response) {
    //       this.dialog.open(PredictionDialogComponent, {
    //         disableClose: false,
    //         data: response,
    //       });
    //     }
    //   } catch (error) {
    //     console.error('Error making prediction:', error)
    //   }

    // }

    
}
