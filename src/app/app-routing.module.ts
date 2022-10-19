import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { OutputComponent } from './output/output.component';
import { SignupComponent } from './signup/signup.component';
import{canActivate, redirectUnauthorizedTo,redirectLoggedInTo}from '@angular/fire/auth-guard';

const redirectToLogin=()=> redirectUnauthorizedTo(['login']);
const redirectToUser=()=> redirectLoggedInTo(['user']);

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signup'},
  { path: 'login',
   component: LoginComponent,
   ...canActivate(redirectToUser)
   },
  { path: 'user', 
  component: UserComponent,
  ...canActivate(redirectToLogin)
},
  {path: 'output', component: OutputComponent},

  {path:'signup',
  component: SignupComponent,
  ...canActivate(redirectToUser)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
