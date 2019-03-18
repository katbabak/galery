import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Photo} from '../../models/photo';

enum APIs {
	GET_PHOTOS = '/photos',
	LIKE_OR_DISLIKE_PHOTO = '/photos/:id/like',
}

@Injectable()
export class GaleryService {
	constructor(private http: HttpClient) {}


getPhotos(pageNumber: number, photosPerPage: number): Observable<Photo[] | HttpErrorResponse> {
let params: HttpParams = new HttpParams();
params = params
     .set('page', pageNumber.toString())
     .set('per_page', photosPerPage.toString());

     return this.http.get(APIs.GET_PHOTOS, {params: params})
     .pipe(
       map(response => {
       	console.warn(response);
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
 			console.dir(response);
 			return response;
 		}),
 		catchError((error: HttpErrorResponse) => {
 			return Observable.throw(error);
 		}));
 }

 dislikePhoto(photoId: string): Observable<any> {
    const urlWithId = APIs.LIKE_OR_DISLIKE_PHOTO.replace(/:id/, photoId);
 	  return this.http.post(urlWithId, null)
 	    .pipe(
 		  map((response) => {
 			console.dir(response);
 			return response;
 		  }),
 		  catchError((error: HttpErrorResponse) => {
 			return Observable.throw(error);
 		  }));
   }

}