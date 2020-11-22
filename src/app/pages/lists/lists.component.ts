import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card-model';
import { DebugApiService } from 'src/app/services/debug-api-service/debug-api.service';
import { CardFilter } from 'src/app/models/cardfilter-model';
import { ProdApiService } from 'src/app/services/prod-api-service/prod-api.service';
import { Board } from 'src/app/models/board-model';
import { List } from 'src/app/models/list-model';
import { Startup } from 'src/app/models/startup-model';
import { CompareStartupsDialogComponent } from 'src/app/components/dialogs/compare-startups-dialog/compare-startups-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ListDialogComponent } from 'src/app/components/dialogs/list-dialog/list-dialog.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {


  toggleDetail:Boolean = false
  cards: Card[] = []
  filters: CardFilter[] = []
  board: Board = null

  constructor(private apiService: ProdApiService, public dialog: MatDialog ) {

    this.filters = [
      new CardFilter(1, "Funding"),
      new CardFilter(1, "Location"),
      new CardFilter(1, "Employees"),
      new CardFilter(1, "Interest Areas")
    ]
   }

  ngOnInit(): void {
    this.apiService.getAllBoards().subscribe(board=>{
      this.board = board[0]
      console.log(this.board)
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
