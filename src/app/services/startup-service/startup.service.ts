import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  pushNotification(res:any){
    if (res.err){
      this.toastr.error(res.err)
    }
    else {
      this.toastr.success(res.message)
    }
  }

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
    return this.http.post<any>(this.baseUrl + this.route, messageBody).pipe(
      map(res => {
        this.pushNotification(res)
        return res
      })
    );
  }

  delete(id){
    return this.http.post(this.baseUrl + this.route + id, {}).pipe(
      map(res => {
        this.pushNotification(res)
        return res
      })
    );
  }

}
