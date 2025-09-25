import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog'
import { PredictionDialogComponent } from '../../components/dialogs/prediction-dialog/prediction-dialog.component';


@Component({
  selector: 'app-make-predictions',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule ],
  providers: [MatDatepickerModule],
  templateUrl: './make-predictions.component.html',
  styleUrl: './make-predictions.component.css'
})
export class MakePredictionsComponent {
  private fb = inject(FormBuilder)
  private dialog = inject(MatDialog)
form = this.fb.group({
        temperature: [""],
        precipitation: [new Date(), Validators.required],
        airQuality: [],
        downloadsAllowed: [false, Validators.requiredTrue],
        longDescription: ['', Validators.required]
    })

    navigateToSuccess() {
      const dialogRef = this.dialog.open(PredictionDialogComponent, {
        disableClose: false
      })
    }
}
