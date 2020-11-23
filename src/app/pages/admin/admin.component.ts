import { Component, OnInit, Input } from '@angular/core';
import { Board } from 'src/app/models/board-model';
import { Startup } from 'src/app/models/startup-model';
import { BoardService } from 'src/app/services/board-service/board.service';
import { StartupService } from 'src/app/services/startup-service/startup.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  startups: Startup[]

  constructor(
    private startupService: StartupService) { 
  }

  ngOnInit(): void {
    this.startupService.get().subscribe(res=>{
      this.startups = res;
      console.log(this.startups)
    })
  }
  

  createNewStartup(){
    
  }

  deleteStartup(id: string){
    this.startupService.delete(id).subscribe(response=>{
      this.ngOnInit();
    });
  }

}
