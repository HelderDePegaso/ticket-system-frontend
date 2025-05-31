import { Routes } from '@angular/router';
import { DashboardComponent } from './entities/dashboard/dashboard/dashboard.component';

export const routes: Routes = [

    {
        path: 'main',
        loadChildren: () => import('./entities/dashboard/dashboard.routes').then((m)=> m.routes)
    }
];
