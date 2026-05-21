import { Component, signal, inject, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { productModel } from '../models/product.model';
import { ProductServices } from '../services/product-services';
import { CarService } from '../services/car-service';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-list-product',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './list-product.html',
  styleUrl: './list-product.css',
})
export class ListProduct {

  private productService = inject(ProductServices);
  private cartService = inject(CarService);

  products = signal<productModel[]>([]);
  selectedType = signal<string>('Todos');
  

  categories = computed(() => {
    const types = this.productService.allProducts().map(p => p.tipo_producto);
    return ['Todos', ...new Set(types)];
  });

  
  finalFilterProducts = computed(()=>{

    const category = this.selectedType();
    const searchProducts = this.productService.filteredProducts();

    if(category === 'Todos') return searchProducts;

    return searchProducts.filter(p=>p.tipo_producto === category);
  })

  ngOnInit(){

    this.cartService.hideSideMenu.set(true)
    if(this.productService.allProducts().length ===0){
      this.productService.getProducts();
    }
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



