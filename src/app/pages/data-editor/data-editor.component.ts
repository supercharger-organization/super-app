import { Component, OnInit, Input } from '@angular/core';
import { Startup } from 'src/app/models/startup-model';
import { ProdApiService } from 'src/app/services/prod-api-service/prod-api.service';
import { SearchService } from 'src/app/services/search-service/search.service';

@Component({
  selector: 'app-data-editor',
  templateUrl: './data-editor.component.html',
  styleUrls: ['./data-editor.component.scss']
})

export class DataEditorComponent implements OnInit {
  currentStartup: Startup = this.createBlankStartup();
  startups: Startup[] = [];
  constructor(private apiService: ProdApiService, private searchService: SearchService) { 
  }

  ngOnInit(): void {
    this.refreshStartupList();
  }

  createBlankStartup(): Startup{
    return new Startup("","","","","","","","","","",[],[]);
  }

  saveCurrentStartup(): void{
    this.apiService.sendStartupToAPI(this.currentStartup).subscribe(response=>{
      console.log("Startup saved!");
      console.log(response);
      this.refreshStartupList();
    });
  }

  createNewStartup(): void{

  }

  deleteCurrentStartup(): void{

  }

  startupSelected(startup: Startup): void{
    this.currentStartup = startup;
  }

  refreshStartupList(): void{
    this.apiService.getAllStartups().subscribe(startups=>{
      console.log(startups)
      this.startups = startups;
      this.startups.forEach(Startup => {
        Startup.isVisibleInFilter = true;
      });
      // Asigns listener to search bar:
      // Loads the current startups as cards:
    });
  }

}