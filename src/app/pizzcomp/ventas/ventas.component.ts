import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoapiService } from '../bd.service';
import { Pedido } from '../bd.service';

interface Venta {
  nombre: string;
  direccion: string;
  telefono: string;
  total: number;
}

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventas.component.html',
  styles: ``,
})
export default class VentasComponent implements OnInit {
  ventas: Venta[] = [];
  totalGeneral: number = 0;

  constructor(private apiService: ProyectoapiService) {}

  ngOnInit(): void {
  }

  obtenerVentas() {
    this.apiService.getVentas().subscribe({
      next: (data) => {
        if (data.exito) {
          this.ventas = data.ventas; // Asigna los resultados de las ventas a la variable 'ventas'
          this.calcularTotalGeneral(); // Calculamos el total general después de recibir los datos
        } else {
          alert('Error al obtener las ventas');
        }
      },
      error: (err) => {
        console.error('Error al obtener las ventas', err);
        alert('Hubo un error al obtener las ventas');
      },
    });
  }

  calcularTotalGeneral() {
    // Asegúrate de que cada 'venta.total' se convierte a número antes de sumar
    this.totalGeneral = this.ventas.reduce((total, venta) => total + Number(venta.total), 0);
  }

  /* editarPedido(id: number) {
    const pedido = prompt('Introduce los nuevos datos del pedido en formato JSON:');
    if (pedido) {
      try {
        const pedidoActualizado: Pedido = JSON.parse(pedido);
        this.apiService.actualizarPedido(id, pedidoActualizado).subscribe({
          next: (data) => {
            if (data.exito) {
              alert('Pedido actualizado correctamente.');
              this.obtenerVentas(); // Refresca la lista
            } else {
              alert('Error al actualizar el pedido.');
            }
          },
          error: (err) => {
            console.error('Error al actualizar el pedido', err);
            alert('Hubo un error al actualizar el pedido.');
          },
        });
      } catch (e) {
        alert('El formato del pedido no es válido.');
      }
    }
  }
  
  eliminarPedido(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      this.apiService.eliminarPedido(id).subscribe({
        next: (data) => {
          if (data.exito) {
            alert('Pedido eliminado correctamente.');
            this.obtenerVentas(); // Refresca la lista
          } else {
            alert('Error al eliminar el pedido.');
          }
        },
        error: (err) => {
          console.error('Error al eliminar el pedido', err);
          alert('Hubo un error al eliminar el pedido.');
        },
      });
    }
  } */
  
}
