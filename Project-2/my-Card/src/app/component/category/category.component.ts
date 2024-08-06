import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormArray } from '@angular/forms';
import { Category } from '../../Interfaces/Category/Category';
import { CategoryService } from '../../Services/Category/category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
public  categorylist:Category[]=[]; 

  constructor(private categoryService : CategoryService){}

  ngOnInit(): void {
    this.getCategory();
  }
   public getCategory():void {
    this.categoryService.getCategories().subscribe(data =>{
      this.categorylist = data;
    });
  }

   public deleteCategory(id:number):void {
    this.categoryService.deleteCategory(id).subscribe(data =>{
      this.getCategory();
    })
}
}
