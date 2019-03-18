import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../../../models/photo';
import { GaleryService } from '../galery.service';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.css']
})
export class PhotoItemComponent implements OnInit {

  @Input() photo: Photo;

  constructor(private galeryService: GaleryService) { }

  ngOnInit() {
  }

  likeOrDislikePhoto() {
  	if (this.photo.liked_by_user) {
  		this.dislikePhoto(this.photo.id);
  	} else {
  		this.likePhoto(this.photo.id);
  	}
  }

  likePhoto(photoId: string) {
   this.galeryService.likePhoto(photoId)
   .subscribe(
   	(res: Photo) => {
   		console.log(res);
   		this.photo = res;
   	})
  }

  dislikePhoto(photoId: string) {
  this.galeryService.dislikePhoto(photoId)
   .subscribe(
   	(res: Photo) => {
   		console.log(res);
   		this.photo = res;
   	})
  }

}
