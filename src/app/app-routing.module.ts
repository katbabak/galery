import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GaleryContainerComponent} from './components/galery-profile/galery-container/galery-container.component';
import {AuthComponent} from './components/auth/auth/auth.component';
import {LoginComponent} from './components/auth/login/login.component';
import {AppAuthGuard} from './components/auth/auth.guard';
import { HomeComponent } from './components/galery-profile/home/home.component';
import { FavouritesComponent } from './components/galery-profile/favourites/favourites.component';

const routes: Routes = [
// {path: '', redirectTo: '/home', pathMatch: 'full'},
{
  path: '', component: GaleryContainerComponent, canActivate: [AppAuthGuard], children: [
   {path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AppAuthGuard]},
   {path: 'home', component: HomeComponent, canActivate: [AppAuthGuard]},
   {path: 'favourites', component: FavouritesComponent, canActivate: [AppAuthGuard]},
   ]
},
{
  path: 'auth', component: AuthComponent, children: [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  ]
},
{path: '**', redirectTo: '/', pathMatch: 'full'},

];

@NgModule({
  imports: [
  RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
