import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';
import {Photo} from '../../../models/photo';
import {Router} from '@angular/router';

export const TOKEN_NAME = 'id_token_galery';

enum APIs {
  GET_ALL_PHOTOS = 'photos?page=1',
  GET_RANDOM_PHOTO = '/photos/random',
}

export class TokenResponse {
  public access_token: string;
  public token_type: string;
  public scope: string;
  public created_at: Date;
}

@Injectable()
export class AuthService {

  originURL = document.location.origin;
  redirect_uri = encodeURIComponent(this.originURL + '/home');
  authorizeRedirectUrl = `https://unsplash.com/oauth/authorize?client_id=${environment.ACCESS_KEY}&redirect_uri=${this.redirect_uri}&response_type=code&scope=public+write_likes`;

  static isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_NAME);
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getTestReq(): Observable<object | HttpErrorResponse> {

    return this.http.get(APIs.GET_ALL_PHOTOS)
      .pipe(
        map((response: any) => {
          console.warn(response);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          throw error;
        })
      );
  }

  getRandomPhoto(): Observable<Photo | HttpErrorResponse> {
    return this.http.get(APIs.GET_RANDOM_PHOTO)
      .pipe(
        map((response: Photo) => {
          console.warn(response);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return Observable.throw(error);
        })
      );
  }

  getToken(code: string): Observable<TokenResponse | HttpErrorResponse> {
    let params: HttpParams = new HttpParams();
    params = params
      .set('client_id', environment.ACCESS_KEY.toString())
      .set('client_secret', environment.SECRET_KEY)
      .set('redirect_uri', this.originURL + '/home')
      .set('code', code.toString())
      .set('grant_type', 'authorization_code');
    return this.http.post('https://unsplash.com/oauth/token', null, {params: params})
      .pipe(
        map((response: TokenResponse) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          return Observable.throw(error);
        })
      );
  }

  logOut() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem('scope');
    this.router.navigateByUrl('/auth/login');
  }
}

