import { Component, Input, OnInit, OnChanges} from '@angular/core';
import { Product } from 'src/app/_model/product';
import { ProductService } from 'src/app/_services/product.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , OnChanges{
  cartArray : Product[] = [];


  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.productAdded.subscribe(
      (res) => {this.cartArray.push(res)},
      (err) => {console.error(err)},
      (completed) => {alert(completed)},
    )
  }
  ngOnChanges(changes){
    // console.log(this.cartArray);
    
  }

  changeCurrentPage(dest: string){
    this.productService.currentPage = dest;
  }


  calculateTotalAmount(): number {
    let total = 0;
    for (let index = 0; index < this.cartArray.length; index++) {
      const product = this.cartArray[index];
      total += product.discount? product.price - product.discount : product.price;
      
    }
    return total;
  }
}
