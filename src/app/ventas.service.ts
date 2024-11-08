import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  ventas: any[] = JSON.parse(localStorage.getItem('ventas') || '[]');

  agregarVenta(venta: any) {
    this.ventas.push(venta);
    localStorage.setItem('ventas', JSON.stringify(this.ventas));
  }

  obtenerVentas() {
    return this.ventas;
  }
}
