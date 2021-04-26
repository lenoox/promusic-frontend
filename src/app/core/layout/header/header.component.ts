import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../authentication/authentication.service';
import {CartLocalStorageService} from '../../service/cart-local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed = true;
  categoryMenu: any = [];
  constructor(
    private categoryService: CategoryService,
    private cartLocalStorageService: CartLocalStorageService,
    private authenticationService: AuthenticationService
  ) {
  }
  ngOnInit(): void {
    this.loadMenu();
  }
  loadMenu(): Subscription {
    return this.categoryService.GetCategorys().subscribe((data: {}) => {
      this.categoryMenu = data;
    });
  }
  logout(): void {
    this.authenticationService.logout();
  }
  isEmployee(): boolean{
    return this.authenticationService.isEmployee();
  }
  isClient(): boolean{
    return this.authenticationService.isClient();
  }
  isAuthorized(): boolean{
    return this.authenticationService.isAuthorized();
  }
  showSizeProducts(): number{
    return this.cartLocalStorageService.showSizeProducts();
  }
}
