import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMaterialModule } from 'src/app/common/angular-material.module';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [CommonModule, AngularMaterialModule, FormsModule],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailComponent implements OnInit {
  categoryName: string = '';
  productName: string = '';
  slideConfig = { slidesToShow: 5, slidesToScroll: 5, dots: false, infinite: true };

  listImageProduct: Array<any> = [];

  productDetail: any = {
    "image": "0f7848d98bf74244b3bea6c187b963c9",
    "price": 510000,
    "quantity": 1,
    "product_id": "4023f6791a49491584822a3e2214d84d",
    "image_list": [],
    "product_category_list": [],
    "product_attribute_list": [],
    "product_name": "adsad",
    "description_short": "",
    "description_long": "45664",
    "create_date": "2024-07-11T22:18:28.812856",
    "modify_date": null
  };
  idProduct: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    // if (this.route.snapshot.paramMap.get('id')) {
    //   this.idProduct = this.route.snapshot.paramMap.get('id');
    //   this.productService.getProductsByIds(this.idProduct).subscribe({
    //     next: (value) => {
    //       this.productDetail = value.result_data;
    //       if (this.productDetail.image) {
    //         this.getImageById(this.productDetail.image).then((result) => {
    //           this.productDetail.srcImage = result;
    //         }).catch((error) => {
    //           console.error('Error fetching image:', error);
    //         });
    //       }
    //     },
    //     error: (error: any) => {
    //       ;
    //       alert(error.error.message);
    //     }
    //   })
    // }

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
   * handleAddCart
   */
  public handleAddCart(product:any) {
    let listProduct = JSON.parse(localStorage.getItem('list-product-cart') || '[]');

    const index = listProduct.findIndex((item: any) => item.product_id === product.product_id);
    if (index !== -1) {
      listProduct[index].quantity++;
    }else{
      listProduct = [
        ...listProduct,
        product
      ]
    }

    localStorage.setItem('list-product-cart', JSON.stringify(listProduct));
  }
}
