import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GaleryContainerComponent} from './components/galery-profile/galery-container/galery-container.component';
import {AuthComponent} from './components/auth/auth/auth.component';
import {LoginComponent} from './components/auth/login/login.component';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {AppAuthGuard} from './components/auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: GaleryContainerComponent, canActivate: [AppAuthGuard]},
  {path: 'auth', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'sign-up', component: SignUpComponent},
    ]},
  // {path: '**', component: },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
