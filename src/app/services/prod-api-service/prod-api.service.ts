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
  //bad
  baseUrl = environment.host + ":3000/"

  constructor(private http: HttpClient) { }

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

}
