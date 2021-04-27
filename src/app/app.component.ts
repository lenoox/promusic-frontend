import {Component} from '@angular/core';
import {TokenService} from './core/authentication/token.service';
import {AuthenticationService} from './core/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'promusic';
  constructor(
    private authenticationService: AuthenticationService,
    private tokenService: TokenService
  ) {
    if (
      !!tokenService.getToken() &&
      !!tokenService.getRefreshToken()
    ){
      authenticationService.getUserInfo();
    }
  }
}
