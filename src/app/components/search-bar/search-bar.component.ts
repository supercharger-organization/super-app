import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search-service/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchQuery: string = ""

  constructor(private searchService: SearchService) { }

  ngOnInit(): void { }

  search(query: string){
    this.searchService.changeMessage(query)
  }
}
