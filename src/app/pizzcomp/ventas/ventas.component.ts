import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pedido {
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

interface ClienteResumen {
  nombre: string;
  direccion: string;
  telefono: string;
  totalCompra: number;
}

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventas.component.html',
  styles: ``
})
export default class VentasComponent implements OnInit {
  pedidos: Pedido[] = [];
  clientes: ClienteResumen[] = [];
  totalGeneral: number = 0;

  ngOnInit() {
    
  }

  ventas() {
    const pedidosGuardados: Pedido[] = JSON.parse(localStorage.getItem('pedidos') || '[]');
    this.pedidos = pedidosGuardados;
    const clienteMap: { [key: string]: ClienteResumen } = {};

    this.pedidos.forEach((pedido) => {
      const clienteKey = `${pedido.nombre}-${pedido.telefono}-${pedido.direccion}`;
      
      if (clienteMap[clienteKey]) {
        clienteMap[clienteKey].totalCompra += pedido.subtotal;
      } else {
        clienteMap[clienteKey] = {
          nombre: pedido.nombre,
          direccion: pedido.direccion,
          telefono: pedido.telefono,
          totalCompra: pedido.subtotal
        };
      }
    });

    this.clientes = Object.values(clienteMap);
    this.totalGeneral = this.clientes.reduce((total, cliente) => total + cliente.totalCompra, 0);
  }
}
