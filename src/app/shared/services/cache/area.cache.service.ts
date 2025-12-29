import { Injectable } from "@angular/core";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { AreaSimple } from "../../../core/type/area-simple.interface";

@Injectable({ providedIn: 'root' })
export class AreaCacheService {

  queryAreas(userId: string) {
    return injectQuery<AreaSimple[]>(() => ({
      queryKey: ['areas', userId],
      queryFn: () =>  this.fetchAreasFromApi(userId),
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }));
  }


  fetchAreasFromApi(userId: string): Promise<AreaSimple[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { uuid: '1', name: 'Area 1' , abbrev: "A1" , status: "active" , function: "Requester" , valid_until: "12/10/2029" , domain_id: 1 },
          { uuid: '2', name: 'Area 2' , abbrev: "A2" , status: "active" , function: "Leader" , valid_until: "" , domain_id: 1 },
          { uuid: '3', name: 'Area 3' , abbrev: "A3" , status: "active" , function: "Simple User" , valid_until: "" , domain_id: 1 },
        ]);
      }, 5000);
    });
  }
}
