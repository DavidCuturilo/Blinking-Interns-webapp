import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // { path: '', children: [] },
  { path: 'home', canActivate: [AuthGuard], component: HomePageComponent },
  { path: 'login',  canActivate: [AuthGuard], component: LoginComponent },
  { path: 'register', canActivate: [AuthGuard],  component: RegisterComponent },

  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'user-profile', canActivate: [AuthGuard], component: UserProfileComponent},
  { path: 'user-profile/:type', canActivate: [AuthGuard], component: UserProfileComponent},

  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
