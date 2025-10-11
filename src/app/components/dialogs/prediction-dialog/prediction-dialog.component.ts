import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DengueStore } from '../../../store/dengue.store';

@Component({
  selector: 'app-prediction-dialog',
  imports: [MatDialogModule],
  templateUrl: './prediction-dialog.component.html',
  styleUrl: './prediction-dialog.component.css'
})
export class PredictionDialogComponent {
constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PredictionDialogComponent>
  ) {
    console.log('data in dialog', data)
  }

  close() {
    this.dialogRef.close();
  }
}
