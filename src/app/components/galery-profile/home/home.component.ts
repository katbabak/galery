import { Component, OnInit } from '@angular/core';
import { GaleryService } from '../galery.service';
import { Photo } from '../../../models/photo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageNumber = 1;
  photosPerPage = 20;
  photosArray: Photo[] = [];

  constructor(private galeryService: GaleryService) { }

  ngOnInit() {
  	this.getPhotos(this.pageNumber, this.photosPerPage);
  }

  getPhotos(pageNumber: number, photosPerPage: number) {
  this.galeryService.getPhotos(pageNumber, photosPerPage)
  .subscribe(
  	(response: Photo[]) => {
  		this.photosArray = this.photosArray.concat(response);
  	});
  }

  onScroll() {
    this.pageNumber++;
    this.getPhotos(this.pageNumber, this.photosPerPage);
  }

}
