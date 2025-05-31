import { Route } from '@angular/router'
import { TicketComponent } from './component/ticket/ticket.component'




export const routes: Route[] = [
    {
        path: '',
        component: TicketComponent        
    }, 

    {
        path : ':ticket',
        component: TicketComponent
    }
]