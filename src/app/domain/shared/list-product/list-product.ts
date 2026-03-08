import { Component, signal, inject, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { productModel } from '../models/product.model';
import { ProductServices } from '../services/product-services';

@Component({
  selector: 'app-list-product',
  imports: [CurrencyPipe],
  templateUrl: './list-product.html',
  styleUrl: './list-product.css',
})
export class ListProduct {

  private productService = inject(ProductServices);
  products = signal<productModel[]>([]);
  selectedType = signal<string>('All');

  categories = computed(() => {
    const types = this.products().map(p => p.tipo_producto);
    return ['All', ...new Set(types)];
  });

  
  filteredProducts = computed(() => {
    const currentFilter = this.selectedType();
    const allProducts = this.products();

    if (currentFilter === 'All') return allProducts;
    
    return allProducts.filter(p => p.tipo_producto === currentFilter);
  });  

  ngOnInit(){

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data); 
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
      }
    });
  }

  changeFilter(type: string) {
    this.selectedType.set(type);
  }

  }



