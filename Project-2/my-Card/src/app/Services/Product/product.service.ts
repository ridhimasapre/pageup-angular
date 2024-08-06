import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductForm } from '../../Interfaces/Product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient :HttpClient) { }
  
  public getProducts():Observable<Product[]>{
    return this.httpclient.get<Product[]>('http://localhost:3000/product')
  }
  public getProductById(id: string | null): Observable<Product> {
    return this.httpclient.get<Product>(`http://localhost:3000/product/${id}`);
  }
  public  addProduct(id:string | null ,data:any){
    return this.httpclient.post('http://localhost:3000/product',data)
  }
 
  public deleteProduct(id: string) {
    return this.httpclient.delete(`http://localhost:3000/product/${id}`);
  }
  public updateProduct(id:string | null, data:any) {
    return this.httpclient.put(`http://localhost:3000/product/${id}`, data);
  }
}

