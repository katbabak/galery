import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService, TOKEN_NAME, TokenResponse} from './services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {ErrorPopUpComponent} from '../../pop-ups/error-pop-up/error-pop-up.component';


@Injectable()
export class AppAuthGuard implements CanActivate {
  originURL = document.location.origin;
  redirect_uri = encodeURIComponent(this.originURL + '/home');

  constructor(private router: Router,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (AuthService.isLoggedIn()) {
      return true;
    } else if (next.queryParams && next.queryParams['code']) {
      this.getTokenRequest(next);
    } else if (next.queryParams && next.queryParams['error']) {
      this.openErrorPopUp(`${next.queryParams['error_description']}`);
      return false;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

  getTokenRequest(next: ActivatedRouteSnapshot) {
    this.authService.getToken(next.queryParams['code'])
      .subscribe(
        (response: TokenResponse) => {
          localStorage.setItem(TOKEN_NAME, response.access_token);
          localStorage.setItem('scope', response.scope);
          this.router.navigate(['/home']);
          this.getUserInfo();
          return true;
        },
        (error: HttpErrorResponse) => {
          return false;
        }
      );
  }

  getUserInfo() {
    this.authService.getCurrentUserInfo().subscribe();
  }

  openErrorPopUp(message: string) {
    const dialogRef = this.dialog.open(ErrorPopUpComponent, {
      width: '300px',
      data: {message: message}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/auth/login']);
      return false;
    });
  }
}
