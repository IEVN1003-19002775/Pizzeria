import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../ventas.service';
import { CommonModule } from '@angular/common';

interface Pedido {
  nombre: string;
  tamanoPizza: string;
  ingrediente1: string;
  ingrediente2: string;
  ingrediente3: string;
  numeroPizzas: number;
  subtotal: number;
}

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventas.component.html',
  styles: ``
})
export default class VentasComponent implements OnInit{
  pedidos: Pedido[] = [];
  totalGeneral: number = 0;

  ngOnInit() {
    // Recuperar pedidos desde localStorage al cargar el componente
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos') || '[]');
    this.pedidos = pedidosGuardados;

    // Calcular el total general de todas las ventas
    this.totalGeneral = this.pedidos.reduce((total, pedido) => total + pedido.subtotal, 0);
  }
}
