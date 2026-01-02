import { inject, Injectable } from "@angular/core";
import { RootHttpClient } from "../httpClient-instance";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn   : 'root'
})
export class TicketHttpclient {

    private http: RootHttpClient = inject(RootHttpClient) 


    
    createTicket(ticket: any) {
        return firstValueFrom(this.http.makePost("tickets/create", ticket))
    }

    getAreaTickets() {
        return firstValueFrom(this.http.makeGet("tickets/area"))
    }

    getAllTickets(params: { lastModified: number }) {
        return firstValueFrom(this.http.makeGet("tickets/user_tickets", params))
    }
}
