import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

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

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.component.html',
  styles: ``
})
export default class TablaComponent {
  @Input() pedidos: Pedido[] = [];
  @Output() quitarPedido = new EventEmitter<number>();
  @Output() limpiarCampos = new EventEmitter<void>();
  @Output() verVentas = new EventEmitter<void>();

  // Métodos
  quitar(index: number) {
    this.pedidos.splice(index, 1);
    this.quitarPedido.emit(index);
  }

  terminarPedido() {
    const total = this.pedidos.reduce((acc, pedido) => acc + pedido.subtotal, 0);
    const confirmacion = confirm(`El costo total es ${total}. ¿Deseas finalizar el pedido?`);

    if (confirmacion) {
      this.guardarPedidoEnLocalStorage(this.pedidos);
      this.pedidos = [];
      this.limpiarCampos.emit();
      this.verVentas.emit();
    } else {
      alert('Puedes editar el pedido antes de finalizar.');
    }
  }

  private guardarPedidoEnLocalStorage(nuevosPedidos: Pedido[]) {
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos') || '[]');
    const pedidosActualizados = [...pedidosGuardados, ...nuevosPedidos];
    localStorage.setItem('pedidos', JSON.stringify(pedidosActualizados));
  }
}

