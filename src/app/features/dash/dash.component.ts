import { Component, inject, OnInit, Type } from '@angular/core';
import { AreaChartComponent } from "../../entities/dashboard/components/charts/components/area-chart/area-chart.component";
import { GeneralChartComponent } from '../../entities/dashboard/components/charts/components/general-chart/general-chart.component';
import { AppStateService } from '../../core/singleton/app-state.service';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgComponentOutlet, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [AreaChartComponent, GeneralChartComponent , NgIf , NgComponentOutlet , AsyncPipe],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent implements OnInit {

  appStateService = inject(AppStateService)
  selectedComponent$: Observable<Type<AreaChartComponent | GeneralChartComponent>> = this.appStateService.selectedAreaUuid$.pipe(
    map((uuid: any) => {
      if (!uuid || uuid === "general") return GeneralChartComponent
      return AreaChartComponent
    })
  );


  ngOnInit(): void {
    
  }


}
