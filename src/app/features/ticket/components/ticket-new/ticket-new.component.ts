import { Component } from '@angular/core';
import { HorizontalDragScrollDirective } from '../../../../core/directive/horizontal-drag-scroll-directive.directive';

@Component({
  selector: 'app-ticket-new',
  standalone: true,
  imports: [HorizontalDragScrollDirective],
  templateUrl: './ticket-new.component.html',
  styleUrl: './ticket-new.component.css'
})
export class TicketNewComponent {

}
