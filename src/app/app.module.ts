import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { MatFormFieldModule } from  '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { LoginFormComponent } from './login-form/login-form.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { RegisterFormComponent } from './register-form/register-form.component';

import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomePageComponent } from './home-page/home-page.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    PageNotFoundComponent,
    RegisterFormComponent,
    UserProfileComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
