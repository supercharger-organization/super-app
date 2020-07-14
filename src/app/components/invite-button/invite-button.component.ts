import { Component, OnInit, Inject, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';
import { MatFormField, } from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';

export interface DialogData {
  Emails: [string];
}

@Component({
  selector: 'app-invite-button',
  templateUrl: './invite-button.component.html',
  styleUrls: ['./invite-button.component.scss']
})

export class InviteButtonComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(InviteDialog, 
      {
        width: '600px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'invite-dialog',
  templateUrl: './invite-dialog.html',
  styleUrls: ['./invite-dialog.component.scss']
})
export class InviteDialog implements OnInit {
  isStageTwo: boolean;
  isStageOne: boolean;
  isStageThree: boolean;
  emails: string[] = []
  newEmail:string = ""

  constructor(
    public dialogRef: MatDialogRef<InviteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
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
