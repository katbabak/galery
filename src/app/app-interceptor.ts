import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent
} from '@angular/common/http';
import {AuthService} from './components/auth/services/auth.service';
import {environment} from '../environments/environment';
import {catchError} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ErrorPopUpComponent} from './pop-ups/error-pop-up/error-pop-up.component';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  readonly url = environment.API_BASE_URL;
  readonly access_key = environment.ACCESS_KEY;

  constructor(private dialog: MatDialog,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent |
    HttpResponse<any> | HttpUserEvent<any>> {
    return next.handle(this.addTokenAndHeaders(req, AuthService.getToken()))
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
                this.openErrorPopUp(error);
                return Observable.throw(error);
          } else {
            throw  error;
          }
        })
      );
  }

  private addTokenAndHeaders(req: HttpRequest<any>, token: string) {
    req = req.clone({
      url: (req.url.indexOf('oauth/token') > -1) ? req.url : this.url + req.url,
      headers: req.headers
        .set('Accept-Version', 'v1')
    });
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
    } else {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Client-ID ' + this.access_key)
      });
    }
    return req;
  }

  private handle401Error(error: HttpErrorResponse) {
    this.openErrorPopUp(error);
    return Observable.throw(error);
  }

  openErrorPopUp(error: HttpErrorResponse) {
    const dialogRef = this.dialog.open(ErrorPopUpComponent, {
      width: '300px',
      data: {message: error.error.error_description}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
