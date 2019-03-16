import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './components/auth/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { GaleryContainerComponent } from './components/galery-profile/galery-container/galery-container.component';
import {AuthService} from './components/auth/services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppAuthGuard} from './components/auth/auth.guard';
import {AppInterceptor} from './app-interceptor';
import { ErrorPopUpComponent } from './pop-ups/error-pop-up/error-pop-up.component';
import {MaterialModule} from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    SignUpComponent,
    GaleryContainerComponent,
    ErrorPopUpComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    AuthService,
    AppAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }],
  entryComponents: [ErrorPopUpComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
