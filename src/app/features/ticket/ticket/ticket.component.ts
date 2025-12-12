import { Component } from '@angular/core';
import { TicketFilterComponent } from "../components/ticket-filter/ticket-filter.component";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  imports: [TicketFilterComponent]
})
export class TicketComponent {

}
