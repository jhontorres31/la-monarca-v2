import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login-service'; // Ajusta la ruta
import { carmodel } from '../models/car.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {

  private http = inject(HttpClient);
  private loginService = inject(LoginService);
  private url = 'http://localhost:3000/carro';

  hideSideMenu = signal(true);

  // Signal que alimenta tu @for (product of cart())
  cart = signal<any[]>([]);
  
  // Total automático
  total = computed(() => this.cart().reduce((acc, p) => acc + p.price, 0));

  constructor() {
    // Cada vez que el usuario cambie (login/logout), recargamos el carrito
    effect(() => {
      const user = this.loginService.currentUser();
      if (user) {
        this.loadCart();
      } else {
        this.cart.set([]); // Limpiar si hace logout
      }
    });
  }

  addToCart(idProducto: number, precio: number, cantidad: number = 1) {
    const user = this.loginService.currentUser();
    
    // LOG DE DIAGNÓSTICO: Esto aparecerá en la consola del navegador (F12)
    console.log('Usuario detectado en CarService:', user);
  
    if (!user) {

      alert('Debes iniciar sesión para agregar productos');
      return;
    }
  
    // BLINDAJE DE ID: Intentamos obtener el ID de varias formas comunes
    const userId = user.id || (user as any).id_usuario || (user as any).id_cliente;
  
    if (!userId) {
     
      console.error('ERROR: No se encontró un ID válido en el objeto usuario:', user);
      return;
    }
    
    const cantidadFinal = cantidad > 0 ? cantidad : 1;

    const payload = {
      id_usuario: userId,
      producto: idProducto,
      cantidad_productos: cantidadFinal,
      valor_pedido: precio
    };
  
    console.log('Enviando payload al backend:', payload);
  
    this.http.post(this.url, payload).subscribe({
      next: () => {
        console.log('¡Éxito! Producto agregado.');
        this.loadCart();
        this.hideSideMenu.set(false);
      },
      error: (err) => {
        console.error('Error en el servidor al agregar:', err);
        alert('Error al agregar el producto. Revisa la consola.');
      }
    });
  }

  loadCart() {
    const userId = this.loginService.currentUser()?.id;
    if (!userId) return;

    this.http.get<any>(`${this.url}/${userId}`).pipe(
      map(res => res.items.map((item: any) => ({
        id_compra: item.id_compra, // Guardamos el ID para poder eliminar
        title: item.nombre_producto,
        price: item.total_item,
        images: [item.imagen_producto] // Lo metemos en un array para tu [src]
      })))
    ).subscribe(data => this.cart.set(data));
  }

  removeFromCart(idCompra: number) {
    this.http.delete(`${this.url}/${idCompra}`).subscribe(() => {
      this.loadCart(); 
    });
  }
}
