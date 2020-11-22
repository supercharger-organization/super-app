import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface DialogData {
  Emails: [string];
}

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.scss']
})
export class ListDialogComponent {
  step: number = 1;

  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }
  ngOnInit(): void {  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  onExitClick(): void {
    this.dialogRef.close();
  }
  onNextClick(): void {
    this.step = this.step + 1;
    
  }
}
