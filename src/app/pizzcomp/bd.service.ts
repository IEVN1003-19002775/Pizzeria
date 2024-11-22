import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  id?: number;
  nombre: string;
  direccion: string;
  telefono: string;
  tamanoPizza: string;
  ingrediente1: string;
  ingrediente2: string;
  ingrediente3: string;
  numeroPizzas: number;
  subtotal: number;
  editando?: boolean;
}

export interface ApiResponse {
  exito: boolean;
  Pedidos: Pedido[];
  mensaje: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProyectoapiService {
  private apiUrl = 'http://127.0.0.1:5000/pedidos';

  constructor(private http: HttpClient) {}

  public getPedidos(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:5000/pedidos');
  }

  agregarPedido(pedido: Pedido): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }

  guardarPedidos(pedidos: Pedido[]): Observable<any> {
    return this.http.post(this.apiUrl, pedidos);
  }

  getVentas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ventas`);
  }

  actualizarPedido(id: number, pedido: Pedido): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pedido);
  }
  
  eliminarPedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }  
  
  getTodosLosPedidos(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('http://127.0.0.1:5000/pedidos');
  }
  
  
  
}

