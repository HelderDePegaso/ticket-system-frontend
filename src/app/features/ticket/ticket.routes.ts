import { Route } from '@angular/router'
import { TicketComponent } from './ticket/ticket.component'
import { TicketNewComponent } from './components/ticket-new/ticket-new.component'




export const routes: Route[] = [
    {
        path: '',
        component: TicketComponent   , 
            
    }, 


    {
        path: 'new',
        component: TicketNewComponent
    } 
    ,

    ///{
    ///    path : ':ticket',
    ///    component: TicketComponent
    ///} ,


    
    
]