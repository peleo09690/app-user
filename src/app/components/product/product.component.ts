import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { AngularMaterialModule } from 'src/app/common/angular-material.module';
import { PaginationComponent } from 'src/app/common/pagination/pagination.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [CommonModule, AngularMaterialModule, FormsModule, PaginationComponent],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductComponent implements OnInit,OnChanges {

  categoryName: string = '';
  productName: string = '';
  listCategoryChild: Array<any> = [{ name: "sữa rửa mặt" }, { name: "mặt nạ" }]
  listTrademarkChild: Array<any> = [{ name: "sữa rửa mặt" }, { name: "mặt nạ" }]
  priceRange = { min: 834227, max: 22008000 };
  searchMin = 0;
  searchMax = 0;
  textSearchProduct = "";
  nameCategory = "Sản phẩm"
  products: any = [];
  totalRecords = 0;
  pageSize = 2;
  activeButton = "default"
  params = {
    "product_name": "",
    "product_code": "",
    "page_number": 1,
    "page_size": 2,
    "sort_by": "productName",
    "sort_direction": "asc"
  }

  paramsSearchWithCategory = {
    "category_id": "",
    "product_name": "",
    "product_code": "",
    "page_number": "1",
    "page_size": "2",
    "sort_by": "",
    "sort_direction": "asc"
  }
  inputSearchCategory = '';
  inputSearchTrademark = '';
  filteredCategories: any = [];
  filteredTrademark: any = [];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.route.queryParams.subscribe(params => {
      this.params.product_name = params['productName'];
      this.paramsSearchWithCategory.category_id = params['categoryId']
    });
    if (this.params.product_name) {
      this.onSearchProduct();
    } else if (this.paramsSearchWithCategory.category_id) {
      this.onSearchProductByCategory();
    }
  }
  query = '';
  private querySub?: Subscription;
  ngOnInit() {
    this.searchMin = this.priceRange.min;
    this.searchMax = this.priceRange.max;
   this.querySub =  this.route.queryParams.subscribe(params => {
      this.params.product_name = params['productName'];
      this.paramsSearchWithCategory.category_id = params['categoryId']
    });
    if (this.params.product_name) {
      this.onSearchProduct();
    } else if (this.paramsSearchWithCategory.category_id) {
      this.onSearchProductByCategory();
    }

  }

  ngOnDestroy() {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

  applyPriceRange() {
    // logic to apply the price range
  }

  onSearchProduct() {

    this.productService.getProductsAll(this.params).subscribe({
      next: (value) => {

        let paramsAll = { ...this.params };
        paramsAll.page_size = value.result_data.total_records;
        this.productService.getProductsAll(paramsAll).subscribe({
          next: (valueAll) => {
            this.listCategoryChild = this.getUniqueCategories(valueAll.result_data.list_product);
            this.listTrademarkChild = this.getUniqueAttribute(valueAll.result_data.list_product);
            this.filteredCategories = [...this.listCategoryChild];
            this.filteredTrademark = [...this.listTrademarkChild];
            console.log(this.listTrademarkChild);
          }
        }),
          this.products = value.result_data.list_product;
        this.totalRecords = value.result_data.total_records;
        this.products.forEach((x: any) => {
          if (x.image) {
            this.getImageById(x.image).then((result) => {
              x.srcImage = result;
            }).catch((error) => {
              console.error('Error fetching image:', error);
            });
          }
        })

      },
      error: (error: any) => {
        ;
        alert(error.error.message);
      }
    })
  }

  onSearchProductByCategory() {
    this.productService.getProductsAllByCategory(this.paramsSearchWithCategory).subscribe({
      next: (value) => {

        let paramsAll = { ...this.paramsSearchWithCategory };
        paramsAll.page_size = value.result_data.total_records;
        this.productService.getProductsAllByCategory(paramsAll).subscribe({
          next: (valueAll) => {
            this.listCategoryChild = this.getUniqueCategories(valueAll.result_data.list_product);
            this.listTrademarkChild = this.getUniqueAttribute(valueAll.result_data.list_product);
            this.filteredCategories = [...this.listCategoryChild];
            this.filteredTrademark = [...this.listTrademarkChild];
            console.log(this.listTrademarkChild);
          }
        }),
          this.products = value.result_data.list_product;
        this.totalRecords = value.result_data.total_records;
        this.products.forEach((x: any) => {
          if (x.image) {
            this.getImageById(x.image).then((result) => {
              x.srcImage = result;
            }).catch((error) => {
              console.error('Error fetching image:', error);
            });
          }
        })

      },
      error: (error: any) => {
        ;
        alert(error.error.message);
      }
    })
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
  onPageChanged(page: number): void {
    this.params.page_number = page;
    this.params.page_size = this.pageSize;
    this.productService.getProductsAll(this.params).subscribe({
      next: (value) => {
        let paramsAll = { ...this.params };
        paramsAll.page_size = value.result_data.total_records;
        this.productService.getProductsAll(paramsAll).subscribe({
          next: (valueAll) => {
            this.listCategoryChild = this.getUniqueCategories(valueAll.result_data.list_product);
            this.listTrademarkChild = this.getUniqueAttribute(valueAll.result_data.list_product);
            this.filteredCategories = [...this.listCategoryChild];
            this.filteredTrademark = [...this.listTrademarkChild];
            console.log(this.listTrademarkChild);
          }
        }),
          this.products = value.result_data.list_product;
        this.totalRecords = value.result_data.total_records;
        this.pageSize = value.result_data.page_size
        this.products.forEach((x: any) => {
          if (x.image) {
            this.getImageById(x.image).then((result) => {
              x.srcImage = result;
            }).catch((error) => {
              console.error('Error fetching image:', error);
            });
          }
        })

      },
      error: (error: any) => {
        ;
        alert(error.error.message);
      }
    })
  }
  activeButtonSort(index: number) {
    switch (index) {
      case 0:
        this.activeButton = "default";
        this.params.sort_by = "productName";
        this.params.sort_direction = "asc";
        this.onSearchProduct();
        break;
      case 1:
        this.activeButton = "hight-price";
        this.params.sort_by = "price";
        this.params.sort_direction = "desc";
        this.onSearchProduct();
        break;
      case 2:
        this.activeButton = "low-price";
        this.params.sort_by = "price";
        this.params.sort_direction = "asc";
        this.onSearchProduct();
        break;
      case 3:
        this.activeButton = "name";
        this.params.sort_by = "productName";
        this.params.sort_direction = "asc";
        this.onSearchProduct();
        break;

      default:
        break;
    }
  }
  getUniqueCategories(data: any[]): any[] {
    const uniqueCategories: any[] = [];
    const uniqueCategoryNames: string[] = [];
    data.forEach(product => {
      product.product_category_list.forEach((category: any) => {
        if (!uniqueCategoryNames.includes(category.category_name)) {
          uniqueCategoryNames.push(category.category_name);
          uniqueCategories.push(category);
        }
      });
    });
    return uniqueCategories;
  }

  getUniqueAttribute(data: any[]): any[] {
    const uniqueAttribute: any[] = [];
    const uniqueAttributeName: string[] = [];
    data.forEach(product => {
      product.product_attribute_list.forEach((attribute: any) => {
        if (!uniqueAttributeName.includes(attribute.attribute_name)) {
          uniqueAttributeName.push(attribute.attribute_name);
          uniqueAttribute.push(attribute);
        }
      });
    });
    return uniqueAttribute;
  }

  searchCategoryProduct() {
    this.filteredCategories = this.listCategoryChild.filter(category =>
      category.category_name.toLowerCase().includes(this.inputSearchCategory.toLowerCase())
    );
  }

  searchTrademarkProduct() {
    this.filteredTrademark = this.listTrademarkChild.filter(trademark =>
      trademark.attribute_name.toLowerCase().includes(this.inputSearchTrademark.toLowerCase())
    );
  }

  routerLinkProduct(product: any) {
    this.router.navigate(['/product/'+ product.product_id]).then(() => {
      window.location.reload(); // Reload trang sau khi navigation
    });
  }
}
