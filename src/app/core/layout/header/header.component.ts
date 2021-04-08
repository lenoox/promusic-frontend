import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../shared/service/category.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed = true;
  categoryMenu: any = [];
  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.loadMenu();
  }
  loadMenu(): Subscription {
    return this.categoryService.GetCategorys().subscribe((data: {}) => {
      this.categoryMenu = data;
    });
  }
}
