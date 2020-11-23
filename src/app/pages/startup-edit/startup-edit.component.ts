import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Startup } from 'src/app/models/startup-model';
import { Feature } from 'src/app/models/feature-model';
import { Patent } from 'src/app/models/patent-model';
import { StartupService } from 'src/app/services/startup-service/startup.service';

@Component({
  templateUrl: './startup-edit.component.html',
  styleUrls: ['./startup-edit.component.scss']
})

export class StartupEditComponent implements OnInit {
  //currentStartup: Startup = this.createBlankStartup();
  startup: Startup;

  testStringArray: string[]= ['URL 1!',"URL 2!", "URL 3!"];

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

  addNewFeature(): void{
    var newFeature = new Feature();
    newFeature.title = "New Feature";
    this.startup.features.push(newFeature);
  }

  addNewPatent(): void{
    var newPatent = new Patent();
    newPatent.title = "New Patent";
    this.startup.patents.push(newPatent);
  }

  saveCurrentStartup(): void{
    this.startupService.post(this.startup).subscribe(response=>{
      this.getStartup(this.startup._id)
    });
  }

  deleteCurrentFeature(feature): void{
    var index = this.startup.features.indexOf(feature);
    this.startup.features.splice(index, 1);    
  }

  deleteCurrentPatent(patent): void{
    var index = this.startup.patents.indexOf(patent);
    this.startup.patents.splice(index, 1);    
  }

}
