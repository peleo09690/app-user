import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { UpdateProductDTO } from '../dtos/product/update.product.dto';
import { InsertProductDTO } from '../dtos/product/insert.product.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getProducts(
    keyword: string,
    categoryId: number,
    page: number,
    limit: number
  ): Observable<Product[]> {
    const params = {
      keyword: keyword,
      category_id: categoryId.toString(),
      page: page.toString(),
      limit: limit.toString()
    };
    return this.http.get<Product[]>(`${this.apiBaseUrl}/products`, { params });
  }

  getDetailProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiBaseUrl}/products/${productId}`);
  }

  getProductsByIds(productIds: any): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/un_auth/product/`+productIds);
  }

  deleteProduct(productId: number): Observable<string> {
    
    return this.http.delete<string>(`${this.apiBaseUrl}/products/${productId}`);
  }
  updateProduct(productId: number, updatedProduct: UpdateProductDTO): Observable<UpdateProductDTO> {
    return this.http.put<Product>(`${this.apiBaseUrl}/products/${productId}`, updatedProduct);
  }
  insertProduct(insertProductDTO: InsertProductDTO): Observable<any> {
    // Add a new product
    return this.http.post(`${this.apiBaseUrl}/products`, insertProductDTO);
  }
  uploadImages(productId: number, files: File[]): Observable<any> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    // Upload images for the specified product id
    return this.http.post(`${this.apiBaseUrl}/products/uploads/${productId}`, formData);
  }
  deleteProductImage(id: number): Observable<any> {
    
    return this.http.delete<string>(`${this.apiBaseUrl}/product_images/${id}`);
  }

  getProductsAll(params:any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/un_auth/product/get_all_product`, params);
  }
  getOriginalImage(fileId: string): Observable<Blob> {
    const url = `${this.apiBaseUrl}/un_auth/files/download/original/${fileId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getProductsAllByCategory(params:any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/un_auth/product/category/get_type_all_product`, params);
  }
  // localhost:8083/api/v1/un_auth/article/category/get_all_article_category
  getAllArticleByCategory(params:any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/un_auth/article/category/get_all_article_category`, params);
  }
  getProductsAllByCategoryWithPrice(params:any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/un_auth/product/category/get_type_all_product_price`, params);
  }
  getListFileImageByType(type:any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/un_auth/files/get_info_file_type`, type);
  }
}
//update.category.admin.component.html