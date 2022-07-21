import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('LoggedIn')){
     this.isLoggedIn = true;
    }
    else if(!localStorage.getItem('LoggedIn'))
    {
      this.isLoggedIn = false;
    }
    // this.isLoggedIn = this.authService.isLoggedIn;

  }
  toggleSideBar(){
this.toggleSideBarForMe.emit();
  }
  onLogout(){
    this.authService.logout();    
  }
}
