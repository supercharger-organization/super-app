import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Startup } from 'src/app/models/startup-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  //bad
  baseUrl = environment.host + ":3000/"
  route = "startup/"
  
  constructor(private http: HttpClient) { }

  getById(startupId){
    return this.http.get<Startup>(this.baseUrl + this.route +  startupId, {}).pipe(
      map(res => res)
    )
  }

  get(){
    return this.http.get<Startup[]>(this.baseUrl + this.route, {}).pipe(
      map(res => res)
    )
  }

  post(startup){
    let messageBody = {
      "startup": startup
    }
    return this.http.post(this.baseUrl + this.route, messageBody).pipe(
      map(res => res)
    );
  }

  delete(id){
    return this.http.post(this.baseUrl + this.route + id, {}).pipe(
      map(res => res)
    );
  }

}
