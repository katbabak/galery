import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Photo} from '../../../models/photo';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private photo: Photo;
  backgroundImageUrl: SafeStyle;

  constructor(private authService: AuthService,
              private _sanitazer: DomSanitizer) {
  }

  ngOnInit() {
    this.getRandomPhotoForBackground();
  }

  getRandomPhotoForBackground() {
    this.authService.getRandomPhoto()
      .subscribe(
        ((response: Photo) => {
          this.photo = response;
          const customizedPhoto = this.photo.urls.raw + '&w=1500&dpi=2';
          this.backgroundImageUrl = this._sanitazer.bypassSecurityTrustStyle(`url(${customizedPhoto})`);
        })
      );
  }

}
