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


@Injectable({
  providedIn: 'root'
})
export class DebugApiService {
  baseUrl = "http://localhost:3000/"
  constructor(private http: HttpClient) { }


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
  addCard(newCard){
    var headers = new HttpHeaders();
    var TargetRoute = "cards/";
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + TargetRoute, newCard, {headers: headers}).pipe(
      map(res => res)
    )
  }
  addColumn(newColumn){
    var headers = new HttpHeaders();
    var TargetRoute = "list/";
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + TargetRoute, newColumn, {headers: headers}).pipe(
      map(res => res)
    )
  }
  addNote(newNote){
    var headers = new HttpHeaders();
    var TargetRoute = "note/";
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + TargetRoute, newNote, {headers: headers}).pipe(
      map(res => res)
    )
  }
  addStartup(newStartup){
    var headers = new HttpHeaders();
    var TargetRoute = "startup/";
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + TargetRoute, newStartup, {headers: headers}).pipe(
      map(res => res)
    )
  }
  addTeam(newTeam){
    var headers = new HttpHeaders();
    var TargetRoute = "team/";
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + TargetRoute, newTeam, {headers: headers}).pipe(
      map(res => res)
    )
  }
  addUser(newUser){
    var headers = new HttpHeaders();
    var TargetRoute = "user_account/";
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + TargetRoute, newUser, {headers: headers}).pipe(
      map(res => res)
    )
  }
  addBoard(newBoard){
    var headers = new HttpHeaders();
    var TargetRoute = "board/";
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + TargetRoute, newBoard, {headers: headers}).pipe(
      map(res => res)
    )
  }
}
