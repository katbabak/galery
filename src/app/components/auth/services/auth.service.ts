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

  constructor(private http: HttpClient) {
  }

  getTestReq(): Observable<object | HttpErrorResponse> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Accept-Version', 'v1');
    headers = headers.set('Authorization', 'Client-ID 8b1a0d2820a4b078ee45975088d70b04f75bf91d92abdbdd1dc76726e9f3c3bc');

    return this.http.get('https://api.unsplash.com/photos?page=1', {headers})
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

