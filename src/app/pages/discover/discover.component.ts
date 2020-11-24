import { Component, OnInit } from '@angular/core';
import { Startup } from 'src/app/models/startup-model';
import { CardFilter } from 'src/app/models/cardfilter-model';
import { Card } from 'src/app/models/card-model';
import { Board } from 'src/app/models/board-model';
import { SearchService } from 'src/app/services/search-service/search.service';
import { StartupService } from 'src/app/services/startup-service/startup.service';

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

  fundingSortActive: boolean = false;
  employeeCountSortActive: boolean = false;

  constructor(
    private startupService: StartupService, 
    private searchService: SearchService) {
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

    this.startupService.get().subscribe(startups=>{
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
        var startupCard = new Card(startup.name, startup.description, startup.industryTags, startup.industryScore, startup._id, startup.startupImgUrl)
        this.cards.push(startupCard);
      }

    });
  }

  sortByFunding(){
    if (this.fundingSortActive == false){
      this.fundingSortActive = true
    }
    else {
      this.fundingSortActive = false
    }

    //TODO: sort by funding
  }

  sortByEmployeeCount(){
    if (this.employeeCountSortActive == false){
      this.employeeCountSortActive = true
    }
    else {
      this.employeeCountSortActive = false
    }

    //TODO: sort by employee count
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
