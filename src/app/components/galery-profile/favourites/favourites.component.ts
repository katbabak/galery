import { Component, OnInit } from '@angular/core';
import { GaleryService } from '../galery.service';
import { AuthService} from '../../auth/services/auth.service';
import { Photo } from '../../../models/photo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

 pageNumber = 1;
 photosPerPage = 10;
 photosArray: Photo[] = [];

  constructor(private galeryService: GaleryService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  	if (!this.authService.currentUser) {
      this.router.navigateByUrl('/home');
      return;
  	}
  	this.getCollection(this.pageNumber, this.photosPerPage);

  }

getCollection(pageNumber, photosPerPage) {
	  this.galeryService.getCollection(pageNumber, photosPerPage)
       .subscribe(
  	      (response: Photo[]) => {
  		    this.photosArray = this.photosArray.concat(response);
  	});
}
  onScroll() {
    this.pageNumber++;
    this.getCollection(this.pageNumber, this.photosPerPage);
  }
}
