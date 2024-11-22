import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import RegistroComponent from './pizzcomp/registro/registro.component';
import TablaComponent from './pizzcomp/tabla/tabla.component';
import VentasComponent from './pizzcomp/ventas/ventas.component';
import { HttpClientModule } from '@angular/common/http';
import { GestionarPedidosComponent } from './pizzcomp/gestionar-pedidos/gestionar-pedidos.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RegistroComponent, GestionarPedidosComponent, TablaComponent, VentasComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pizzeria';
  pedidos: any[] = [];
  activeComponent: string = 'main';

  agregarPedido(pedido: any) {
    this.pedidos.push(pedido);
  }
  setActiveComponent(componentName: string) {
    this.activeComponent = componentName;
  }
}
