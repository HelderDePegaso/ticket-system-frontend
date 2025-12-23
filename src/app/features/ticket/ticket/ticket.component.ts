import { Component } from '@angular/core';
import { TicketFilterComponent } from "../components/ticket-filter/ticket-filter.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  imports: [TicketFilterComponent , RouterLink]
})
export class TicketComponent {

}
