import { Component, inject, OnInit } from '@angular/core';
import { MenuComponent } from "../components/menu/menu.component";
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { UserHttpclient } from '../../../core/http/user-httpclient/user-httpclient';
import { UserContextService } from '../../../core/singleton/user.context.service';

@Component({
  selector: 'app-dashboard',
  imports: [MenuComponent, RouterOutlet, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  userHttpClient = inject(UserHttpclient)
  userContextService = inject(UserContextService)

  constructor(private router: Router , private activatedRoute: ActivatedRoute) { }

  async ngOnInit():   Promise<void> {
    // Carregar dados necessários para o usuário e depois redirecinar para dash
    const [ profile, myAreas, notifications ] = await Promise.all([
      this.userHttpClient.profile(),
      this.userHttpClient.getMyAreas(), 
      this.userHttpClient.getNotifications()
    ])

    debugger
    this.userContextService.setProfile(profile)
    this.userContextService.setNotifications(notifications)
    this.userContextService.setAreas(myAreas as any)
    this.router.navigate(['dash'], {relativeTo: this.activatedRoute})
  }
}
