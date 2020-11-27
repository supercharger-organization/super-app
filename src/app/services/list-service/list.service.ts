import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';
import { List } from 'src/app/models/list-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  
  //TODO: should not be here
  base = `${environment.host}:3000/list`

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

  getById(listId){
    return this.http.get<List>(`${this.base}/${listId}/w_children`, {}).pipe(
      map(res => res)
    )
  }

  get(){
    return this.http.get<List[]>(`${this.base}/w_children`, {}).pipe(
      map(res => res)
    )
  }

  put(list: List){
    return this.http.patch<List>(this.base + list._id, list, {}).pipe(
      map(res => {
        this.pushNotification(res)
        return res
      })
    )
  }

  postStartupToList(startupId: string, listId: string){
    return this.http.post<List>(`${this.base}/${listId}/startup/${startupId}`, {}).pipe(
      map(res => {
        return res
      })
    )
  }

  delStartupFromList(startupId: string, listId: string){
    return this.http.delete<List>(`${this.base}/${listId}/startup/${startupId}`, {}).pipe(
      map(res => {
        return res
      })
    )
  }

}
