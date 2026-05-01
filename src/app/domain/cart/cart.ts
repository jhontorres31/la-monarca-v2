import { Component, inject, ElementRef, HostListener } from '@angular/core';
import { carmodel } from '../shared/models/car.model';
import { CarService } from '../shared/services/car-service';
import { DecimalPipe } from '@angular/common';
import { LoginService } from '../shared/services/login-service';
import { PedidoService } from '../shared/services/pedido-service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/users-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  public carService = inject(CarService);
  private loginService = inject(LoginService);
  private pedidoService = inject(PedidoService);
  private router = inject(Router);
  private eRef = inject(ElementRef);
  private userService = inject(UserService);

  cart = this.carService.cart;
  total = this.carService.total;
  hideSideMenu = this.carService.hideSideMenu;

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    const clickedElement = event.target as HTMLElement;
    
    if (!this.carService.hideSideMenu()) {
      
      const clickedInside = this.eRef.nativeElement.contains(clickedElement);

      
      
      if (!clickedInside ) {
        this.carService.hideSideMenu.set(true);
      }
    }
  }

  closeCart() {
    this.carService.hideSideMenu.set(true);
  }

  toogleSideMenu() {
    this.hideSideMenu.update((v) => !v);
    if (!this.hideSideMenu()) {
      this.carService.loadCart();
    }
  }
  eliminarProducto(id: number) {
    this.carService.removeFromCart(id);
  }

    pagarPedido() {
  const loginUser = this.loginService.currentUser();
  
  if (!loginUser) {
    alert('Debes iniciar sesión');
    return;
  }

  // Consultamos los datos completos del usuario usando su ID
  this.userService.getUsuarioById(loginUser.id).subscribe({
    next: (fullUser) => {
      if (fullUser) {
        const nuevoPedido: any = { 
          id_usuario: fullUser.id_usuario,
          direccion: fullUser.direccion,
          ciudad: fullUser.ciudad,
          telefono: fullUser.telefono,
          valor_total: this.total().toString(),
          estado: 'Pendiente',
          fecha_creacion: new Date().toISOString().slice(0, 19).replace('T', ' '),
          
          items: this.cart().map(prod => ({
            id_producto: Number((prod as any).id_compra), 
            cantidad: "1", 
            precio_unitario: prod.price.toString(),
            subtotal: prod.price.toString()
          }))
        };

        // Enviamos el pedido final
        this.pedidoService.crearPedido(nuevoPedido).subscribe({
          next: () => {
            alert('¡Pedido exitoso con tus datos de perfil!');
            this.carService.cart.set([]);
            this.closeCart();
            this.router.navigate(['/pedidos']);
          }
        });
      }
    },
    error: (err) => alert('No se pudieron recuperar tus datos de envío.')
  });
}
}
