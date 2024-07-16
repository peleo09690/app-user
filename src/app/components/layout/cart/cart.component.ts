import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public listProduct:any;

  constructor(
    private router: Router,
    private productService: ProductService
  ) {

  }
  ngOnInit(): void {
    this.listProduct = JSON.parse(localStorage.getItem('list-product-cart') || '[]');
    if (this.listProduct.length >0){
      this.listProduct.forEach((x: any) => {
        if (x.image) {
          this.getImageById(x.image).then((result) => {
            x.srcImage = result;
          }).catch((error) => {
            console.error('Error fetching image:', error);
          });
        }
      })
    }
  }

  getImageById(file_id: string): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      this.productService.getOriginalImage(file_id).subscribe({
        next: (imageBlob) => {
          if (imageBlob) {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result);

            };
            reader.onerror = () => {
              reject(new Error('Failed to read the file'));
            };
            reader.readAsDataURL(imageBlob);
          } else {
            reject(new Error('No image blob received'));
          }
        },
        error: (error) => {
          reject(error);
        }
      });
    });
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
    const index = this.listProduct.findIndex((item: any) => item.product_id === productDetail.product_id);
    if (index !== -1) {
      this.listProduct[index].quantity +1;
    }
    localStorage.setItem('list-product-cart', JSON.stringify(this.listProduct));

  }

  /**
 * handleMinusQuantity
 */
  public handleMinusQuantity(productDetail:any) {
    if (productDetail.quantity> 1){
      productDetail.quantity -= 1
      const index = this.listProduct.findIndex((item: any) => item.product_id === productDetail.product_id);
      if (index !== -1) {
        this.listProduct[index].quantity-1;
      }
      localStorage.setItem('list-product-cart', JSON.stringify(this.listProduct));
    }
  }

  /**
   * handleRouterProduct
   */
  public handleRouterProduct(productId:any) {
    this.router.navigate(['/products', productId]);
  }
}
