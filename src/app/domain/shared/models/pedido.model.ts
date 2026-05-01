export interface detallePedidoModel {
    id_producto: number;
    cantidad: string;
    precio_unitario: string;
    subtotal: string;
}

export interface pedidoModel {
    id_pedido?: number; // Opcional porque se genera en la DB
    id_usuario: number;
    direccion: string;
    ciudad: string;
    telefono: string;
    valor_total: string;
    estado: string;
    fecha_creacion: string;
    items: detallePedidoModel[]; // <--- ESTO ES LO QUE FALTA
}