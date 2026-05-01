import { Component, signal, inject, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { productModel } from '../models/product.model';
import { ProductServices } from '../services/product-services';
import { CarService } from '../services/car-service';

@Component({
  selector: 'app-list-product',
  imports: [CurrencyPipe],
  templateUrl: './list-product.html',
  styleUrl: './list-product.css',
})
export class ListProduct {

  private productService = inject(ProductServices);
  products = signal<productModel[]>([]);
  selectedType = signal<string>('Todos');
  private cartService = inject(CarService);

  categories = computed(() => {
    const types = this.products().map(p => p.tipo_producto);
    return ['Todos', ...new Set(types)];
  });

  
  filteredProducts = computed(() => {
    const currentFilter = this.selectedType();
    const allProducts = this.products();

    if (currentFilter === 'Todos') return allProducts;
    
    return allProducts.filter(p => p.tipo_producto === currentFilter);
  });  

  ngOnInit(){

    this.cartService.hideSideMenu.set(true)
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

  addToCart(product: productModel){

    this.cartService.addToCart(
      product.id_producto,
      product.valor_producto,
      1
    );


  }

  }



