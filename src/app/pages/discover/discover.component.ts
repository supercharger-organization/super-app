import { Component, OnInit } from '@angular/core';
import { Startup } from 'src/app/models/startup-model';
import { DebugApiService } from 'src/app/services/debug-api-service/debug-api.service';
import { CardFilter } from 'src/app/models/cardfilter-model';
import { Card } from 'src/app/models/card-model';
import { ProdApiService } from 'src/app/services/prod-api-service/prod-api.service';
import { Board } from 'src/app/models/board-model';
import { SearchService } from 'src/app/services/search-service/search.service';
import { S3BucketService } from 'src/app/services/s3-bucket-service/s3-bucket.service';
import { ToastrService } from 'ngx-toastr';

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
        var startupCard = new Card(startup.name, startup.description, startup.industryTags, startup.industryScore, startup._id, startup.imgURL)
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

  openListDialogue(){
    alert("list dialogue")
  }

}
