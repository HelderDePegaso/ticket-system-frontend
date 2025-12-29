import { inject, Injectable } from "@angular/core";
import { AreaSimple } from "../../../core/type/area-simple.interface";
import { AreaCacheService } from "../cache/area.cache.service";

@Injectable({ providedIn: 'root' })
export class AreaService {

  private cache = inject(AreaCacheService);
  private userId = ""

  getAreasForDashboard(userId: string) {
    this.userId = userId
    return this.cache.queryAreas(userId);
  }

  isAreaActive(area: AreaSimple): boolean {
    return area.status === 'active';
  }

  filterValidAreas(areas: AreaSimple[]) {
    return areas.filter(a => a.status === 'active');
  }

  async getAreaByUuid(uuid: string) {
    //const areasQuery = this.cache.queryAreas(this.userId)
    //switch (areasQuery.status()) {
    //  case 'pending': await areasQuery.promise;
    //    break;
    //}
    //return areas.find(a => a.uuid === uuid);
  }
}
