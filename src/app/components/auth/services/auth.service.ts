import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

export const TOKEN_NAME = 'id_token_galery';

@Injectable()
export class AuthService {

  static isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_NAME);
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  constructor(private http: HttpClient) {
  }

  getTestReq(): Observable<object | HttpErrorResponse> {

    return this.http.get('/photos?page=1')
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
}

