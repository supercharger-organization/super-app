import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailerService {

  //TODO: should not be here
  base = `${environment.host}:3000/mailer`

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  //TODO: should this go in an api base class???
  private pushNotification(res:any){
    if (res.err){
      this.toastr.error(res.err)
    }
    else {
      this.toastr.success(res.message)
    }
  }

  post(body:string){
    let params = {
      body: body
    }
    return this.http.post<any>(`${this.base}`, params, {}).pipe(
      map(res => {
        this.pushNotification(res);
      })
    )
  }
}
