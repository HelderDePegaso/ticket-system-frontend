import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateOrDash'
})
export class DateOrDashPipe implements PipeTransform {
  
  private datePipe: DatePipe = new DatePipe('pt-PT');

  transform(value: string | Date | null, format = 'dd/MM/yyyy'): unknown {
    debugger
    const errorDate = '--/--/----';
    if(!value) return errorDate;

    const datePipeFormat = this.datePipe.transform(value, format)
    return datePipeFormat ?? errorDate;
  }

}
