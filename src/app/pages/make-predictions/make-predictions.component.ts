import { Component, inject, signal, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog'
import { PredictionDialogComponent } from '../../components/dialogs/prediction-dialog/prediction-dialog.component';
import { DengueStore } from '../../store/dengue.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
  loading = signal<boolean>(false);

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

  constructor() {
    this.makePredictions$ = this.dengueStore.makePredictions
    this.dengueStore.makePredictions();
    this.dengueStore.loading();
  }

  async success() {
    this.loading.set(true);
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
    try {
      this.dengueStore.getPrediction(payload);

      setTimeout(() => {
        const response = this.dengueStore.MakePredictionsResponse();
        this.loading.set(false);
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
      }, 1000);
    } catch (err) {
      this.loading.set(false);
    }
  }
}
