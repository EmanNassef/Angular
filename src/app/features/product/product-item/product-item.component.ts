import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/_model/product';
import { ProductService } from 'src/app/_services/product.services';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
 
})
export class ProductItemComponent implements OnInit {

  @Input() product:Product;
  // @Output() itemAdded = new EventEmitter<Product>();
 

  constructor(private productService:ProductService) { 
   
    // this.product = {
    //   id: 1,
    //   name: 'photo camera', 
    //   price: 4000 , 
    //   discount: 500 , 
    //   imgUrl: '../../../../assets/img/desktop-device-1.png',
    // };
  }

  ngOnInit(): void {}

  getPrice():number{
    return this.product.discount ? this.product.price - this.product.discount : this.product.price
  };

  addedToCart():void{
    this.productService.productAdded.emit(this.product);
  }

}
