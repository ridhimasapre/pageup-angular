import { Injectable } from '@angular/core';
import { Category, SubCategory } from '../../Interfaces/Category/Category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('http://localhost:3000/category');
  }
  public deleteCategory(id: number) {
    return this.httpClient.delete(`http://localhost:3000/category/${id}`);
  }
  public  addCategory(id: unknown) {
    return this.httpClient.post('http://localhost:3000/category', id)
  }
  public getCategoryById(id: unknown): Observable<Category> {
    return this.httpClient.get<Category>(`http://localhost:3000/category/${id}`);
   }
  public updateCategory(id:string | null, updateBody: any) {
    return this.httpClient.put(`http://localhost:3000/category/${id}`, updateBody);
  }
}

