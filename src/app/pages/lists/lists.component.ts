import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card-model';
import { CardFilter } from 'src/app/models/cardfilter-model';
import { Board } from 'src/app/models/board-model';
import { List } from 'src/app/models/list-model';
import { Startup } from 'src/app/models/startup-model';
import { CompareStartupsDialogComponent } from 'src/app/components/dialogs/compare-startups-dialog/compare-startups-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ListDialogComponent } from 'src/app/components/dialogs/list-dialog/list-dialog.component';
import { BoardService } from 'src/app/services/board-service/board.service';
import { ListService } from 'src/app/services/list-service/list.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {


  toggleDetail:Boolean = false
  cards: Card[] = []
  filters: CardFilter[] = []
  lists: List[] = [];

  constructor(
    private listService: ListService, 
    public dialog: MatDialog ) {

    this.filters = [
      new CardFilter(1, "Funding"),
      new CardFilter(1, "Location"),
      new CardFilter(1, "Employees"),
      new CardFilter(1, "Interest Areas")
    ]
   }

  ngOnInit(): void {
    this.listService.get().subscribe(lists=>{
      //TODO: remove
      console.log(lists)
      lists.forEach(res=>{
        if (res.title == "Wind Blade New Materials"){
          res.imgURL = "https://supercharger-prod.s3.us-east-2.amazonaws.com/WindImage.jpeg"
        }
        else if (res.title == "Longer Life Batteries"){
          res.imgURL = "https://supercharger-prod.s3.us-east-2.amazonaws.com/battery.jpg"
        }
        else if (res.title == "Ground Resistance Testers"){
          res.imgURL = "https://supercharger-prod.s3.us-east-2.amazonaws.com/Ground.jpeg"
        }
        else if (res.title == "Construction Technology"){
          res.imgURL = "https://supercharger-prod.s3.us-east-2.amazonaws.com/Construction.jpeg"
        }
      })
      this.lists = lists;
    })
  }

  openCompareStartupsDialog(chartUrl){
    const dialogRef = this.dialog.open(CompareStartupsDialogComponent, 
      {
        width: '1200px',
        data : {
          chartURL : chartUrl
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openReportDialog(chartUrl){
    const dialogRef = this.dialog.open(CompareStartupsDialogComponent, 
      {
        width: '1200px',
        data : {
          chartURL : chartUrl
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openListDialog(){
    const dialogRef = this.dialog.open(ListDialogComponent, 
      {
        width: '400px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

  toggleFavorite(startUp: Startup){
    if (startUp.isFavorite){
      startUp.isFavorite = false;
    }
    else {
      startUp.isFavorite = true;
    }
  }

  addUserToList(list: List){
    alert("coming soon")
  }
  
}
