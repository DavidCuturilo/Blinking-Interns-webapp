import { DataFromServerService } from './services/data-from-server.service';
import { HelperMethodService } from 'src/app/services/helper-method.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TaskInfoModalComponent } from './shared/modals/task-info-modal/task-info-modal.component';
import { MaterialModule } from './material';
import { ChangePasswordModalComponent } from './shared/modals/change-password-modal/change-password-modal.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    PageNotFoundComponent,
    RegisterFormComponent,
    UserProfileComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MaterialModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi:true
  }, AuthGuard, AuthService, HelperMethodService, DataFromServerService],
  entryComponents: [TaskInfoModalComponent,ChangePasswordModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
