
import { Component, OnInit, Inject, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';
import { XunkCalendarModule } from 'xunk-calendar';
import { Startup } from 'src/app/models/startup-model';
import { ActivatedRoute } from '@angular/router';
import { ProdApiService } from 'src/app/services/prod-api-service/prod-api.service';
import { BoardService } from 'src/app/services/board-service/board.service';
import { MailerService } from 'src/app/services/mailer-service/mailer.service';
import { StartupService } from 'src/app/services/startup-service/startup.service';

export interface DialogData {
  Date: string;
  Time: string;
}

@Component({
  selector: 'app-session-dialog',
  templateUrl: './session-dialog.component.html',
  styleUrls: ['./session-dialog.component.scss']
})
export class SessionDialogComponent implements OnInit {
  startups: Startup[] = []
  isStageTwo: boolean;
  isStageOne: boolean;
  isStageThree: boolean;

  public selDate = { date:1, month:1, year:1 };
  
  constructor(
    public dialogRef: MatDialogRef<SessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public mailer: MailerService,
    public startupService: StartupService) {

    this.selDate = XunkCalendarModule.getToday();
    this.isStageOne = true;
    this.isStageTwo = false;
    this.isStageThree = false;
  }

  ngOnInit(): void {  
    this.startupService.get().subscribe(res=>{
      this.startups = res;
    })
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onExitClick(): void {
    this.dialogRef.close();
  }

  onBackClick(): void {
    console.log("Back to stage 1");
    this.isStageOne = true;
    this.isStageTwo = false;
    this.isStageThree = false;
  }

  onNextClick(): void {
    console.log("Advancing to Stage 2!");
    this.isStageOne = false;
    this.isStageTwo = true;
    this.isStageThree = false;
  }
  onFinishClick(): void {

    //TODO: this all has to be redone

    var selectedStartups: Startup[] = [];
    this.startups.forEach(startup=>{
      if (startup.selected){
        selectedStartups.push(startup);
      }
    })
    var selectedStartupNames = selectedStartups.map(res=>res.name)
    var selDate = this.selDate;
    var user = JSON.parse(localStorage.getItem("user"));
    var body = user.email + " wants to schedule a virtual session w/ " + selectedStartupNames + " on " + selDate.date + "/" + selDate.month + "/" + selDate.year;
    this.mailer.post(body).subscribe(res=>{
      this.isStageOne = false;
      this.isStageTwo = false;
      this.isStageThree = true;
    })
  }

  onListItemSelect(itemID): void { 
    console.log("Startup Selected: " + itemID);
  }

  removeCardsFromUI(){
    var paras = document.getElementsByName('StartupCard');
    while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }​
  }

  selectStartup(startup:Startup){
    if (startup.selected){
      startup.selected = false;
    }
    else {
      startup.selected = true;
    }
  }
}