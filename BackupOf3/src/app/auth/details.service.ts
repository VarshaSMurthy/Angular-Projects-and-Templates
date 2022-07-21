import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDetails } from './details';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private _url: string="http://10.47.35.28:8000/api/details/";
  // private _url: string="/api/details/";
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
}
