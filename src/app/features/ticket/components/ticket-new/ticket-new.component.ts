import { Component, inject, Renderer2 } from '@angular/core';
import { HorizontalDragScrollDirective } from '../../../../core/directive/horizontal-drag-scroll-directive.directive';
import { FormGroup, FormControl, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { min } from 'rxjs';
import { TicketHttpclient } from '../../../../core/http/ticket-httpclient/ticket-httpclient';
import { UserContextService } from '../../../../core/singleton/user.context.service';

@Component({
  selector: 'app-ticket-new',
  standalone: true,
  imports: [
    HorizontalDragScrollDirective, 
    ɵInternalFormsSharedModule , 
    ReactiveFormsModule  ,  
    NgFor ,
    NgIf , 
    AsyncPipe ,
    TitleCasePipe
  ],
  templateUrl: './ticket-new.component.html',
  styleUrl: './ticket-new.component.css'
})
export class TicketNewComponent {

  ticketHttpClient = inject(TicketHttpclient);
  userContextService = inject(UserContextService);

  form = new FormGroup({
    title: new FormControl('' , [Validators.required ,  Validators.minLength(6)]),
    description: new FormControl('' , [Validators.required ]),
    relatedDate: new FormControl(''),
  })

  areas$ = this.userContextService.areas$

  selectedArea: {name: string, uuid: string}  |  null = null

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    
  }

  cardSelected(cardId: string) {
    this.deselectOldCard()
    const card = this.renderer.selectRootElement(`#area-${cardId}` , true);


    this.renderer.addClass(card, 'is-selected');
  }


  deselectCard(cardId: string) {
    const card = this.renderer.selectRootElement(`#area-${cardId}` , true);
    this.renderer.removeClass(card, 'is-selected');
    this.selectedArea = null;
  }

  deselectOldCard() {
    if  (!this.selectedArea) return
    const oldCard = this.renderer.selectRootElement(`#area-${this.selectedArea?.uuid}` , true);
    this.renderer.removeClass(oldCard, 'is-selected');
  }

  areaClick(area: any) {
    
    console.log(area);

    this.cardSelected(area.uuid);
    this.selectedArea = area
  }

  onInputFocus(event: FocusEvent) {
    console.log(event);
    (event.target as HTMLElement)?.parentElement?.classList.add('is-focused'); 
  }

  onInputFocusOut(event:  FocusEvent) {
    console.log(event);
    (event.target as HTMLElement)?.parentElement?.classList.remove('is-focused');
  }


  onInput() {
    
  }

  onSubmit() {
    if (this.form.invalid) return;
    if (this.selectedArea === null) alert('Selecione uma area');
    debugger
    const data = {
      ...this.form.value,
      areaUuid: this.selectedArea?.uuid
    };
    
    
    this.ticketHttpClient.createTicket(data).then(() => { 
      alert('Ticket criado com sucesso');
    }).catch(() => {
      alert('Erro ao criar ticket');
    }).finally(() => {
      this.form.reset();
      this.deselectOldCard();
      this.form.markAsPristine();
      this.form.markAsUntouched();
    })
  }

  
  
}
