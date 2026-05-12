import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login-service'; 
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {

  private http = inject(HttpClient);
  private loginService = inject(LoginService);
  private url = 'http://localhost:3000/carro';

  hideSideMenu = signal(true);
  cart = signal<any[]>([]);
  total = computed(() => this.cart().reduce((acc, p) => acc + p.price, 0));

  constructor() {
    
    effect(() => {
      if (this.loginService.currentUser()) {
        this.loadCart();
      } else {
        this.cart.set([]); 
      }
    });
  }

  loadCart() {
    
    const user = this.loginService.currentUser();
    const userId = user?.id || (user as any)?.id_usuario;

    if (!userId) {
      this.cart.set([]);
      return;
    }

    this.http.get<any>(`${this.url}/${userId}`).pipe(
      map(res => (res.items || []).map((item: any) => ({
        id_compra: item.id_compra,
        title: item.nombre_producto,
        price: item.total_item,
        images: [item.imagen_producto]
      })))
    ).subscribe({
      next: (data) => this.cart.set(data),
      error: () => this.cart.set([]) 
    });
  }

  addToCart(idProducto: number, precio: number, cantidad: number = 1) {
    const user = this.loginService.currentUser();
    const userId = user?.id || (user as any)?.id_usuario;

    if (!userId) return alert('Inicia sesión primero');

    const payload = {
      id_usuario: userId,
      producto: idProducto,
      cantidad_productos: cantidad,
      valor_pedido: precio
    };

    this.http.post(this.url, payload).subscribe(() => {
      this.loadCart();
      this.hideSideMenu.set(false);
    });
  }

  removeFromCart(idCompra: number) {
    this.http.delete(`${this.url}/${idCompra}`).subscribe(() => {
      this.loadCart(); 
    });
  }
}