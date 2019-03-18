import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';
import {Photo} from '../../../models/photo';
import {Router} from '@angular/router';
import {User} from '../../../models/photo';

export const TOKEN_NAME = 'id_token_galery';

enum APIs {
  GET_RANDOM_PHOTO = '/photos/random',
  GET_CURRENT_USER_INFO = 'me',
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
  authorizeRedirectUrl = `https://unsplash.com/oauth/authorize?client_id=${environment.ACCESS_KEY}&redirect_uri=${this.redirect_uri}&response_type=code&scope=public+write_likes+read_user`;

   currentUser: User;
  static isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_NAME);
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getRandomPhoto(): Observable<Photo | HttpErrorResponse> {
    return this.http.get(APIs.GET_RANDOM_PHOTO)
      .pipe(
        map((response: Photo) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
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

  getCurrentUserInfo(): Observable<User|HttpErrorResponse> {
   return this.http.get(APIs.GET_CURRENT_USER_INFO)
   .pipe(
     map((response: User) => {
       this.currentUser = response;
       return response;
     }),
     catchError((error: HttpErrorResponse) => {
          return Observable.throw(error);
        }))
  }

  logOut() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem('scope');
    this.router.navigateByUrl('/auth/login');
  }
}

