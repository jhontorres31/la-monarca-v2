import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductDetailService } from '../services/product-detail-service';
import { productModel } from '../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { CarService } from '../services/car-service';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private productServices =inject(ProductDetailService);
  private cartService = inject(CarService);

  product = signal <productModel | null>(null);
  
  ngOnInit(){

    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.productServices.getProductById(id).subscribe({
        next: (data) => this.product.set(data),
        error: (err) => console.error('Error al obtener producto', err)

      });
    }
  }

   addToCart(product: productModel){

    this.cartService.addToCart(
      product.id_producto,
      product.valor_producto,
      1
    );

  }
}
