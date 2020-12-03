import { Component, OnInit } from '@angular/core';
import { Startup } from 'src/app/models/startup-model';
import { ProdApiService } from 'src/app/services/prod-api-service/prod-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/models/note-model';
import { StartupService } from 'src/app/services/startup-service/startup.service';
import { AddToListDialogComponent } from 'src/app/components/dialogs/add-to-list-dialog/add-to-list-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MailerService } from 'src/app/services/mailer-service/mailer.service';
import { Patent } from 'src/app/models/patent-model';

@Component({
  selector: 'app-startup-detail',
  templateUrl: './startup-detail.component.html',
  styleUrls: ['./startup-detail.component.scss']
})
export class StartupDetailComponent implements OnInit {

  startup: Startup = null;
  shouldShowCommentForm = false;
  newNote: Note = null;

  pitchDeckImgUrl:string = null;
  patentIndex: number = 0;

  constructor(
    private startupService: StartupService, 
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private mailer: MailerService) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      var startupId = params["id"];

      this.startupService.getById(startupId).subscribe(res=>{
        this.startup = res[0];
        this.pitchDeckImgUrl = this.startup.pitchDeckImgUrls[0];
      })

    })

  }

  requestUpdate(){
    var user = JSON.parse(localStorage.getItem("user"));
    var body = user.email + " requested an intro w/ " + this.startup.name;
    this.mailer.post(body).subscribe(res=>{
    });
  }

  createNewNote(){
    this.newNote = new Note(1, "", null, null, null, null, null);
    document.getElementById("commentTextArea").focus();
  }

  deleteNewNote(){
    this.newNote = null;
  }

  nextPatent(){
    this.patentIndex = this.patentIndex + 1;

    if(this.patentIndex >= this.startup.patents.length){
      this.patentIndex = 0;
    }
  }

  openListDialogue(startupId: string){
    const dialogRef = this.dialog.open(AddToListDialogComponent, 
      {
        width: '600px',
        data : {
          startupId : startupId
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
