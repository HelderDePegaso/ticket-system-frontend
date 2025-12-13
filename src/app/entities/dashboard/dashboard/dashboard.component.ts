import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../components/menu/menu.component";
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  imports: [MenuComponent, RouterOutlet, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate(['dash'], {relativeTo: this.activatedRoute})
  }
}
