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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Carregar dados necessários para o usuário e depois redirecinar para dash
    this.fetchInitialData().then(data => {
      const [profile, /*myAreas,*/ notifications] = data
      //debugger
      this.userContextService.setProfile(profile)
      this.userContextService.setNotifications(notifications)
      this.userContextService.setAreas([] as any)

      sessionStorage.setItem('pna', JSON.stringify(data))


      
    }).catch(error => {
      console.error(error)
      // TODO Usar o toast do Material Dashboar para informar que certos dados não poderam ser carregados
    }).finally(() => {
      console.log('Dashboard carregado com sucesso! Redirecionando para dash ')
      if (this.router.url === '/main') {
        this.router.navigate(['/main/dash'])
      }
    })


   
  }

  async fetchInitialData(): Promise<any[]> {
    try {
      // TODO Mudar com buscas em idb / tanstackquery e esquecer o sessionStorage
      const stored = sessionStorage.getItem('pna');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.length) return parsed;
      }

      const data = await Promise.all([
        this.userHttpClient.profile(),
        //this.userHttpClient.getMyAreas(),
        this.userHttpClient.getNotifications()
      ]);

      sessionStorage.setItem('pna', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


}
