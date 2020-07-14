import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from '../invite-button/invite-button.component';

@Component({
  selector: 'app-list-button',
  templateUrl: './list-button.component.html',
  styleUrls: ['./list-button.component.scss']
})
export class ListButtonComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ListDialog, 
      {
        width: '400px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }
}

@Component({
  selector: 'list-dialog',
  templateUrl: './list-dialog.html',
  styleUrls: ['./list-dialog.component.scss']
})
export class ListDialog {
  step: number = 1;

  constructor(
    public dialogRef: MatDialogRef<ListDialog>,
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
