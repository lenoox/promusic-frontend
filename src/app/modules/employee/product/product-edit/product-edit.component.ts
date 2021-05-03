import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../../shared/model/category';
import {Brand} from '../../../../shared/model/brand';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductService} from '../../../../core/service/product.service';
import {CategoryService} from '../../../../core/service/category.service';
import {BrandService} from '../../../../core/service/brand.service';
import {Product} from '../../../../shared/model/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  id;
  editMode = false;
  responseMessage;
  categoryList: Category;
  brandList: Brand;


  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public productService: ProductService,
    public categoryService: CategoryService,
    public brandService: BrandService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
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
      console.log('error brandList');
    });
  }
  onSubmit(): void{
    if (this.editMode) {
      this.productService.UpdateProduct(this.id, this.productForm.value).subscribe(resp => {
        if (resp.status === 200){
          this.responseMessage = true;
        }
      }, err => {
        this.responseMessage = false;
      });
    } else {
      this.productService.CreateProduct(this.productForm.value).subscribe(resp => {
        if (resp.status === 200){
          this.responseMessage = true;
        }
      }, err => {
        this.responseMessage = false;
      });
    }
  }
  get getControl(): { [p: string]: AbstractControl }{
    return this.productForm.controls;
  }


  private initForm() {
    if (this.editMode) {
      return this.productService.GetProduct(this.id).subscribe((data: Product) => {
        this.productForm.patchValue(data);
      });
    }
  }
}
