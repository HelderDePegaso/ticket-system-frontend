import { Component, inject } from '@angular/core';
import { UserContextService } from '../../../../../../core/singleton/user.context.service';
import { filter , find, map } from 'rxjs/operators';
import { AppStateService } from '../../../../../../core/singleton/app-state.service';
import { AsyncPipe, NgIf , DatePipe , TitleCasePipe } from '@angular/common';
import { DateOrDashPipe } from '../../../../../../core/pipe/date-or-dash.pipe';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [AsyncPipe  , NgIf , DateOrDashPipe , TitleCasePipe],
  templateUrl: './area-chart.component.html',
  styleUrl: './area-chart.component.css'
})
export class AreaChartComponent {

  userContextService = inject(UserContextService)
  appStateService = inject(AppStateService)

  area$ = combineLatest([
    this.appStateService.selectedArea$, 
    this.userContextService.areas$
  ]).pipe(
    map(([area]) => {
      return area
    })
  )

  profile$ = this.userContextService.profile$
}
