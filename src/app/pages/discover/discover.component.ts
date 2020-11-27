import { Component, OnInit } from '@angular/core';
import { Startup } from 'src/app/models/startup-model';
import { CardFilter } from 'src/app/models/cardfilter-model';
import { Card } from 'src/app/models/card-model';
import { Board } from 'src/app/models/board-model';
import { SearchService } from 'src/app/services/search-service/search.service';
import { StartupService } from 'src/app/services/startup-service/startup.service';
import { MatDialog } from '@angular/material/dialog';
import { SessionDialogComponent } from 'src/app/components/dialogs/session-dialog/session-dialog.component';
import { InviteDialogComponent } from 'src/app/components/dialogs/invite-dialog/invite-dialog.component';
import { AddToListDialogComponent } from 'src/app/components/dialogs/add-to-list-dialog/add-to-list-dialog.component';

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
    if (this.fundingSortActive == false){
      this.fundingSortActive = true

      var sortedStartups = []
      var sortedFundingNums: number[] = this.startups.map(res=>res.fundingNum).sort((n1,n2) => n1 - n2);
      for (let i = 0; i < sortedFundingNums.length; i++) {
        const num = sortedFundingNums[i];
        for (let j = 0; j < this.startups.length; j++) {
          const startup = this.startups[j];
          if (num == startup.fundingNum){
            sortedStartups.push(startup);
            sortedStartups.splice(j, 1)
            break;
          }
        }
      }
      this.startups = sortedStartups;
    }
    else {
      this.fundingSortActive = false
      var sortedStartups = []
      var sortedFundingNums: number[] = this.startups.map(res=>res.fundingNum).sort((n1,n2) => n2 - n1);
      for (let i = 0; i < sortedFundingNums.length; i++) {
        const num = sortedFundingNums[i];
        for (let j = 0; j < this.startups.length; j++) {
          const startup = this.startups[j];
          if (num == startup.fundingNum){
            sortedStartups.push(startup);
            sortedStartups.splice(j, 1)
            break;
          }
        }
      }
      this.startups = sortedStartups;
    }

  }

  //GARBAGE:
  sortByEmployeeCount(){
    if (this.employeeCountSortActive == false){
      this.employeeCountSortActive = true

      var sortedStartups = []
      var sortedEmployeeNums: number[] = this.startups.map(res=>res.employeeNum).sort((n1,n2) => n1 - n2);
      for (let i = 0; i < sortedEmployeeNums.length; i++) {
        const num = sortedEmployeeNums[i];
        for (let j = 0; j < this.startups.length; j++) {
          const startup = this.startups[j];
          if (num == startup.employeeNum){
            sortedStartups.push(startup);
            sortedStartups.splice(j, 1)
            break;
          }
        }
      }
      this.startups = sortedStartups;
    }
    else {
      this.employeeCountSortActive = false

      var sortedStartups = []
      var sortedEmployeeNums: number[] = this.startups.map(res=>res.employeeNum).sort((n1,n2) => n2 - n1);
      for (let i = 0; i < sortedEmployeeNums.length; i++) {
        const num = sortedEmployeeNums[i];
        for (let j = 0; j < this.startups.length; j++) {
          const startup = this.startups[j];
          if (num == startup.employeeNum){
            sortedStartups.push(startup);
            sortedStartups.splice(j, 1)
            break;
          }
        }
      }
      this.startups = sortedStartups;
    }

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
