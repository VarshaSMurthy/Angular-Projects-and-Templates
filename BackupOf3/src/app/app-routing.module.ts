import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DefaultComponent } from './Components/default/default.component';
import { HeaderComponent } from './Components/header/header.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MessageComponent } from './Components/message/message.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  
  {path:'', component: DefaultComponent,
children:[
  {path:'', component: DashboardComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'message', component: MessageComponent},
  
], canActivate:[AuthGuard]},
{path:'login', component: LoginComponent}
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent=[LoginComponent,DefaultComponent,DashboardComponent,MessageComponent]
