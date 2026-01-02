import { Injectable , inject } from "@angular/core";
import { TicketHttpclient } from "../../../core/http/ticket-httpclient/ticket-httpclient";
import { db, TicketTB } from "../dexie-idb";

@Injectable({
    providedIn: 'root'
})
export class TicketDataAccess {
    ticketHttpClient = inject(TicketHttpclient);
    constructor() { }

    async getTickets() {
        console.log('getTickets');
        debugger
        // 1️⃣ Ler tickets do Dexie
        const localTickets = await db.tickets.toArray();

        // 2️⃣ Ler metadados de sync
        const metadataMap = new Map(
            (await db.sync_metadata
                .where('entity')
                .equals('tickets')
                .toArray())
                .map(meta => [meta.entity_id, meta])
        );

        // 3️⃣ Verificar a última modificação local
        const lastModified = Math.max(...(
            localTickets.map(ticket => metadataMap.get(ticket.uuid)?.last_modified ?? 0)
        ));

        // 🔹 Chamar backend (pseudo-código)
        const response: any = await this.ticketHttpClient.getAllTickets({
            lastModified: (lastModified === -Infinity || lastModified === Infinity) ? 0 : lastModified
        });
        const backendTickets: any[] = (response.data as any) ?? [];

        // 4️⃣ Atualizar Dexie e metadados se houver alterações
        for (const ticket of backendTickets) {
            const ticketToDexie = this.parseBackendTicketToDexie(ticket);
            await db.tickets.put(ticketToDexie);
            await db.sync_metadata.put({
                entity: 'tickets',
                entity_id: ticket.uuid,
                last_modified: ticket.updated_at_unix, // ou timestamp do backend
                last_synced_at: Date.now()
            });
        }

        // 5️⃣ Retornar dados finais (Dexie atualizado)
        return await db.tickets.toArray();
    }

    getTicketsByArea(areaUuid: string) {
        // TODO IMPORTANTE: Este método deve executar duas tarefas em paralelo

        // Task 1
        // Pegar os tickets todos do dexie (idb) e filtrar aqueles que pertencem a área atual

        // Task 2
        // Pegar last_modified value anteriormente (caso haver) retornado pela requsição inicial no http

        // Verificar no backend (com last_modified ou sem) se tem alguma atualização e retornar 

        // Atualizar last_modified e os dados no dexie e retornar os dados
    }

    private parseBackendTicketToDexie(ticket: any): TicketTB {
    return {
      uuid: ticket.uuid,
      title: ticket.title,
      status: ticket.status,
      areaUuid: ticket.area?.uuid ?? '',
      requestDate: ticket.created_at_unix,
      requesterUuid: ticket.requester?.uuid, // ou buscar na tabela de usuários pelo UUID se disponível
      assigneedTo: ticket.technician?.name ?? '',
      completion_date: ticket.updated_at_unix 
    };
  }


  
}