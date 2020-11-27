import { Component, OnInit } from '@angular/core';
import { Startup } from 'src/app/models/startup-model';
import { ProdApiService } from 'src/app/services/prod-api-service/prod-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/models/note-model';
import { StartupService } from 'src/app/services/startup-service/startup.service';

@Component({
  selector: 'app-startup-detail',
  templateUrl: './startup-detail.component.html',
  styleUrls: ['./startup-detail.component.scss']
})
export class StartupDetailComponent implements OnInit {

  startup: Startup = null;
  shouldShowCommentForm = false;
  newNote: Note = null;

  pitchDeckIndex:number = null;
  pitchDeckImgUrl:string = null;

  constructor(
    private startupService: StartupService, 
    private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      var startupId = params["id"];

      this.startupService.getById(startupId).subscribe(res=>{
        this.startup = res[0];
        this.pitchDeckImgUrl = this.startup.pitchDeckImgUrls[this.pitchDeckIndex];
      })

    })

  }

  requestUpdate(){
    alert("request update")
  }

  createNewNote(){
    this.newNote = new Note(1, "", null, null, null, null, null);
    document.getElementById("commentTextArea").focus();
  }

  deleteNewNote(){
    this.newNote = null;
  }

  nextImg(){
    this.pitchDeckIndex = this.pitchDeckIndex + 1;
    if (this.pitchDeckIndex >= this.startup.pitchDeckImgUrls.length){
      this.pitchDeckIndex = 0;
    }
    this.pitchDeckImgUrl = this.startup.pitchDeckImgUrls[this.pitchDeckIndex];
  }
}
