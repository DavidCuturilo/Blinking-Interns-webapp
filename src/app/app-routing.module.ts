import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  // { path: '', children: [] },
  { path: 'dashBoard', component: HomePageComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'user-profile', component: UserProfileComponent},
  { path: '', redirectTo: 'dashBoard', pathMatch: 'full'},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
