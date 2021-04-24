import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProductService} from '../../../core/service/product.service';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit  {
  productList: any = [];
  pathUploads;
  categoryName;
  categorySlug;
  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
    this.pathUploads = environment.pathUploads;
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void{
    this.route.params.subscribe(res => {
      this.categorySlug = res.slug;
      this.productService.GetProducts(this.categorySlug).subscribe((data: {}) => {
        this.productList = data;
        this.categoryName = data[0].category.name;
      });
    });
  }
}
