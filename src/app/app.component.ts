import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TokenService} from './core/authentication/token.service';
import {AuthenticationService} from './core/authentication/authentication.service';
import {LoadingService} from "./core/service/loading.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'promusic';
  constructor(
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    public loadingService: LoadingService
  ) {
    if (
      !!tokenService.getToken() &&
      !!tokenService.getRefreshToken()
    ){
      authenticationService.getUserInfo();
    }
  }
}
