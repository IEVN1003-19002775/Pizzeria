import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProyectoapiService } from '../bd.service';

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
  styles: ``,
})
export default class TablaComponent {
  @Input() pedidos: Pedido[] = [];
  @Output() quitarPedido = new EventEmitter<number>();
  @Output() limpiarCampos = new EventEmitter<void>();
  @Output() verVentas = new EventEmitter<void>();

  // Método para quitar un pedido
  quitar(index: number) {
    this.pedidos.splice(index, 1); // Elimina el pedido localmente
    this.quitarPedido.emit(index);  // Emite el evento para actualizar el componente principal
  }

  // Método para finalizar el pedido
  terminarPedido() {
    const total = this.pedidos.reduce((acc, pedido) => acc + pedido.subtotal, 0);
    const confirmacion = confirm(`El costo total es ${total}. ¿Deseas finalizar el pedido?`);

    if (confirmacion) {
      // Se guarda el pedido en la base de datos
      this.apiService.guardarPedidos(this.pedidos).subscribe({
        next: (res) => {
          console.log('Pedidos guardados en la base de datos', res);
          alert('Pedido registrado exitosamente');

          // Después de guardar en la base de datos, se guarda en LocalStorage
          this.guardarPedidoEnLocalStorage(this.pedidos);

          // Limpiar la tabla de pedidos
          this.pedidos = [];
        },
        error: (err) => {
          console.error('Error al guardar los pedidos', err);
          alert('Hubo un error al guardar los pedidos');
        }
      });
    } else {
      alert('Puedes editar el pedido antes de finalizar.');
    }
  }

  // Guardar pedidos en LocalStorage
  private guardarPedidoEnLocalStorage(nuevosPedidos: Pedido[]) {
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos') || '[]');
    const pedidosActualizados = [...pedidosGuardados, ...nuevosPedidos];
    localStorage.setItem('pedidos', JSON.stringify(pedidosActualizados));
  }

  constructor(private apiService: ProyectoapiService) {}

  ngOnInit(): void {
    // Aquí puedes agregar lógica de inicialización si es necesario
  }
}
