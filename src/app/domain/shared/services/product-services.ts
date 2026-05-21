import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productModel } from '../models/product.model';



@Injectable({
  providedIn: 'root',
})
export class ProductServices {

  private http =inject(HttpClient)
  allProducts = signal<productModel[]>([]);
  searchQuery = signal<string>('');
    
  getProducts(category_id?: string){

      const url = new URL('http://localhost:3000/productos');

  
      if(category_id){
        url.searchParams.set('categoryId', category_id)
      }
      return this.http.get<productModel[]>(url.toString()).subscribe({
        next: (data)=>{
          this.allProducts.set(data);
        },
        error: (err)=> console.error('Err', err)
      });
    }

    filteredProducts = computed(()=>{
      const query = this.searchQuery().toLocaleLowerCase().trim();
      if(!query) return this.allProducts();

      return this.allProducts().filter(p=>
        p.nombre_producto.toLocaleLowerCase().includes(query)
      );
    });

  }
  

 

  
