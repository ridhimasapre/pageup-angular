import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../Service/userdata.service';
import {LoginInfo} from './LoginInfo'
 @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  userlist:LoginInfo[]=[];
  

  constructor(private userservice:UserdataService){}
  
ngOnInit(): void {
this.userservice.getUserdata().subscribe(data =>{
    this.userlist=data;
console.log(this.userlist)
});
}
 
addName(){
  const newName:any={name:"ram" ,surname:"sharma"};
  this.userservice.createUserdata(newName).subscribe(data =>{
    this.userlist=data;
    console.log(data);
  })
}
upDateName(userId:string){
  const newData:any ={id:userId, name:"tanu",surname:"jain"};
  this.userservice.updateUserdata(userId,newData).subscribe(data =>{
    console.log(data);
  })
}

deleteName(userId:string){
  this.userservice.deleteUserdata(userId).subscribe(data =>{
    // this.userlist=data;
    console.log(data);
  })
}
}
