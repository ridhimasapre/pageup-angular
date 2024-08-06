import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  aboutId:any;
  constructor(private route: ActivatedRoute){}
  ngOnInit():void{
    console.log(" About id number is",this.route.snapshot.paramMap.get('id'));
    this.aboutId=this.route.snapshot.paramMap.get('id');
  }

}
