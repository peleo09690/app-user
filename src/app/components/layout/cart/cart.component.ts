import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public listProduct:any;

  constructor(
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    this.listProduct = JSON.parse(localStorage.getItem('list-product-cart') || '[]');

  }

  /**
   * handleTotalPrice
   */
  public handleTotalPrice() {
    return this.listProduct.reduceRight((total: any, item: any) => total + (item.price * item.quantity), 0);

  }

  /**
   * handlePlusQuantity
   */
  public handlePlusQuantity(productDetail:any) {
    productDetail.quantity +=1
  }

  /**
 * handleMinusQuantity
 */
  public handleMinusQuantity(productDetail:any) {
    if (productDetail.quantity> 1){
      productDetail.quantity -= 1
    }
  }

  /**
   * handleRouterProduct
   */
  public handleRouterProduct(productId:any) {
    this.router.navigate(['/products', productId]);
  }
}
