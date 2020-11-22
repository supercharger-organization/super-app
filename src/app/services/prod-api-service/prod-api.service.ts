import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

// Custom Models:
import { Card } from '../../models/card-model';
import { List } from '../../models/list-model';
import { Note } from '../../models/note-model';
import { Startup } from '../../models/startup-model';
import { Team } from '../../models/team-model';
import { User } from '../../models/user-model';
import { Board } from '../../models/board-model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProdApiService {
  baseUrl = environment.host + ":3000/"
  
  constructor(private http: HttpClient) { }


  getListById(listId){
    var TargetRoute = "list/";
    return this.http.get<List>(this.baseUrl + TargetRoute +  listId + "/w_children", {}).pipe(
      map(res => res)
    )
  }

  getStartupById(startupId){
    var TargetRoute = "startup/";
    return this.http.get<Startup>(this.baseUrl + TargetRoute +  startupId, {}).pipe(
      map(res => res)
    )
  }

  getBoardAndAllChildren(boardId){
    var TargetRoute = "board/";
    return this.http.get<Board>(this.baseUrl + TargetRoute +  boardId + "/w_children", {}).pipe(
      map(res => res)
    )
  }

  // Test method for demo
  getTestBoardAndChildren()
  {
    var TargetRoute = "board/";
    return this.http.get<Board>(this.baseUrl + TargetRoute +  "GetTestBoard", {}).pipe(
      map(res => res)
    )
  }

  // Mass object retrieval test methods:
  getAllCards(){
    var TargetRoute = "cards/";
    return this.http.get<Card[]>(this.baseUrl + TargetRoute +  "all", {}).pipe(
      map(res => res)
    )
  }

  getAllBoards(){
    var TargetRoute = "board/";
    return this.http.get<Board[]>(this.baseUrl + TargetRoute +  "all", {}).pipe(
      map(res => res)
    )
  }

  getAllLists(){
    var TargetRoute = "list/";
    return this.http.get<List[]>(this.baseUrl + TargetRoute +  "all", {}).pipe(
      map(res => res)
    )
  }

  getAllNotes(){
    var TargetRoute = "note/";
    return this.http.get<Note[]>(this.baseUrl + TargetRoute +  "all", {}).pipe(
      map(res => res)
    )
  }

  getAllUsers(){
    var TargetRoute = "user_account/";
    return this.http.get<User[]>(this.baseUrl + TargetRoute +  "all", {}).pipe(
      map(res => res)
    )
  }

  getAllTeams(){
    var TargetRoute = "team/";
    return this.http.get<Team[]>(this.baseUrl + TargetRoute +  "all", {}).pipe(
      map(res => res)
    )
  }

  getAllStartups(){
    var TargetRoute = "startup/";
    return this.http.get<Startup[]>(this.baseUrl + TargetRoute +  "all", {}).pipe(
      map(res => res)
    )
  }

// Generic add new object functions:
  addObjectByName(objectName, newObject)
  {
    var TargetRoute = objectName + "/update";
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + TargetRoute, newObject, {headers: headers}).pipe(
      map(res => res)
    );
  }

  updateObjectByName(objectName, updatedObject)
  {
    var TargetRoute = objectName + "/update";
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + TargetRoute, updatedObject, {headers: headers}).pipe(
      map(res => res)
    );
  }

  // New route to upload startups and lists to the api
  sendStartupToAPI(startup)
  {
    var TargetRoute = "startup/post";
    var headers = new HttpHeaders();
    var messageBody = {
      "startup": startup
    }
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + TargetRoute, messageBody, {headers: headers}).pipe(
      map(res => res)
    );
  }

}
