import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit ,  AfterContentInit {

  ownerUUID: string = ""
  
  constructor(private activatedRoute: ActivatedRoute) {

  }
  ngAfterContentInit(): void {
    console.log("Load done!")
    console.log("Tem uuid: " + this.ownerUUID)

    console.log(this.ownerUUID)
  }
  ngOnInit(): void {
  
    this.activatedRoute.params.subscribe(uuid => {
      this.ownerUUID = uuid["uuid"];
    })
  }

  

}
