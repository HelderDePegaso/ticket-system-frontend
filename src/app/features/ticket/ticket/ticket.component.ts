import { AfterViewInit, Component, computed, inject } from '@angular/core';
import { TicketFilterComponent } from "../components/ticket-filter/ticket-filter.component";
import { RouterLink } from '@angular/router';
import { TicketListComponent } from "../components/ticket-list/ticket-list.component";
import { TicketService } from '../service/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  imports: [TicketFilterComponent, RouterLink, TicketListComponent]
})
export class TicketComponent implements AfterViewInit {

  constructor() { }

  ticketService: TicketService = inject(TicketService);
  //tickets: any[] = [];

  ticketsQuery = this.ticketService.getTickets();

  tickets = this.ticketService.getTickets();

  async ngAfterViewInit() {

  }


}
