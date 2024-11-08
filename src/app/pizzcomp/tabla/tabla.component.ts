import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.component.html',
  styles: ``
})
export default class TablaComponent {
  @Input() pedido: any[] = [];
  @Output() quitarPedido = new EventEmitter<number>();
  @Output() pedidoFinalizado = new EventEmitter<any>();

  quitar(index: number) {
    this.quitarPedido.emit(index);
  }
  
  terminar() {
    const total = this.pedido.reduce((acc, pedidos) => acc + pedidos.subtotal, 0);
    const confirmacion = confirm(`El costo total es ${total}. ¿Deseas finalizar el pedido?`);

    if (confirmacion) {
      this.pedidoFinalizado.emit({ pedidos: this.pedido, total });
      this.pedido = [];
    } else {
      alert('Puedes editar el pedido antes de finalizar.');
    }
  }
}
