import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../../core/service/product.service';
import {CategoryService} from '../../../../core/service/category.service';
import {Category} from '../../../../shared/model/category';
import {Brand} from '../../../../shared/model/brand';
import {BrandService} from '../../../../core/service/brand.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  responseMessage;
  categoryList: Category;
  brandList: Brand;
  constructor(
    public formBuilder: FormBuilder,
    public productService: ProductService,
    public categoryService: CategoryService,
    public brandService: BrandService,
  ) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]],
      category: this.formBuilder.group({
        id:  ['', [Validators.required]],
      }),
      brand: this.formBuilder.group({
        id:  ['', [Validators.required]],
      }),
      eanCode: ['', [Validators.required]],
    });
    this.categoryService.GetCategorys().subscribe(resp => {
        this.categoryList = resp;
    }, err => {
     console.log('error categoryList');
    });
    this.brandService.GetBrands().subscribe(resp => {
        this.brandList = resp;
    }, err => {
     console.log('error categoryList');
    });
  }
  onSubmit(): void{
    this.productService.CreateProduct(this.productForm.value).subscribe(resp => {
      if (resp.status === 200){
        console.log(resp);
        console.log(resp.status);
        console.log(resp.body);
        this.responseMessage = true;
      }
    }, err => {
      this.responseMessage = false;
    });
  }
  get getControl(): { [p: string]: AbstractControl }{
    return this.productForm.controls;
  }
}
