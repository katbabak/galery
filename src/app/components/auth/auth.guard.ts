import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './services/auth.service';

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (AuthService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/auth/login'], {queryParams: {redirectTo: state.url}});
    return false;
  }
}
