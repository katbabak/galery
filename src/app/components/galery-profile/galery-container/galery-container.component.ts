import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-galery-container',
  templateUrl: './galery-container.component.html',
  styleUrls: ['./galery-container.component.css']
})
export class GaleryContainerComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }
}
