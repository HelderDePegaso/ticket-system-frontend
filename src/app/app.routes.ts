import { Routes } from '@angular/router';
import { DashboardComponent } from './entities/dashboard/dashboard/dashboard.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { SingInComponent } from './features/sing-in/sing-in.component';

export const routes: Routes = [

    {
        path: 'main',
        loadChildren: () => import('./entities/dashboard/dashboard.routes').then((m)=> m.routes)
    },

    {
        path: 'account/signup',
        component: SignUpComponent
    } ,

    {
        path: 'account/signin',
        component: SingInComponent
    },

    {
        path: '',
        redirectTo: 'account/signin',
        pathMatch: 'full'
    }
];
