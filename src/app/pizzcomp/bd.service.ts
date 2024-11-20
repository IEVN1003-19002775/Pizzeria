import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  nombre: string;
  direccion: string;
  telefono: string;
  tamanoPizza: string;
  ingrediente1: string;
  ingrediente2: string;
  ingrediente3: string;
  numeroPizzas: number;
  subtotal: number;
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
}

