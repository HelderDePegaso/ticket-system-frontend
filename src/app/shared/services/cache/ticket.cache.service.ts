import { Ticket } from "../../../core/type/ticket.interface";
import { TicketService } from "../../../features/ticket/service/ticket.service";
import { inject, Injectable } from "@angular/core";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { db, TicketTB } from "../../data-access/dexie-idb";
import { TicketHttpclient } from "../../../core/http/ticket-httpclient/ticket-httpclient";
import { TicketDataAccess } from "../../data-access/ticket-data-access/ticket-data-acess";
@Injectable({ providedIn: 'root' })
export class TicketCacheService {


  private ticketHttpClient = inject(TicketHttpclient)
  private ticketDataAcess = inject(TicketDataAccess)

  queryTicketsByArea(areaId: string) {
    return injectQuery<Ticket[]>(() => ({
      queryKey: ['tickets', areaId],

      queryFn: () => this.fetchTickets(areaId),

      staleTime: 15 * 1000,          // 15s
      refetchInterval: 15 * 1000,    // polling
      cacheTime: 60 * 1000,          // 1 min na RAM

      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    }));
  }

  queryTickets() {
    return injectQuery<TicketTB[]>(() => ({
      queryKey: ['tickets'],

      queryFn: async () => {
        const tickets = await this.ticketDataAcess.getTickets();
        return tickets
      },

      staleTime: 15 * 1000,          // 15s
      refetchInterval: 15 * 1000,    // polling
      cacheTime: 3 * 60 * 1000,          // 3 min na RAM

      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    }));
  }

  private mapTicketTBToTicket(ticketTB: TicketTB): Ticket {
    return {
      ...ticketTB,
      description: '',
      requester: {},
      assignedTo: [],
      updatedAt: new Date(),
    } as unknown as Ticket;
  }

  queryTicketsStatusExistance() {
    return injectQuery<Ticket[]>(() => ({
      queryKey: ['tickets', "ticketsStatusexistance"],
      queryFn: () => { return {} as any },

      staleTime: 15 * 1000,          // 15s
      refetchInterval: 15 * 1000,    // polling
      cacheTime: 60 * 1000,          // 1 min na RAM

      refetchOnReconnect: true,
    }));
  }

  private fetchTickets(areaId: string = ""): Promise<Ticket[]> {
    if (areaId == "") return {} as any
    return {} as any
  }

  

  


}