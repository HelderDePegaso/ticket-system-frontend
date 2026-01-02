import { inject, Injectable } from "@angular/core";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { AreaSimple } from "../../../core/type/area-simple.interface";
import { db } from "../../data-access/dexie-idb";
import { UserHttpclient } from "../../../core/http/user-httpclient/user-httpclient";
import { AreaDataAccess } from "../../data-access/area-data-acess/area-data-access";

@Injectable({ providedIn: 'root' })
export class AreaCacheService {

  private userHttpclient = inject(UserHttpclient);
  private areaDataAccess = inject(AreaDataAccess);

  constructor() {}

  queryAreas(userId: string) {
    return injectQuery<AreaSimple[]>(() => ({
      queryKey: ['areas', userId],
      queryFn: () =>  this.areaDataAccess.getMyAreas(userId),
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchInterval: 1 * 60 * 1000
    }));
  }


  

  async fetchAreasFromApiMock(userId: string): Promise<AreaSimple[]> {
    //debugger
    // 1️⃣ Ler dados do Dexie
    const localAreas = await db.areas.toArray();

    // 2️⃣ Ler metadados de sync
    const metadataMap = new Map(
      (await db.sync_metadata
        .where('entity')
        .equals('areas')
        .toArray())
        .map(meta => [meta.entity_id, meta])
    );

    // 3️⃣ Verificar se backend tem atualização
    const lastModified = Math.max(...(localAreas.map(area => metadataMap.get(area.uuid)?.last_modified ?? 0)));

    

    // 🔹 Chamar backend (pseudo-código)
    const response = await this.userHttpclient.getUserAreas({ lastModified: (lastModified == -Infinity || lastModified == Infinity) ? 0 :  lastModified });
    const backendAreas: AreaSimple[] = await (response.data as any)?.areas as AreaSimple[] ?? [];

    // 4️⃣ Atualizar Dexie e metadados se houver alterações
    for (const area of backendAreas) {
      await db.areas.put(area);
      await db.sync_metadata.put({
        entity: 'areas',
        entity_id: area.uuid,
        last_modified: 0, // ou timestamp do backend
        last_synced_at: Date.now()
      });
    }

    // 5️⃣ Retornar dados finais (Dexie atualizado)
    return await db.areas.toArray();
  }
}
