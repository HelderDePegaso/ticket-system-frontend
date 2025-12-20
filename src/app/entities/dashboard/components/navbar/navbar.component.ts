import { Component, inject, OnInit } from '@angular/core';
import { UserContextService } from '../../../../core/singleton/user.context.service';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor , AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showFixedPlugin: any = false;
  overlayFixedPlugin: any = false;

  userContextService = inject(UserContextService)
  areas$ = this.userContextService.areas$
  
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
}
