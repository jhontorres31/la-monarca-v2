import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productModel } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  private http = inject(HttpClient);
  private apiUrl ='http://localhost:3000/producto';

  getProductById(id: string): Observable<productModel>{
    return this.http.get<productModel>(`${this.apiUrl}/${id}`);
  }
  
}
