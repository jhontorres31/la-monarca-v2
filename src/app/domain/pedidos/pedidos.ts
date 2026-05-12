import { Component, inject, signal, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LoginService } from '../shared/services/login-service';
import { PedidoService } from '../shared/services/pedido-service';
import { pedidoModel } from '../shared/models/pedido.model';
import { CarService } from '../shared/services/car-service';


@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos {

  

  private loginService = inject(LoginService);
  private pedidoService = inject(PedidoService);
  private carService = inject(CarService)

  misPedidos = signal<pedidoModel[]>([]);

  ngOnInit(){

    this.carService.hideSideMenu.set(true);
    this.cargarPedidos();
  }

  cargarPedidos() {
   
    const userId = this.loginService.currentUser()?.id;


    if (userId) {
      this.pedidoService.getPedidosPorUsuario(userId).subscribe({
        next: (pedidos) => {
          this.misPedidos.set(pedidos); // Guardas los datos en un signal
        },
        error: (err) => console.error('Error al cargar pedidos', err)
      });
    }
  }

  eliminar(id: number) {
  if (confirm('¿Estás seguro de que deseas cancelar este pedido de La Monarca?')) {
    this.pedidoService.eliminarPedido(id).subscribe({
      next: () => {
        // Filtramos la lista actual para quitar el eliminado (Optimistic UI)
        this.misPedidos.update(pedidos => pedidos.filter(p => p.id_pedido !== id));
      },
      error: (err) => console.error('Error al eliminar:', err)
    });
  }
}


}
