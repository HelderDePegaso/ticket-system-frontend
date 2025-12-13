import { Route } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DashComponent } from '../../features/dash/dash.component'


export const routes: Route[] = [

    {
        path: '',
        component: DashboardComponent,
        children: [
            // For users issues

            {
                path: 'user',
                loadChildren: () => import('../../features/user/user.route').then((m) => m.routes)
            }

            ,

            {
                path: 'ticket',
                loadChildren: () => import('../../features/ticket/ticket.routes').then((m) => m.routes)
            }

            
            

            ,



            {
        path: 'dash',
        component: DashComponent
    }

        ]
    },





    

    
]