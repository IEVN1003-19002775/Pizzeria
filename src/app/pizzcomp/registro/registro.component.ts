import { Component, Output, EventEmitter } from '@angular/core';
import { VentasService } from '../../ventas.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './registro.component.html',
  styles: ``
})
export default class RegistroComponent {
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  tamano: string = '';
  ingrediente1: string = '';
  ingrediente2: string = '';
  ingrediente3: string = '';
  numeroPizzas: number = 1;


  @Output() pedidoAgregado = new EventEmitter<any>(); // Emisor para enviar los datos del pedido
  

  agregar() {
    // Crear el objeto de pedido con los datos ingresados
    const pedido = {
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,
      tamanoPizza: this.tamano,
      ingrediente1: this.ingrediente1,
      ingrediente2: this.ingrediente2,
      ingrediente3: this.ingrediente3,
      numeroPizzas: this.numeroPizzas,
      subtotal: this.calcularSubtotal()
    };

    // Emitir el pedido al componente padre
    this.pedidoAgregado.emit(pedido);

    // Limpiar campos si es necesario
    this.limpiarCampos();
  }

  calcularSubtotal() {
    // Calcular el subtotal en base al tamaño y los ingredientes seleccionados
    let subtotal = 0;
    switch (this.tamano) {
      case 'Chica': subtotal += 40; break;
      case 'Mediana': subtotal += 80; break;
      case 'Grande': subtotal += 120; break;
    }
    if (this.ingrediente1) subtotal += 10 ;
    if (this.ingrediente2) subtotal += 10 ;
    if (this.ingrediente3) subtotal += 10 ;

    subtotal *= this.numeroPizzas;
    return subtotal;
  }

  toggleIngrediente(ingrediente: string, checked: boolean) {
    if (ingrediente === 'Jamón') {
      this.ingrediente1 = checked ? 'Jamón' : '';
    } else if (ingrediente === 'Piña') {
      this.ingrediente2 = checked ? 'Piña' : '';
    } else if (ingrediente === 'Champiñones') {
      this.ingrediente3 = checked ? 'Champiñones' : '';
    }
  }
  limpiarCampos() {
    this.nombre = '';
    this.direccion = '';
    this.telefono = '';
    this.tamano = '';
    this.ingrediente1 = '';
    this.ingrediente2 = '';
    this.ingrediente3 = '';
    this.numeroPizzas = 1;
    
  }

  
}
