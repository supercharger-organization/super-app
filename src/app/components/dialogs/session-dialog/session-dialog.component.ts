
import { Component, OnInit, Inject, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';
import { XunkCalendarModule } from 'xunk-calendar';
import { Startup } from 'src/app/models/startup-model';
import { ActivatedRoute } from '@angular/router';
import { ProdApiService } from 'src/app/services/prod-api-service/prod-api.service';

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
  constructor(private apiService: ProdApiService, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<SessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.selDate = XunkCalendarModule.getToday();
    this.isStageOne = true;
    this.isStageTwo = false;
    this.isStageThree = false;
  }

  ngOnInit(): void {  
    this.apiService.getAllStartups().subscribe(startups=>{
      startups.forEach(startup => {
        this.startups.push(startup);
         
          switch(startup.name.trim()) { 
            case "Supercharger": { 
              startup.imgURL = "Supercharger_Logo.png"
              break; 
            } 
            case "Lisnr": { 
              startup.imgURL = "Lisnr_Logo.png"
              break; 
            }
            case "Bear Robotics": { 
              startup.imgURL = "BearRobotics_Logo.png"
              break; 
            }
            case "Breinify": { 
              startup.imgURL = "Breinify_Logo.png"
              break; 
            } 
            
            case "Automation Hero": { 
              startup.imgURL = "AutomationHero_Logo.png"
              break; 
            } 
            case "Blue Cart": { 
              startup.imgURL = "BlueCart_Logo.png"
              break; 
            } 
            case "Catalytic": { 
              startup.imgURL = "Catalytic_Logo.png"
              break; 
            } 
            case "VenueNext": { 
              startup.imgURL = "VenueNext_Logo.png"
              break; 
            } 
            case "ViaHero": { 
              startup.imgURL = "ViaHero_Logo.jpg"
              break; 
            } 
            case "Grubox": { 
              startup.imgURL = "GruBox_Logo.png"
              break; 
            } 
            case "Self-Healing Elastomer": { 
              startup.imgURL = "SelfHealingRubber_Logo.png"
              break; 
            } 
            case "ROTA": { 
              startup.imgURL = "Rota_Logo.png"
              break; 
            } 
            case "Cabin": { 
              startup.imgURL = "Cabin_Logo.jpg"
              break; 
            } 
            case "C Teleport": { 
              startup.imgURL = "CTeleport_Logo.png"
              break; 
            }
            case "0Chain": { 
              startup.imgURL = "0Chain_Logo.png"
              break; 
            }    
        } 

        startup.imgURL = "assets/imgs/startup/" + startup.imgURL;

      });
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
    console.log("Advancing to Stage 3! Sending Emails");
    this.isStageOne = false;
    this.isStageTwo = false;
    this.isStageThree = true;
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