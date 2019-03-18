import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './components/auth/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { GaleryContainerComponent } from './components/galery-profile/galery-container/galery-container.component';
import {AuthService} from './components/auth/services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppAuthGuard} from './components/auth/auth.guard';
import {AppInterceptor} from './app-interceptor';
import { ErrorPopUpComponent } from './pop-ups/error-pop-up/error-pop-up.component';
import {MaterialModule} from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './components/galery-profile/home/home.component';
import { FavouritesComponent } from './components/galery-profile/favourites/favourites.component';
import { PhotoItemComponent } from './components/galery-profile/photo-item/photo-item.component';
import { NavBarComponent } from './components/galery-profile/nav-bar/nav-bar/nav-bar.component';
import { MenuComponent } from './components/galery-profile/nav-bar/menu/menu.component';
import { GaleryService} from './components/galery-profile/galery.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    GaleryContainerComponent,
    ErrorPopUpComponent,
    HomeComponent,
    FavouritesComponent,
    PhotoItemComponent,
    NavBarComponent,
    MenuComponent,
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
    GaleryService,
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
