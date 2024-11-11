import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import RegistroComponent from './pizzcomp/registro/registro.component';
import TablaComponent from './pizzcomp/tabla/tabla.component';
import VentasComponent from './pizzcomp/ventas/ventas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistroComponent, TablaComponent, VentasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pizzeria';
  pedidos: any[] = []; // Lista de pedidos para mostrar en la tabla

  agregarPedido(pedido: any) {
    this.pedidos.push(pedido); // Agrega el pedido a la lista
  }
}
