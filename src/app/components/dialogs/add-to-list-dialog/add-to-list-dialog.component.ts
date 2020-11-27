import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from 'src/app/models/list-model';
import { ListService } from 'src/app/services/list-service/list.service';
import { CompareStartupsDialogComponent } from '../compare-startups-dialog/compare-startups-dialog.component';

export interface DialogData {
  Emails: [string];
}

@Component({
  selector: 'app-add-to-list-dialog',
  templateUrl: './add-to-list-dialog.component.html',
  styleUrls: ['./add-to-list-dialog.component.scss']
})
export class AddToListDialogComponent implements OnInit {

  lists: List[] = [];
  startupId: string;

  constructor(
    private listService: ListService,
    public dialogRef: MatDialogRef<CompareStartupsDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.startupId = data["startupId"]
    }

  ngOnInit(): void {
    this.getAllLists();
  }

  getAllLists(){
    this.listService.get().subscribe(res=>{
      this.lists = res;
      
      //if list contains startup:
      this.lists.map(list => {
        list.startups.map(startup =>{
          if (startup._id == this.startupId){
            list.selected = true;
          }
        })
      })
    })
  } 

  onFinishClick(){

    //add startup to lists

    //TODO: bad bad bad.... just look at it...
    this.lists.map(list => {

      if (list.selected){
        this.listService.postStartupToList(this.startupId, list._id).toPromise();
      }
      else {
        this.listService.delStartupFromList(this.startupId, list._id).toPromise();
      }
    })

    this.closeDialog();
  }

  onCancelClick(){
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
