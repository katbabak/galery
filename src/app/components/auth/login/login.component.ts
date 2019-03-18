import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService) {
  }

  ngOnInit() {

  }
}
