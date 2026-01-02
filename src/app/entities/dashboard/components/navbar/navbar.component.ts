import { Component, computed, inject, signal } from '@angular/core';
import { AppStateService } from '../../../../core/singleton/app-state.service';
import { UserContextService } from '../../../../core/singleton/user.context.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor } from '@angular/common';
import { map } from 'rxjs';
import { AreaService } from '../../../../shared/services/auxiliar-services/area.service';
import { AreaSimple } from '../../../../core/type/area-simple.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor , FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showFixedPlugin: any = false;
  overlayFixedPlugin: any = false;

  appStateService = inject(AppStateService)
  // selectedAreaUuid$ = this.appStateService.selectedAreaUuid$

  userContextService = inject(UserContextService)
  areas$ = this.userContextService.areas$

  selectedAreaUuid: string = "general"

  


  areaService = inject(AreaService)
  areasQuery = this.areaService.getAreasForDashboard('this')

  areas = computed<AreaSimple[]>(() => {
    return this.areasQuery.data() ?? [];
  });

  selectedArea = signal<AreaSimple | null>(null);

  selectedAreaFresh = computed<AreaSimple | null>(() => {
    const selected = this.selectedArea();
    if (!selected) return null;

    return this.areas().find(a => a.uuid === selected.uuid) ?? null;
  });



  //areasService = inject(AreaService)
  //areasQuery = this.areasService.getAreasForDashboard('')
  ngOnInit(): void {

  }

  toggleFixedPlugin() {
    this.showFixedPlugin = !this.showFixedPlugin;
  }


  doOverlayFixedPlugin() {
    this.overlayFixedPlugin = true;
  }

  undoOverlayFixedPlugin() {
    this.overlayFixedPlugin = false;
  }

  onAreaChange(areaValue: AreaSimple | null) {
    console.log(areaValue)
    this.selectedArea.set(areaValue)
    this.appStateService.setSelectedArea(areaValue)
    
    const timer = setTimeout(() => {
      this.showFixedPlugin = false;

      clearTimeout(timer);
    }, 600);
  }

  compareByUuid = (a: AreaSimple | null, b: AreaSimple | null): boolean => {
    if (!a || !b) return a === b;
    return a.uuid === b.uuid;
  }

  trackByArea(index: number, area: any) {
    return area.uuid
  }
}
