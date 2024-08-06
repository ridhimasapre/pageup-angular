import { Component } from '@angular/core';
import { UserdataService } from './Service/userdata.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Navbar';
  // userData:any;
  // constructor(private userdata:UserdataService){
  //   console.log("userData" ,userdata.user());
  //   this.userData=userdata.user();
  // }
}
