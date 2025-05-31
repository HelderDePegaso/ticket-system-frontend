import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './user.route'
import { UserComponent } from './component/user/user.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, UserComponent
  ],
  providers: [
    routes
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
