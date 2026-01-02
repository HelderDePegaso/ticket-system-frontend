export interface SyncMetadataEntity {
  entity: 'areas' | 'tickets' | 'users';
  entity_id: string;          // uuid do registro
  last_modified: number;      // vindo do backend
  last_synced_at: number;     // quando sincronizou
  etag?: string;
  version?: number;
}
