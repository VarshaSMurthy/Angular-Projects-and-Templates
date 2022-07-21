import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  private loginUrl = 'http://10.47.35.28:8000/api/get-token/';

  private httpOptions!: {
    headers: HttpHeaders;
    //withCredentials:boolean;
  };
  csrfToken: Object | undefined;
  public data: any = [];
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {

    // let csrf = this.cookieService.get("csrftoken");
    // console.log(csrf);
    // if (typeof (csrf) === 'undefined') {
    //   csrf = '';
    //   console.log(csrf);
    // }

    this.httpOptions = {
      // headers: new HttpHeaders({'Content-Type':'application/json','Access-Control-Allow-Origin': '*','X-CSRFToken':csrf}),
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      // withCredentials:true
    };


  }
  // login(user: User){
  //   if (user.userName == 'admin' && user.password == 'admin' ) { 
  //     this.loggedIn.next(true);
  //     this.router.navigate(['']);
  //   }


  login(user: User["username"]) {
    
    return this.http.post(this.loginUrl, user, this.httpOptions).subscribe((response) => {
      
      this.data = response;
      const token = this.data.token;
      const userName = this.data.username;
      const usergroup = this.data.user_group
      console.log('token',token);
      console.log('username',userName);
      console.log('usergroup',usergroup);
      localStorage.setItem('token', this.data.token);
      localStorage.setItem('username', this.data.username)
      localStorage.setItem('usergroup', this.data.user_group)
      this.loggedIn.next(true);
      this.router.navigate(['']);
    }
    );
  }

  // redirtoDashboard() {
  //   this.loggedIn.next(true);
  //   this.router.navigate(['']);
  // }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('usergroup')
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}