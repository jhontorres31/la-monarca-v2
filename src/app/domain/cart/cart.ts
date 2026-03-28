import { Component, inject, ElementRef, HostListener} from '@angular/core';
import { carmodel } from '../shared/models/car.model';
import { CarService } from '../shared/services/car-service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

  public carService = inject(CarService);
  private eRef = inject(ElementRef);

  cart = this.carService.cart;
  total = this.carService.total;
  hideSideMenu = this.carService.hideSideMenu;

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    // Si el menú está visible...
    if (!this.carService.hideSideMenu()) {
      // Y el clic NO fue dentro del carrito...
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.carService.hideSideMenu.set(true);
      }
    }
  }

  closeCart() {
    this.carService.hideSideMenu.set(true);
  }

  

  toogleSideMenu() {
    this.hideSideMenu.update(v => !v);
    if (!this.hideSideMenu()) {
      this.carService.loadCart();
  }
  }
  eliminarProducto(id: number) {
    this.carService.removeFromCart(id);
  
}


}
