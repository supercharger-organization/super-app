import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card-model';
import { DebugApiService } from 'src/app/services/debug-api-service/debug-api.service';
import { CardFilter } from 'src/app/models/cardfilter-model';
import { ProdApiService } from 'src/app/services/prod-api-service/prod-api.service';
import { Board } from 'src/app/models/board-model';
import { List } from 'src/app/models/list-model';
import { Startup } from 'src/app/models/startup-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {

  toggleDetail:Boolean = false
  cards: Card[] = []
  filters: CardFilter[] = []
  board: Board = null;
  list:List = null;
  startups: Startup[] = []

  constructor(private apiService: ProdApiService, private route: ActivatedRoute) {
    this.filters = [
      new CardFilter(1, "Funding"),
      new CardFilter(1, "Location"),
      new CardFilter(1, "Employees"),
      new CardFilter(1, "Interest Areas")
    ]
   }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      var listId = params["id"];

      this.apiService.getListById(listId).subscribe(list=>{
          this.list = list[0];
          this.startups = this.list.startups;
          this.startups.forEach(Startup => {
            Startup.isVisibleInFilter = true;
          });
          //console.log(this.startups);
          this.loadCardsWithCurrentStartups();
        });
    })
  }
  
  removeCardsFromUI(){
    var paras = document.getElementsByName('StartupCard');
    while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }​
  }

  //Serves as the loading method for the card stuff
  loadCardsWithCurrentStartups(){
    // Resets the cards array:
    this.cards = [];
    // Loops through the startup list generating cards
    this.startups.forEach(startup => {
      /** tbd **/
      if (startup.isVisibleInFilter)
      {
        var startupCard = new Card(startup.name, startup.description, startup.industryTags, startup.industryScore, startup._id, startup.startupImgUrl)

      // Textbook (Lol JK, Given the time frame understandable):
      switch(startup.name.trim()) { 
        case "Supercharger": { 
          startupCard.startupImgUrl = "Supercharger_Logo.png"
          break; 
        } 
        case "Lisnr": { 
           startupCard.startupImgUrl = "Lisnr_Logo.png"
           break; 
        }
        case "Bear Robotics": { 
          startupCard.startupImgUrl = "BearRobotics_Logo.png"
          break; 
        }
        case "Breinify": { 
          startupCard.startupImgUrl = "Breinify_Logo.png"
          break; 
        } 
        
        case "Automation Hero": { 
          startupCard.startupImgUrl = "AutomationHero_Logo.png"
          break; 
        } 
        case "Blue Cart": { 
          startupCard.startupImgUrl = "BlueCart_Logo.png"
          break; 
        } 
        case "Catalytic": { 
          startupCard.startupImgUrl = "Catalytic_Logo.png"
          break; 
        } 
        case "VenueNext": { 
          startupCard.startupImgUrl = "VenueNext_Logo.png"
          break; 
        } 
        case "ViaHero": { 
          startupCard.startupImgUrl = "ViaHero_Logo.jpg"
          break; 
        } 
        case "Grubox": { 
          startupCard.startupImgUrl = "GruBox_Logo.png"
          break; 
        } 
        case "Self-Healing Elastomer": { 
          startupCard.startupImgUrl = "SelfHealingRubber_Logo.png"
          break; 
        } 
        case "ROTA": { 
          startupCard.startupImgUrl = "Rota_Logo.png"
          break; 
        } 
        case "Cabin": { 
          startupCard.startupImgUrl = "Cabin_Logo.jpg"
          break; 
        } 
        case "C Teleport": { 
          startupCard.startupImgUrl = "CTeleport_Logo.png"
          break; 
        }
        case "0Chain": { 
          startupCard.startupImgUrl = "0Chain_Logo.png"
          break; 
        }    
     } 
     startupCard.startupImgUrl = "assets/imgs/startup/" + startupCard.startupImgUrl;
      this.cards.push(startupCard);
      }
    });
  }

  filterByFunding(min, max)
  {
    this.startups.forEach(startup => {
      startup.isVisibleInFilter = Startup.isInFundingRange(min, max, startup);
    });
    this.loadCardsWithCurrentStartups();
  }

  filterByLocation(Location)
  {
    this.startups.forEach(startup => {
      startup.isVisibleInFilter = Startup.isAtLocation(startup, Location);
    });
    this.loadCardsWithCurrentStartups();
  }

  filterByEmployeeCount(min, max)
  {
    this.startups.forEach(startup => {
      startup.isVisibleInFilter = Startup.isInEmployeeRange(min, max, startup);
    });
    this.loadCardsWithCurrentStartups();
  }

  
  filterByTag(tag)
  {
    this.startups.forEach(startup => {
      //console.log(min);
      //console.log(max);
      startup.isVisibleInFilter = Startup.tagIsPresent(startup, tag);
    });
    this.loadCardsWithCurrentStartups();
  }


  activateFilter(filter){
    if (filter.active){
      filter.active = false;
      //do something here
    }
    else {
      filter.active = true;
    }
  }

  addUserToList(list: List){
    alert("coming soon")
  }

  openListDialogue(){
    alert("list dialogue")
  }

}
