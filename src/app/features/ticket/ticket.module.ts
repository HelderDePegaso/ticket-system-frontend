import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketService } from './service/ticket.service';
import { TicketComponent } from './ticket/ticket.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule , TicketComponent
  ] ,

  providers : [
    TicketService
  ]
})
export class TicketModule { }
