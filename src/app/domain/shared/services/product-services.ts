import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productModel } from '../models/product.model';



@Injectable({
  providedIn: 'root',
})
export class ProductServices {

  private http =inject(HttpClient)
    
  getProducts(category_id?: string){

      const url = new URL('http://localhost:3000/productos');
      if(category_id){
        url.searchParams.set('categoryId', category_id)
      }
      return this.http.get<productModel[]>(url.toString());
    }

  }
  

 

  
