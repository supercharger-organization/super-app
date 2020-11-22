import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Startup } from 'src/app/models/startup-model';
import { StartupService } from 'src/app/services/startup-service/startup.service';

@Component({
  templateUrl: './startup-edit.component.html',
  styleUrls: ['./startup-edit.component.scss']
})

export class StartupEditComponent implements OnInit {
  //currentStartup: Startup = this.createBlankStartup();
  startup: Startup;

  testStringArray: string[]= [];

  constructor(
    private startupService: StartupService,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    if (this.route.snapshot.params.id != null){
      let startupId = this.route.snapshot.params.id;
      this.getStartup(startupId)
    }
    else {
      this.startup = this.createBlankStartup();
      console.log("here")
    }
  }

  getStartup(startupId:string){
      //TODO: fix! should not come back as array
      this.startupService.getById(startupId).subscribe(res=>{
        this.startup = res[0];
      });  
  }

  createBlankStartup(): Startup{
    return new Startup("","","","","","","","","","",[],[]);
  }

  saveCurrentStartup(): void{
    this.startupService.post(this.startup).subscribe(response=>{
      console.log("Startup saved!");
      console.log(response);
      this.getStartup(this.startup._id)
    });
  }

}
