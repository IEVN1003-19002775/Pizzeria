import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'pizzcomp',
        loadChildren: () => import('./pizzcomp/pizzcomp.routes')
    },
    
];
