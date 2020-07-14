import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../invite-button/invite-button.component';

@Component({
  selector: 'app-compare-startups-button',
  templateUrl: './compare-startups-button.component.html',
  styleUrls: ['./compare-startups-button.component.scss']
})
export class CompareStartupsButtonComponent implements OnInit {

  @Input() public chartURL: string; // this is typed as string, but you can use any type you want

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(CompareDialog, 
      {
        width: '1200px',
        data : {
          chartURL : this.chartURL
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }

}

@Component({
  selector: 'compare-dialog',
  templateUrl: './compare-dialog.html',
  styleUrls: ['./compare-dialog.component.scss']
})
export class CompareDialog {

  chartURL: string

  constructor(
    public dialogRef: MatDialogRef<CompareDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData){
      this.chartURL = data["chartURL"]
    }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
