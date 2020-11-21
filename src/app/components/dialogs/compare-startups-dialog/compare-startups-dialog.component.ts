import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  Emails: [string];
}

@Component({
  selector: 'app-compare-startups-dialog',
  templateUrl: './compare-startups-dialog.component.html',
  styleUrls: ['./compare-startups-dialog.component.scss']
})
export class CompareStartupsDialogComponent {

  chartURL: string

  constructor(
    public dialogRef: MatDialogRef<CompareStartupsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData){
      this.chartURL = data["chartURL"]
    }

  closeDialog(): void {
    this.dialogRef.close();
  }

}