import { Component, OnInit } from '@angular/core';
import { Startup } from 'src/app/models/startup-model';
import { DebugApiService } from 'src/app/services/debug-api-service/debug-api.service';
import { CardFilter } from 'src/app/models/cardfilter-model';
import { Card } from 'src/app/models/card-model';
import { ProdApiService } from 'src/app/services/prod-api-service/prod-api.service';
import { Board } from 'src/app/models/board-model';
import { startWith } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search-service/search.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  startups: Startup[] = []
  cards: Card[] = []
  filters: CardFilter[]
  board:Board = null

  constructor(private apiService: ProdApiService, private searchService: SearchService) {

    this.filters = [
      new CardFilter(1, "Funding"),
      new CardFilter(1, "Location"),
      new CardFilter(1, "Employees"),
      new CardFilter(1, "Interest Areas")
    ]
   }

  ngOnInit(): void {

    this.searchService.currentMessage.subscribe(query => {

      this.startups.forEach(startup => {
        if (startup.name.toLowerCase().includes(query.toLowerCase())){
          startup.isVisibleInFilter = true
        }
        else {
          startup.isVisibleInFilter = false
        }

        this.loadCardsWithCurrentStartups();

      });

    })

    this.apiService.getAllStartups().subscribe(startups=>{
      console.log(startups)
      this.startups = startups;
      this.startups.forEach(Startup => {
        Startup.isVisibleInFilter = true;
      });
      // Asigns listener to search bar:
      // Loads the current startups as cards:
      this.loadCardsWithCurrentStartups();
    });

    //this.apiService.getTestBoardAndChildren().subscribe(board=>{
      //console.log("Example Board Retrieval Method:");
      //console.log(board);
    //})
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
      if (startup.isVisibleInFilter){
        var startupCard = new Card(startup.name, startup.description, startup.industryTags, startup._id)

        // Textbook (Lol JK, Given the time frame understandable):
        switch(startup.name.trim()) { 
          case "Supercharger": { 
            startupCard.imgURL = "Supercharger_Logo.png"
            break; 
          } 
          case "Lisnr": { 
            startupCard.imgURL = "Lisnr_Logo.png"
            break; 
          }
          case "Bear Robotics": { 
            startupCard.imgURL = "BearRobotics_Logo.png"
            break; 
          }
          case "Breinify": { 
            startupCard.imgURL = "Breinify_Logo.png"
            break; 
          } 
          
          case "Automation Hero": { 
            startupCard.imgURL = "AutomationHero_Logo.png"
            startupCard.industryScore = 98;
            break; 
          } 
          case "Blue Cart": { 
            startupCard.imgURL = "BlueCart_Logo.png"
            break; 
          } 
          case "Catalytic": { 
            startupCard.imgURL = "Catalytic_Logo.png"
            break; 
          } 
          case "VenueNext": { 
            startupCard.imgURL = "VenueNext_Logo.png"
            break; 
          } 
          case "ViaHero": { 
            startupCard.imgURL = "ViaHero_Logo.jpg"
            break; 
          } 
          case "Grubox": { 
            startupCard.imgURL = "GruBox_Logo.png"
            break; 
          } 
          case "Self-Healing Elastomer": { 
            startupCard.imgURL = "SelfHealingRubber_Logo.png"
            break; 
          } 
          case "ROTA": { 
            startupCard.imgURL = "Rota_Logo.png"
            break; 
          } 
          case "Cabin": { 
            startupCard.imgURL = "Cabin_Logo.jpg"
            break; 
          } 
          case "C Teleport": { 
            startupCard.imgURL = "CTeleport_Logo.png"
            break; 
          }
          case "0Chain": { 
            startupCard.imgURL = "0Chain_Logo.png"
            break; 
          }    
      } 
     startupCard.imgURL = "assets/imgs/startup/" + startupCard.imgURL;
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

  //Test function to act as middle man for handling search functionality
  handleSearch(){
    console.log("Handeling!!!");
  }

  // This is used for the search bar
  filterByName(currentSearchString)
  {
    this.startups.forEach(startup => {
      //console.log(min);
      //console.log(max);
      startup.isVisibleInFilter = Startup.nameContainsSearchVal(startup, currentSearchString);
    });
    this.loadCardsWithCurrentStartups();
  }



  /*
  activateFilter(filter){
    if (filter.active){
      filter.active = false;
      //do something here
      //this.startups = Startup.OrderByName(this.startups);
      //Resets all cards to visible in filter
      this.startups.forEach(startUp => {
        startUp.isVisibleInFilter = true;
      });
      this.loadCardsWithCurrentStartups();
    }
    else {
      filter.active = true;
      let evalMethod;
      if (filter.name == "Funding")
      {
        evalMethod = function(startUp: Startup){

        };
      }
      else if (filter.name == "Location")
      {
        evalMethod = function(startUp: Startup){
          
        };
      }
      else if (filter.name == "Employees")
      {
        evalMethod = function(startUp: Startup){
          
        };
      }
      else if (filter.name == "Interest Areas")
      {
        evalMethod = function(startUp: Startup){
          
        };
      }
      else 
      {
        evalMethod = function(startUp: Startup){
          console.log("Error! Unknown Filter found!")
        };
      }

      this.startups.forEach(startUp => {
        startUp.isVisibleInFilter = evalMethod(startUp);
      });
    }
  }*/

  openListDialogue(){
    alert("list dialogue")
  }

}
