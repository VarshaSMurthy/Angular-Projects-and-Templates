import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { DetailsComponent } from './Components/details/details.component';

const routes: Routes = [
  { path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path: '', component: LoginComponent},
  {path: 'sidenav', component: SidenavComponent },
  {path:'details', component: DetailsComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [LoginComponent, HomeComponent]
