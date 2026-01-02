import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent {
 @Input() tickets: any[] = [];
}
