import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Photo} from '../../models/photo';
import {AuthService} from '../auth/services/auth.service';

enum APIs {
	GET_PHOTOS = 'photos',
	LIKE_OR_DISLIKE_PHOTO = 'photos/:id/like',
	GET_COLLECTIONS = 'users/:username/likes',
}

@Injectable()
export class GaleryService {

	constructor(private http: HttpClient,
		private authService: AuthService) {}


getPhotos(pageNumber: number, photosPerPage: number): Observable<Photo[] | HttpErrorResponse> {
let params: HttpParams = new HttpParams();
params = params
     .set('page', pageNumber.toString())
     .set('per_page', photosPerPage.toString());

     return this.http.get(APIs.GET_PHOTOS, {params: params})
     .pipe(
       map((response: Photo[]) => {
       	return response;
       }),
       catchError((error: HttpErrorResponse) => {
       	return Observable.throw(error);
       }));
 }

getCollection(pageNumber: number, photosPerPage: number): Observable<Photo[] | HttpErrorResponse> {
const urlWithUserName = APIs.GET_COLLECTIONS.replace(/:username/, this.authService.currentUser.username);
let params: HttpParams = new HttpParams();
params = params
     .set('page', pageNumber.toString())
     .set('per_page', photosPerPage.toString())
     .set('order_by', 'updated');

     return this.http.get(urlWithUserName, {params: params})
     .pipe(
       map((response: Photo[]) => {
       	return response;
       }),
       catchError((error: HttpErrorResponse) => {
       	return Observable.throw(error);
       }));
 }

 likePhoto(photoId: string): Observable<Photo | HttpErrorResponse> {
 	const urlWithId = APIs.LIKE_OR_DISLIKE_PHOTO.replace(/:id/, photoId);
 	return this.http.post(urlWithId, null)
 	.pipe(
 		map((response: Photo) => {
 			return response;
 		}),
 		catchError((error: HttpErrorResponse) => {
 			return Observable.throw(error);
 		}));
 }

 dislikePhoto(photoId: string): Observable<any> {
    const urlWithId = APIs.LIKE_OR_DISLIKE_PHOTO.replace(/:id/, photoId);
 	  return this.http.delete(urlWithId)
 	    .pipe(
 		  map((response) => {
 			return response;
 		  }),
 		  catchError((error: HttpErrorResponse) => {
 			return Observable.throw(error);
 		  }));
   }

}