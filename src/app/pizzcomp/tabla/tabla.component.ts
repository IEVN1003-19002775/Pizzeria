import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.component.html',
  styles: ``
})
export default class TablaComponent {
  // Recibir pedidos desde el componente padre
  @Input() pedidos: Pedido[] = [];
  @Output() pedidoTerminado = new EventEmitter<void>(); // Para notificar cuando se completa el pedido
  @Output() quitarPedido = new EventEmitter<number>();

  // Variables para capturar datos del pedido actual
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  tamano: string = '';
  ingrediente1: string = '';
  ingrediente2: string = '';
  ingrediente3: string = '';
  numeroPizzas: number = 1;
  subtotal: number = 0;

  quitar(index: number) {
    this.pedidos.splice(index, 1); // Remover pedido del array
    this.quitarPedido.emit(index); // Emitir evento al componente padre
  }

  // Terminar y guardar el pedido
  terminarPedido() {
    const pedido: Pedido = {
      nombre: this.nombre,
      tamanoPizza: this.tamano,
      ingrediente1: this.ingrediente1,
      ingrediente2: this.ingrediente2,
      ingrediente3: this.ingrediente3,
      numeroPizzas: this.numeroPizzas,
      subtotal: this.subtotal
    };

    // Calcular el costo total de los pedidos en pantalla
    const total = this.pedidos.reduce((acc, pedido) => acc + pedido.subtotal, 0) + pedido.subtotal;
    const confirmacion = confirm(`El costo total es ${total}. ¿Deseas finalizar el pedido?`);

    if (confirmacion) {
      this.guardarPedidoEnLocalStorage(this.pedidos);
    } else {
      alert('Puedes editar el pedido antes de finalizar.');
    }
  }

  guardarPedidoEnLocalStorage(pedido: any) {
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos') || '[]');
    pedidosGuardados.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidosGuardados));
  }
}
