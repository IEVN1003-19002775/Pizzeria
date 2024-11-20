import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoapiService } from '../bd.service';

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
}
