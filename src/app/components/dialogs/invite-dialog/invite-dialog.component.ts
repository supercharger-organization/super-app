import { Component, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import { MailerService } from 'src/app/services/mailer-service/mailer.service';
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
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  constructor(
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: DialogData,
    public mailer: MailerService) {
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
      //TODO: clean up
      var user = JSON.parse(localStorage.getItem("user"));
      console.log(user)
      var emailsString = this.emails.toString();
      var body = "email: " + user.email + " invited: " + emailsString;
      this.mailer.post(body).subscribe(res=>{
        this.isStageOne = false;
        this.isStageTwo = true;
        this.isStageThree = false;
      })
    }

    onFinishClick(): void {
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

    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
  
      // Add our fruit
      if ((value || '').trim()) {
        this.emails.push(value.trim());
      }
  
      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  
    remove(val: string): void {
      const index = this.emails.indexOf(val);
  
      if (index >= 0) {
        this.emails.splice(index, 1);
      }
    }

}