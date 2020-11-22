import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { List } from 'src/app/models/list-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  //bad
  baseUrl = environment.host + ":3000/"
  route = "list/";

  constructor(private http: HttpClient) { }

  getById(listId){
    return this.http.get<List>(this.baseUrl + this.route +  listId + "/w_children", {}).pipe(
      map(res => res)
    )
  }

  get(){
    return this.http.get<List[]>(this.baseUrl + this.route, {}).pipe(
      map(res => res)
    )
  }

}
