import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Board } from 'src/app/models/board-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  //bad
  baseUrl = environment.host + ":3000/"
  route = "board/"
  
  constructor(private http: HttpClient) { }

  getWithChildren(boardId){
    return this.http.get<Board>(this.baseUrl + this.route +  boardId + "/w_children", {}).pipe(
      map(res => res)
    )
  }

  get(){
    return this.http.get<Board[]>(this.baseUrl + this.route, {}).pipe(
      map(res => res)
    )
  }

}
