import { Component, inject, ElementRef, HostListener, signal } from '@angular/core';
import { carmodel } from '../shared/models/car.model';
import { CarService } from '../shared/services/car-service';
import { DecimalPipe } from '@angular/common';
import { LoginService } from '../shared/services/login-service';
import { PedidoService } from '../shared/services/pedido-service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/users-service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
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

  public cantidades = signal<Map<number, number>>(new Map());

  getCantidad(idProducto: number): number {
    return this.cantidades().get(idProducto) ?? 1;
  }

  setCantidad(idProducto: number, valor: number): void {
    const map = new Map(this.cantidades());
    const cantidadValida = (!valor || valor < 1 || isNaN(valor)) ? 1 : valor;
    map.set(idProducto, cantidadValida);
    this.cantidades.set(map);
  }

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
    console.log('Debes iniciar sesión');
    return;
  }

  
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
          
          items: this.cart().map(prod => {

            const idProducto = Number((prod as any).id_compra);
              const cantidad = this.getCantidad(idProducto);
              const subtotal = (prod.price * cantidad).toString();

              return {
                id_producto: idProducto,
                cantidad: cantidad,
                precio_unitario: prod.price.toString(),
                subtotal: subtotal
              };

          })
        };

        // Enviamos el pedido final
        this.pedidoService.crearPedido(nuevoPedido).subscribe({
          next: () => {
            console.log('¡Pedido exitoso con tus datos de perfil!');
            this.carService.cart.set([]);
            this.closeCart();
            this.router.navigate(['/pedidos']);
          }
        });
      }
    },
    error: (err) => console.log('No se pudieron recuperar tus datos de envío.')
  });
}
}
