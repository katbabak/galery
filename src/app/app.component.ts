import { Component, OnInit } from '@angular/core';
import {AuthService} from './components/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';

  constructor(private authService: AuthService) {

  }
  ngOnInit() {
  	if (localStorage.getItem(TOKEN_NAME)) {
  	   this.getUserInfo();
  	}
  }

  getUserInfo() {
    this.authService.getCurrentUserInfo().subscribe();
  }
}

export const TOKEN_NAME = 'id_token_galery';