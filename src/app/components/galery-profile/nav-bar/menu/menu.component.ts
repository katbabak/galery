import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  logOut() {
  	this.authService.logOut();
  }

}
