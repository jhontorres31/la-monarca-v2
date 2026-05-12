import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pedidoModel } from '../models/pedido.model';

type CrearPedidoPayload = {
  id_usuario: number;
  direccion: string;
  ciudad: string;
  telefono: string;
  valor_total: string;
  estado: string;
  fecha_creacion: string;
  items: Array<{
    id_producto: number;
    cantidad: string;
    precio_unitario: string;
    subtotal: string;
  }>;
};

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';
  

  crearPedido(data: CrearPedidoPayload) {
    return this.http.post(`${this.baseUrl}/finalizar-pedido`, data); 
  }

  getPedidosPorUsuario(idUsuario: number): Observable<pedidoModel[]> {
    return this.http.get<pedidoModel[]>(`${this.baseUrl}/pedidos/${idUsuario}`);
  }

  eliminarPedido(id_pedido: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar-pedido/${id_pedido}`);
  }
}



