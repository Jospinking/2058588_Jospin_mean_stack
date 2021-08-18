import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "./login/login.component"
import {RegistrationComponent} from "./registration/registration.component"
import {PortfolioComponent} from "./portfolio/portfolio.component"
import {AuthGuard} from "./login/authguard"

const routes: Routes = [
  {path:"\login",component:LoginComponent},
  {path:"\create",component:RegistrationComponent},
  {path:"\portfolio",component:PortfolioComponent,canActivate:[AuthGuard]},
  {path:"",redirectTo:"\login",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
