import { Component, OnInit } from '@angular/core';
import { ProyectoapiService, Pedido,ApiResponse } from '../bd.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestionar-pedidos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './gestionar-pedidos.component.html',
  styleUrls: ['./gestionar-pedidos.component.css'],
})
export class GestionarPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  backupPedidos: any[] = [];

  constructor(private http: HttpClient, private apiService: ProyectoapiService) {}

  ngOnInit() {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.http.get<any>('http://127.0.0.1:5000/pedidos').subscribe((data) => {
      this.pedidos = data.Pedidos.map((pedido: any) => ({
        ...pedido,
        editando: false
      }));
      this.backupPedidos = JSON.parse(JSON.stringify(this.pedidos));
    });
  }

  activarEdicion(pedido: any) {
    pedido.editando = true;
  }

  cancelarEdicion(pedido: any, index: number) {
    this.pedidos[index] = { ...this.backupPedidos[index] }; // Restaura el backup
    pedido.editando = false;
  }

  guardarCambios(pedido: any) {
    this.apiService.actualizarPedido(pedido.id, pedido).subscribe(
      (response) => {
        alert('Pedido actualizado con éxito.');
        pedido.editando = false;
        this.backupPedidos = JSON.parse(JSON.stringify(this.pedidos)); // Actualiza el backup
      },
      (error) => {
        alert('Error al actualizar el pedido.');
        console.error(error);
      }
    );
  }

  /* obtenerTodosLosPedidos() {
    this.apiService.getTodosLosPedidos().subscribe({
      next: (data: ApiResponse) => {
        if (data.exito) {
          console.log('Pedidos recibidos:', data.Pedidos); // Revisa los datos aquí
          this.pedidos = data.Pedidos;
        } else {
          alert('Error al obtener los pedidos: ' + data.mensaje);
        }
      },
      error: (err) => {
        console.error('Error al obtener los pedidos', err);
        alert('Hubo un error al obtener los pedidos.');
      },
    });
  }

  editarPedido(pedido: Pedido) {
    const pedidoEditado = prompt(
      'Introduce los datos del pedido en formato JSON:',
      JSON.stringify(pedido)
    );
    if (pedidoEditado) {
      try {
        const pedidoActualizado: Pedido = JSON.parse(pedidoEditado);
        this.apiService.actualizarPedido(pedido.id!, pedidoActualizado).subscribe({
          next: (data) => {
            if (data.exito) {
              alert('Pedido actualizado correctamente.');
              this.obtenerTodosLosPedidos(); // Refresca la lista
            } else {
              alert('Error al actualizar el pedido: ' + data.mensaje);
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
  } */
  

  eliminarPedido(id: number) {
    console.log('ID recibido para eliminar:', id); // Registra el ID recibido
    if (!id) {
      alert('ID no válido. No se puede eliminar el pedido.');
      return;
    }
    if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      this.apiService.eliminarPedido(id).subscribe({
        next: (data) => {
          console.log('Respuesta del servidor:', data); // Registra la respuesta
          if (data.exito) {
            alert('Pedido eliminado correctamente.');
            this.obtenerPedidos(); // Refresca la lista
          } else {
            alert('Error al eliminar el pedido: ' + data.mensaje);
          }
        },
        error: (err) => {
          console.error('Error al eliminar el pedido:', err); // Registra el error
          alert('Hubo un error al eliminar el pedido.');
        },
      });
    }
  }
  
  
  
}

