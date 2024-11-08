import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../ventas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventas.component.html',
  styles: ``
})
export default class VentasComponent implements OnInit{
  ventas: any[] = [];
  totalVentas = 0;

  constructor(private ventasService: VentasService) {}

  ngOnInit() {
    this.ventas = this.ventasService.obtenerVentas();
    this.totalVentas = this.ventas.reduce((total, venta) => total + venta.total, 0);
  }
}
