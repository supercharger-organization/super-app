import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card-model';
import { CardFilter } from 'src/app/models/cardfilter-model';
import { ProdApiService } from 'src/app/services/prod-api-service/prod-api.service';
import { Board } from 'src/app/models/board-model';
import { List } from 'src/app/models/list-model';
import { Startup } from 'src/app/models/startup-model';
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/services/list-service/list.service';
import { AddToListDialogComponent } from 'src/app/components/dialogs/add-to-list-dialog/add-to-list-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { stringList } from 'aws-sdk/clients/datapipeline';

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

  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    public dialog: MatDialog
    ) {
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

      this.listService.getById(listId).subscribe(list=>{
        console.log(list)
          this.list = list[0];
          this.startups = this.list.startups;
          this.startups.forEach(Startup => {
            Startup.isVisibleInFilter = true;
          });
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

  loadCardsWithCurrentStartups(){
    // Resets the cards array:
    this.cards = [];

    this.startups.forEach(startup => {
      /** tbd **/
      if (startup.isVisibleInFilter)
      {
        var startupCard = new Card(startup.name, startup.description, startup.industryTags, startup.industryScore, startup._id, startup.startupImgUrl)
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
      startup.isVisibleInFilter = Startup.tagIsPresent(startup, tag);
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

  deleteStartupFromList(startupId: string){

    //TODO: clean up
    this.listService.delStartupFromList(startupId, this.list._id).subscribe(_=>{
      this.ngOnInit();
    })
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

}
