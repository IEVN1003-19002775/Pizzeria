import { Component, Output, EventEmitter } from '@angular/core';
import { VentasService } from '../../ventas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styles: ``
})
export default class RegistroComponent {
  @Output() agregarPedido = new EventEmitter<any>();

  nombre = '';
  direccion = '';
  telefono = '';
  tamano = '';
  ingrediente1 = '';
  ingrediente2 = '';
  ingrediente3 = '';
  numeroPizzas = 1;

  agregar() {
    const pedido = {
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,
      tamano: this.tamano,
      ingrediente1: this.ingrediente1,
      ingrediente2: this.ingrediente2,
      ingrediente3: this.ingrediente3,
      numeroPizzas: this.numeroPizzas
    };
    this.agregarPedido.emit(pedido);
  }
}
