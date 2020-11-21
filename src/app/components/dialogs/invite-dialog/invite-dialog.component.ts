import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';

export interface DialogData {
  Emails: [string];
}

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.scss']
})
export class InviteDialogComponent implements OnInit {
  isStageTwo: boolean;
  isStageOne: boolean;
  isStageThree: boolean;
  emails: string[] = []
  newEmail:string = ""

  constructor(
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: DialogData) {
      this.isStageOne = true;
      this.isStageTwo = false;
      this.isStageThree = false;
    }
  
    ngOnInit(): void {  }

    onCancelClick(): void {
      this.dialogRef.close();
    }

    onExitClick(): void {
      this.dialogRef.close();
    }

    onNextClick(): void {
      console.log("Advancing to Stage 2!");
      this.isStageOne = false;
      this.isStageTwo = true;
      this.isStageThree = false;
    }

    onFinishClick(): void {
      console.log("Advancing to Stage 3! Sending Emails");
      this.isStageOne = false;
      this.isStageTwo = false;
      this.isStageThree = true;
    }

    createNewEmail(email:string){
      this.emails.push(email)
      this.newEmail = ""
    }

    deleteEmail(email:string){
      this.emails.splice(this.emails.indexOf(email), 1)
    }

}