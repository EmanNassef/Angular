import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentType } from 'src/app/_model/payment-type';
import { Product } from 'src/app/_model/product';
import { ProductCategory } from 'src/app/_model/product-category';
import { PaymentTypeService } from 'src/app/_services/payment-type.service';
import { ProductCategoryService } from 'src/app/_services/product-category';
import { ProductService } from 'src/app/_services/product.services';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  product: Product = { data: [{}], paymentTypes:[{}], tags:[], category:{}};
  paymentTypes: PaymentType[] = [];
  productCategory: ProductCategory[] = [];
  editMode: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentTypeService: PaymentTypeService, 
    private productCategoryService:ProductCategoryService,
    private productService: ProductService,
    private router : Router
    ) {}

  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.url[1].path);
    this.editMode = 
    this.activatedRoute.snapshot.url[1] && 
    this.activatedRoute.snapshot.url[1].path === 'edit' && 
    true;
    if (this.editMode) {
      const id = this.activatedRoute.snapshot.params.id;
      this.product = this.productService.getProductById(+id);
    }
    
     
    this.paymentTypes = this.paymentTypeService.getAllPayments();
    this.productCategory = this.productCategoryService.getAllProductCategory();
  }

  onSubmit(form){
    // for (let index = 0; index < this.paymentTypes.length; index++) {
    //   if(form.value['check_'+index]){
    //     this.product.paymentTypes.push(this.paymentTypes[index])
    //   }

    // }
    // console.log(this.product);
    this.productService.addProduct(this.product).subscribe(
      (response) => {console.log(response);
      this.router.navigate(['/product','listing']);
      },
      (err) => {console.log(err);
      },
      () => {},

    );
  }

  onTagAdded(tagInput){
    this.product.tags.push({name: tagInput.value});
    tagInput.value = "";
  }
}
