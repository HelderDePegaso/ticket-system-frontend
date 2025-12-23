import { Component, inject, OnInit } from '@angular/core';
import { UserContextService } from '../../../../core/singleton/user.context.service';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AppStateService } from '../../../../core/singleton/app-state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor , AsyncPipe , FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showFixedPlugin: any = false;
  overlayFixedPlugin: any = false;

  appStateService = inject(AppStateService)
  selectedAreaUuid$ = this.appStateService.selectedAreaUuid$
  
  userContextService = inject(UserContextService)
  areas$ = this.userContextService.areas$

  selectedAreaUuid: string = "general"
  
  vm$ = this.userContextService.areas$.pipe(
    map(areas => ({ areas , temAreas: areas.length > 0 }))
  )
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

  onAreaChange (areaValue: string) {
    this.selectedAreaUuid =    areaValue
    this.appStateService.setSelectedAreaUuid(areaValue)
  }

  trackByArea (index: number ,  area: any)  {
    return area.uuid
  }
}
