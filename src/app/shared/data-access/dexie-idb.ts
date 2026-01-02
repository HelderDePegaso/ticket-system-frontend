import Dexie, { Table } from 'dexie';
import { AreaSimple } from '../../core/type/area-simple.interface';
import { SyncMetadataEntity } from './sync-metadata';
import { Ticket } from '../../core/type/ticket.interface';

export type TicketTB = Pick<Ticket, 'uuid' | 'title'  | 'status' |  'areaUuid'  |  'requestDate'   > & { requesterUuid :  string , assigneedTo : string  , completion_date : number };
export class AppDatabase extends Dexie {
  areas!: Table<AreaSimple, string>;
  tickets!: Table<TicketTB , string>;
  sync_metadata!: Table<SyncMetadataEntity, [string, string]>;


  constructor() {
    super('ticket-system-db');

    this.version(1).stores({
      // 🔹 dados de negócio
      areas: 'uuid, name, abbrev, status , super_area , updated_at',

      // 🔹 ticket 
      tickets: `uuid, status, requester_id, assigneedTo, requestDate, completion_date, updated_at ` ,


      // 🔹 metadados de sync
      sync_metadata: '[entity+entity_id], entity, last_modified , last_synced_at',

      
    });
  }
}

export const db = new AppDatabase();
