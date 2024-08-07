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
export class ProductComponent implements OnInit, OnChanges {

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
    "price_to": "0",
    "price_from": "0",
    "product_name": "",
    "product_code": "",
    "page_number": 1,
    "page_size": 2,
    "sort_by": "",
    "sort_direction": "asc"
  }
  paramArticle = {
    "category_id": "",
    "article_name": "",
    "status": "",
    "page_number": "1",
    "page_size": 5,
    "sort_by": "",
    "sort_direction": "desc"
  }
  inputSearchCategory = '';
  inputSearchTrademark = '';
  filteredCategories: any = [];
  filteredTrademark: any = [];
  listPosts: any = []
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
      this.paramArticle.category_id = this.paramsSearchWithCategory.category_id;
      //get article
    }
  }
  query = '';
  private querySub?: Subscription;
  ngOnInit() {
    this.searchMin = this.priceRange.min;
    this.searchMax = this.priceRange.max;
    this.querySub = this.route.queryParams.subscribe(params => {
      this.params.product_name = params['productName'];
      this.paramsSearchWithCategory.category_id = params['categoryId']
    });
    if (this.params.product_name) {
      this.onSearchProduct();
    } else if (this.paramsSearchWithCategory.category_id) {
      this.onSearchProductByCategory();
      this.paramArticle.category_id = this.paramsSearchWithCategory.category_id;
      //get article
      this.getListPostsByCategory()
    }

  }

  ngOnDestroy() {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

  applyPriceRange() {
    this.paramsSearchWithCategory.price_from = this.searchMin.toString();
    this.paramsSearchWithCategory.price_to = this.searchMax.toString();
    this.getProductByCategoryWithPrice();
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

            let prices = valueAll.result_data.list_product.map((product: any) => product.price);
            this.priceRange.min = this.searchMin = Math.min(...prices);
            this.priceRange.max = this.searchMax = Math.max(...prices);
          }
        }),
          this.products = value.result_data.list_product;
        this.totalRecords = value.result_data.total_records;
        if (this.products?.length > 0) {
          this.products.forEach((x: any) => {
            if (x.image) {
              this.getImageById(x.image).then((result) => {
                x.srcImage = result;
              }).catch((error) => {
                console.error('Error fetching image:', error);
              });
            }
          })
        }
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
        if (value.result_data?.list_product) {
          paramsAll.page_size = value.result_data.total_records;
          this.productService.getProductsAllByCategory(paramsAll).subscribe({
            next: (valueAll) => {
              this.listCategoryChild = this.getUniqueCategories(valueAll.result_data.list_product);
              this.listTrademarkChild = this.getUniqueAttribute(valueAll.result_data.list_product);
              this.filteredCategories = [...this.listCategoryChild];
              this.filteredTrademark = [...this.listTrademarkChild];

              let prices = valueAll.result_data.list_product.map((product: any) => product.price);
              this.priceRange.min = this.searchMin = Math.min(...prices);
              this.priceRange.max = this.searchMax = Math.max(...prices);
            }
          })
        }

        this.products = value.result_data.list_product;
        this.totalRecords = value.result_data.total_records;
        if (this.products?.length > 0) {
          this.products.forEach((x: any) => {
            if (x.image) {
              this.getImageById(x.image).then((result) => {
                x.srcImage = result;
              }).catch((error) => {
                console.error('Error fetching image:', error);
              });
            }
          })
        }
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
    if (this.params.product_name) {
      this.params.page_number = page;
      this.params.page_size = this.pageSize;
      this.onSearchProduct();
    } else if (this.paramsSearchWithCategory.category_id) {
      this.paramsSearchWithCategory.page_number = page;
      this.paramsSearchWithCategory.page_size = this.pageSize;
      this.onSearchProductByCategory();
    }

  }
  activeButtonSort(index: number) {
    switch (index) {
      case 0:
        this.activeButton = "default";
        this.params.sort_by = "productName";
        this.params.sort_direction = "asc";
        if (this.params.product_name) {
          this.onSearchProduct();
        } else if (this.paramsSearchWithCategory.category_id) {
          this.onSearchProductByCategory();
          this.paramArticle.category_id = this.paramsSearchWithCategory.category_id;
          //get article
        }
        break;
      case 1:
        this.activeButton = "hight-price";
        if (this.params.product_name) {
          this.params.sort_by = "price";
          this.params.sort_direction = "desc";
          this.onSearchProduct();
        } else if (this.paramsSearchWithCategory.category_id) {
          this.paramsSearchWithCategory.sort_by = "price";
          this.paramsSearchWithCategory.sort_direction = "desc";
          this.onSearchProductByCategory();
        }
        break;
      case 2:
        this.activeButton = "low-price";
        if (this.params.product_name) {
          this.params.sort_by = "price";
          this.params.sort_direction = "asc";
          this.onSearchProduct();
        } else if (this.paramsSearchWithCategory.category_id) {
          this.paramsSearchWithCategory.sort_by = "price";
          this.paramsSearchWithCategory.sort_direction = "asc";
          this.onSearchProductByCategory();
        }
        break;
      case 3:
        this.activeButton = "name";
        if (this.params.product_name) {
          this.params.sort_by = "productName";
          this.params.sort_direction = "asc";
          this.onSearchProduct();
        } else if (this.paramsSearchWithCategory.category_id) {
          this.paramsSearchWithCategory.sort_by = "productName";
          this.paramsSearchWithCategory.sort_direction = "asc";
          this.onSearchProductByCategory();
        }
        break;

      default:
        break;
    }
  }
  getUniqueCategories(data: any[]): any[] {
    const uniqueCategories: any[] = [];
    const uniqueCategoryNames: string[] = [];
    if (data.length > 0) {
      data.forEach(product => {
        if (product?.product_category_list?.length > 0) {
          product.product_category_list.forEach((category: any) => {
            if (!uniqueCategoryNames.includes(category.category_name)) {
              uniqueCategoryNames.push(category.category_name);
              uniqueCategories.push(category);
            }
          });
        }
      });
    }

    return uniqueCategories;
  }

  getUniqueAttribute(data: any[]): any[] {
    const uniqueAttribute: any[] = [];
    const uniqueAttributeName: string[] = [];
    if (data.length > 0) {
      data.forEach(product => {
        if (product?.product_attribute_list?.length > 0) {
          product.product_attribute_list.forEach((attribute: any) => {
            if (!uniqueAttributeName.includes(attribute.attribute_name)) {
              uniqueAttributeName.push(attribute.attribute_name);
              uniqueAttribute.push(attribute);
            }
          });
        }

      });
    }

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
    this.router.navigate(['/product/' + product.product_id]).then(() => {
      window.location.reload(); // Reload trang sau khi navigation
    });
  }

  getListPostsByCategory() {
    this.productService.getAllArticleByCategory(this.paramArticle).subscribe({
      next: (value) => {
        this.listPosts = value.result_data.list_article;
        if (this.listPosts?.length > 0) {
          this.listPosts.forEach((x: any) => {
            if (x.image) {
              this.getImageById(x.image).then((result) => {
                x.srcImage = result;
              }).catch((error) => {
                console.error('Error fetching image:', error);
              });
            }
          })
        }
      },
      error: (error: any) => {
        ;
        alert(error.error.message);
      }
    })
  }
  showMorePost() {
    this.paramArticle.page_size += this.paramArticle.page_size;
    this.getListPostsByCategory();
  }

  getProductByCategoryWithPrice() {
    this.productService.getProductsAllByCategoryWithPrice(this.paramsSearchWithCategory).subscribe({
      next: (value) => {
        this.products = value.result_data.list_product;
        this.totalRecords = value.result_data.total_records;
        if (this.products?.length > 0) {
          this.products.forEach((x: any) => {
            if (x.image) {
              this.getImageById(x.image).then((result) => {
                x.srcImage = result;
              }).catch((error) => {
                console.error('Error fetching image:', error);
              });
            }
          })
        }
      },
      error: (error: any) => {
        ;
        alert(error.error.message);
      }
    })
  }
}
