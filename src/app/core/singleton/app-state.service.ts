import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AreaSimple } from '../type/area-simple.interface';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {

    private selectedAreaUuidSubject = new BehaviorSubject<string>("general")
    selectedAreaUuid$ = this.selectedAreaUuidSubject.asObservable()

    private selectedAreaSubject = new BehaviorSubject<AreaSimple | null>(null)
    selectedArea$ = this.selectedAreaSubject.asObservable()


    setSelectedAreaUuid(uuid: string) {
        this.selectedAreaUuidSubject.next(uuid)
    }

    setSelectedArea(area: any) {
        this.selectedAreaSubject.next(area)
    }
}