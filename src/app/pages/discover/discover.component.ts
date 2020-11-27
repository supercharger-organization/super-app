import { Component, OnInit } from '@angular/core';
import { Startup } from 'src/app/models/startup-model';
import { Card } from 'src/app/models/card-model';
import { Board } from 'src/app/models/board-model';
import { SearchService } from 'src/app/services/search-service/search.service';
import { StartupService } from 'src/app/services/startup-service/startup.service';
import { MatDialog } from '@angular/material/dialog';
import { SessionDialogComponent } from 'src/app/components/dialogs/session-dialog/session-dialog.component';
import { InviteDialogComponent } from 'src/app/components/dialogs/invite-dialog/invite-dialog.component';
import { AddToListDialogComponent } from 'src/app/components/dialogs/add-to-list-dialog/add-to-list-dialog.component';

export enum SortIcon{
  inactive = "sort",
  ascending = "north",
  descending = "south"
}
export class CardFilter {
  icon: SortIcon = SortIcon.inactive;

  constructor(
    public active: boolean,
  ){}

  setIcon(icon: SortIcon){
    this.icon = icon;
  }

}

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

  industryScoreSort = new CardFilter(false);
  employeeCountSort = new CardFilter(false);
  fundingSort = new CardFilter(false);

  constructor(
    private startupService: StartupService, 
    private searchService: SearchService,
    public dialog: MatDialog
    ) {}

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
      this.startups = startups;
      this.startups.forEach(Startup => {
        Startup.isVisibleInFilter = true;
      });

      //BAD: due to time constraints and rapid prototyping
      //validate and convert employee count to number...
      this.startups.map(startup => {
        //remove all characters besides numbers
        let removedNonIntegers = startup.employeeCount.replace(/[^0-9]/g, '');
        startup.employeeNum = +removedNonIntegers;
      })

      //BAD: due to time constraints and rapid prototyping
      //validate and convert funding to number...
      this.startups.map(startup => {
        //remove all characters besides numbers
        let removedNonIntegers = startup.funding.replace(/[^0-9]/g, '');
        startup.fundingNum = +removedNonIntegers;
        console.log(startup.fundingNum)
      })

      //BAD: due to time constraints and rapid prototyping
      //validate and convert funding to number...
      this.startups.map(startup => {
        //remove all characters besides numbers
        let removedNonIntegers = startup.industryScore.replace(/[^0-9]/g, '');
        startup.industryScoreNum = +removedNonIntegers;
        console.log(startup.fundingNum)
      })


      this.loadCardsWithCurrentStartups();
    });
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

  //GARBAGE: 
  sortByFunding(){
    this.industryScoreSort.setIcon(SortIcon.inactive)
    this.employeeCountSort.setIcon(SortIcon.inactive)
    if (this.fundingSort.icon == SortIcon.inactive) {
      this.fundingSort.setIcon(SortIcon.descending);
      this.startups = this.startups.sort((a, b) => b.fundingNum - a.fundingNum);
      this.loadCardsWithCurrentStartups();
    }
    else if (this.fundingSort.icon == SortIcon.descending){
      //ascending
      this.fundingSort.setIcon(SortIcon.ascending);
      this.startups = this.startups.sort((a, b) => a.fundingNum - b.fundingNum);
      this.loadCardsWithCurrentStartups();
    }
    else {
      this.fundingSort.setIcon(SortIcon.inactive);
      this.startups = this.startups.sort((a, b) => b.fundingNum - a.fundingNum);
      this.loadCardsWithCurrentStartups();
    }
  }

  //GARBAGE: 
  sortByIndustryScore(){
    this.fundingSort.setIcon(SortIcon.inactive)
    this.employeeCountSort.setIcon(SortIcon.inactive)
    if (this.industryScoreSort.icon == SortIcon.inactive) {
      this.industryScoreSort.setIcon(SortIcon.descending);
      this.startups = this.startups.sort((a, b) => b.industryScoreNum - a.industryScoreNum);
      this.loadCardsWithCurrentStartups();
    }
    else if (this.industryScoreSort.icon == SortIcon.descending){
      //ascending
      this.industryScoreSort.setIcon(SortIcon.ascending);
      this.startups = this.startups.sort((a, b) => a.industryScoreNum - b.industryScoreNum);
      this.loadCardsWithCurrentStartups();
    }
    else {
      this.industryScoreSort.setIcon(SortIcon.inactive);
      this.startups = this.startups.sort((a, b) => b.industryScoreNum - a.industryScoreNum);
      this.loadCardsWithCurrentStartups();
    }
  }

  //GARBAGE: 
  sortByEmployeeCount(){
    this.fundingSort.setIcon(SortIcon.inactive)
    this.industryScoreSort.setIcon(SortIcon.inactive)
    if (this.employeeCountSort.icon == SortIcon.inactive) {
      this.employeeCountSort.setIcon(SortIcon.descending);
      this.startups = this.startups.sort((a, b) => b.employeeNum - a.employeeNum);
      this.loadCardsWithCurrentStartups();
    }
    else if (this.employeeCountSort.icon == SortIcon.descending){
      //ascending
      this.employeeCountSort.setIcon(SortIcon.ascending);
      this.startups = this.startups.sort((a, b) => a.employeeNum - b.employeeNum);
      this.loadCardsWithCurrentStartups();
    }
    else {
      this.employeeCountSort.setIcon(SortIcon.inactive);
      this.startups = this.startups.sort((a, b) => b.employeeNum - a.employeeNum);
      this.loadCardsWithCurrentStartups();
    }
  }

  // //GARBAGE: 
  // sortByEmployeeCount(sortDirection: any){
  //   if (sortDirection == 1){
  //     this.startups = this.startups.sort((a, b) => a.employeeNum - b.employeeNum);
  //     this.loadCardsWithCurrentStartups();
  //   }
  //   else {
  //     this.startups = this.startups.sort((a, b) => b.employeeNum - a.employeeNum);
  //     this.loadCardsWithCurrentStartups();
  //   }
  // }
    
  // //GARBAGE: 
  // sortByIndustryScore(sortDirection: any){
  //   if (sortDirection == 1){
  //     this.startups = this.startups.sort((a, b) => a.industryScoreNum - b.industryScoreNum);
  //     this.loadCardsWithCurrentStartups();
  //   }
  //   else {
  //     this.startups = this.startups.sort((a, b) => b.industryScoreNum - a.industryScoreNum);
  //     this.loadCardsWithCurrentStartups();
  //   }
  // }

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

  openSessionDialog(){
    const dialogRef = this.dialog.open(SessionDialogComponent, 
      {
        width: '525px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openInviteDialog(){
    const dialogRef = this.dialog.open(InviteDialogComponent, 
      {
        width: '600px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
