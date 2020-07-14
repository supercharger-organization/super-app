import { Component, OnInit } from '@angular/core';
import { Startup } from 'src/app/models/startup-model';
import { ProdApiService } from 'src/app/services/prod-api-service/prod-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/models/note-model';

@Component({
  selector: 'app-startup-detail',
  templateUrl: './startup-detail.component.html',
  styleUrls: ['./startup-detail.component.scss']
})
export class StartupDetailComponent implements OnInit {

  startup: Startup = null;
  shouldShowCommentForm = false;
  newNote: Note = null;

  deckIndex:number = 1
  deckURL: string

  constructor(private apiService: ProdApiService, private route: ActivatedRoute) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      var startupId = params["id"];

      this.apiService.getStartupById(startupId).subscribe(res=>{
        console.log(res[0])
        this.startup = res[0];
        var deckURL = ""

        // Textbook (Lol JK, Given the time frame understandable):
        switch(this.startup.name.trim()) { 
          case "Supercharger": { 
            this.startup.imgURL = "Supercharger_Logo.png"
            deckURL = "default"
            break; 
          } 
          case "Lisnr": { 
            this.startup.imgURL = "Lisnr_Logo.png"
            deckURL = "default"
            break; 
          }
          case "Bear Robotics": { 
            this.startup.imgURL = "BearRobotics_Logo.png"
            deckURL = "default"
            break; 
          }
          case "Breinify": { 
            this.startup.imgURL = "Breinify_Logo.png"
            deckURL = "default"
            break; 
          } 
          case "Automation Hero": { 
            this.startup.imgURL = "AutomationHero_Logo.png"
            deckURL = "AutomationHero"
            break; 
          } 
          case "Blue Cart": { 
            this.startup.imgURL = "BlueCart_Logo.png"
            deckURL = "default"
            break; 
          } 
          case "Catalytic": { 
            this.startup.imgURL = "Catalytic_Logo.png"
            deckURL = "default"
            break; 
          } 
          case "VenueNext": { 
            this.startup.imgURL = "VenueNext_Logo.png"
            deckURL = "default"
            break; 
          } 
          case "ViaHero": { 
            this.startup.imgURL = "ViaHero_Logo.jpg"
            deckURL = "default"
            break; 
          } 
          case "Grubox": { 
            this.startup.imgURL = "GruBox_Logo.png"
            deckURL = "default"
            break; 
          } 
          case "Self-Healing Elastomer": { 
            this.startup.imgURL = "SelfHealingRubber_Logo.png"
            deckURL = "default"
            break; 
          } 
          case "ROTA": { 
            this.startup.imgURL = "Rota_Logo.png"
            deckURL = "default"
            break; 
          } 
          case "Cabin": { 
            this.startup.imgURL = "Cabin_Logo.jpg"
            deckURL = "Cabin"
            break; 
          } 
          case "C Teleport": { 
            this.startup.imgURL = "CTeleport_Logo.png"
            deckURL = "default"
            break; 
          }
          case "0Chain": { 
            this.startup.imgURL = "0Chain_Logo.png"
            deckURL = "default"
            break; 
          }    
        } 
        this.startup.imgURL = "assets/imgs/startup/" + this.startup.imgURL;
        this.deckURL = `assets/imgs/startup/pitch_deck/${deckURL}`
        
        /** to be deleted... **/
        var newTags = []
        this.startup.industryTags.forEach(tag => {
            var tags = tag.split(",");
            tags.forEach(t => {
                if (t != "" && t != " ")
                newTags.push(t)
            });
        });
        
        this.startup.industryTags = newTags;

        /** to be deleted... **/
        var stackTags = []
        this.startup.techStackTags.forEach(tag => {
            var tags = tag.split(",");
            tags.forEach(t => {
                if (t != "" && t != " ")
                stackTags.push(t)
            });
        });
        this.startup.techStackTags = stackTags;
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

  postComment(){
    //TODO
    this.startup.customNotes.push(new Note(1, this.newNote.note, null, null, null, null, null))

    this.newNote = null;
  }

  nextImg(){
    this.deckIndex = this.deckIndex + 1
    //if is at end
  }
}
