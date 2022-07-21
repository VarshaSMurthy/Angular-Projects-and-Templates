import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDetails } from './details';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { IAssignee } from './assignee'

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private _url: string="http://10.47.35.28:8000/api/details/";

  private _UserUrl: string="http://10.47.35.28:8000/api/users/";
  constructor( private http: HttpClient,private cookieService: CookieService) { }

  getDetails(): Observable<IDetails[]>{
    return this.http.get<IDetails[]>(this._url);
  }

  getDetailById(detail:IDetails): Observable<IDetails[]>{
    return this.http.get<IDetails[]>(this._url+ detail+"/");
  }

  Update(detail:IDetails): Observable<IDetails[]>{
    return this.http.put<IDetails[]>(this._url+ detail.id+"/",detail);
  }

  getUser(): Observable<IAssignee[]>{
    return this.http.get<IAssignee[]>(this._UserUrl);
}
}
