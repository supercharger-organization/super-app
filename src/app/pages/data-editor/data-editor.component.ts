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
  name: string = '';
  constructor(private apiService: ProdApiService, private searchService: SearchService) { 
  }

  ngOnInit(): void {

  }

}
