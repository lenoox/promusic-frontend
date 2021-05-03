import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {ProductService} from '../../../core/service/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  productList: any = [];
  categoryName;
  categorySlug;
  page = 1;
  sizePage = 10;
  totalElements = 0;
  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadProductSubscribe();
  }
  loadProductSubscribe(): void{
    this.route.params.subscribe(res => {
      this.page = 1;
      this.categorySlug = res.slug;
      this.loadProduct();
    });
  }
  loadProduct(): void{
    this.productService.GetProductsByCategory(this.categorySlug, this.page, this.sizePage).subscribe((data) => {
      this.productList = data.content;
      this.categoryName = data.content[0].category.name;
      this.totalElements = data.totalElements;
    });
  }
}
