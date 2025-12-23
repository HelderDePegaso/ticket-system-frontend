import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {

    private selectedAreaUuidSubject = new BehaviorSubject<string>("general")
    selectedAreaUuid$ = this.selectedAreaUuidSubject.asObservable()


    setSelectedAreaUuid(uuid: string) {
        this.selectedAreaUuidSubject.next(uuid)
    }
}