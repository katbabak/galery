import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {GaleryContainerComponent} from './components/galery-profile/galery-container/galery-container.component';
import {AuthComponent} from './components/auth/auth/auth.component';
import {LoginComponent} from './components/auth/login/login.component';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '/home', component: GaleryContainerComponent, ca},
  {path: '/auth', component: AuthComponent, children: [
      {path: '/login', component: LoginComponent},
      {path: '/sign-up', component: SignUpComponent},
    ]},
  // {path: '**', component: },

];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
