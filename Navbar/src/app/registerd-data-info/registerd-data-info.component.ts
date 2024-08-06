import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registerd-data-info',
  templateUrl: './registerd-data-info.component.html',
  styleUrl: './registerd-data-info.component.css'
})
export class RegisterdDataInfoComponent implements OnInit {
  registeredUser: any;
  constructor(){}
  ngOnInit(): void {
    const storedData = localStorage.getItem('registeredUser');
  this.registeredUser = storedData ? JSON.parse(storedData) : null;
  // const storeData=localStorage.getItem('registerUser');
  //   if(storeData !=null){
  //     this.registeredUser=storeData ? JSON.parse(storeData):null;
  //   }
  }
}
