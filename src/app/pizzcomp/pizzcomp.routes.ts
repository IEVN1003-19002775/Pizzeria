import { Routes } from '@angular/router';

export default[
    {
        path:'registro',
        loadComponent:()=>import('./registro/registro.component'),
    },
    {
        path:'tabla',
        loadComponent:()=>import('./tabla/tabla.component'),
    },
    {
        path:'ventas',
        loadComponent:()=>import('./ventas/ventas.component'),
    }

] as Routes