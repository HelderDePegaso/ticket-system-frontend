import { computed, inject, Injectable } from '@angular/core';
import { Ticket } from '../../../core/type/ticket.interface';
import { UserSimple } from '../../../core/type/user-simple.interface';
import { db } from '../../../shared/data-access/dexie-idb';
import { TicketCacheService } from '../../../shared/services/cache/ticket.cache.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ticketCacheService = inject(TicketCacheService);

  private ticketsQuery = this.ticketCacheService.queryTickets();

  tickets = computed(() => {
    const data =  this.ticketsQuery.data() ?? [];
    let computedData = []
    if (data.length > 0) {
      for (let d of data) {
        computedData.push(this.parseTicket(d))
      }
    }
    console.log("Computado")
    console.log(computedData)
    return computedData
  });

  constructor() { }


  getTicketsByArea(areaUuid: string): void {
    
  }

  getTickets() {
    return this.tickets
  }

  

  getTicketsByStatus() {
    return this.fetchTicketsExistance();
  }

  private async fetchTicketsExistance() {
    const localTicketsStatus = await db.tickets.toArray();
    return localTicketsStatus;
  }


  private parseTicket(tickettb: any): Ticket {
    return {
      uuid: tickettb.uuid,
      title: tickettb.title,
      description:  '', 
      status: tickettb.status.toUpperCase() , // mapeia para seu enum
      requester: {
        uuid: tickettb.requesterUuid ?? 0,
        name: 'A processar',
        email: tickettb.requester?.email ?? ''
      },
      assignedTo: [], // por enquanto vazio
      areaUuid: tickettb.areaUuid,
      requestDate: new Date((tickettb.requestDate ?? 0) * 1000).toISOString(),
      updatedAt: new Date((tickettb.completion_date ?? 0) * 1000).toISOString()
    }
  }


  
}
