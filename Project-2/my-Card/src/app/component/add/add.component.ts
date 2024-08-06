import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/Category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category, CategoryForm, SubCategoryForm } from '../../Interfaces/Category/Category';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
 public paramId!:string | null;
 public myCategory: FormGroup<CategoryForm> = this.createForm();
 public  updatedData:Category={
   id:0,
   name:'',
   subCategory:[]
  }
  public UserData:Category[]=[];
  public isEdit =false;
  
  constructor(private categoryservice: CategoryService, private router: Router,private activatedroute:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(data=>{
      this.paramId=(data.get('id'));
       this.getId(this.paramId)
    })
    
    this.getUserList();
    if (this.paramId ) {
      this.isEdit = true;
    }
   }
  public getId(id:string | null):void{
    this.categoryservice.getCategoryById(id).subscribe((data =>{
      this.updatedData=data;
      this.myCategory.patchValue({
        id:this.updatedData.id,
        name:this.updatedData.name,
        subCategory:this.updatedData.subCategory
      })
      console.log("data is",data)
      console.log("data is",this.updatedData)
    }))
   }
  
  private getUserList():void{
    this.categoryservice.getCategories().subscribe(data =>{
      this.UserData=data
      console.log("value of data is :",data)
    })
  }
   
   public createForm() {
    return new FormGroup<CategoryForm>({
      id: new FormControl(0),
      name: new FormControl(null, [Validators.required]),
      subCategory: new FormArray<FormGroup<SubCategoryForm>>([
        new FormGroup<SubCategoryForm>({
          id: new FormControl(0),
          name: new FormControl(null)
        })
      ])
    });
  }


public addCategory(): void {
  const { id, name, subCategory } = this.myCategory.value;

  if (!name) {
    alert("Category name is required.");
    return;
  }

  const categoryExists = this.UserData.some(category => (category.name ?? '').toLowerCase() === name.toLowerCase());

  if (categoryExists) {
    alert("Category name already exists.");
    this.myCategory.reset();
    return;
  }

  this.categoryservice.addCategory({ name, subCategory }).subscribe({
    next: (data) => {
      console.log(data);
      this.router.navigateByUrl("/category");
    }
  });
}

  
public update():void{
  this.categoryservice.updateCategory(this.paramId,this.myCategory.value).subscribe(()=>{
    
    alert("Your Category is Updated");
  });
  this.router.navigateByUrl('/category')
}
  public addDetail():void {
    let currArr = this.myCategory.controls.subCategory;
    let moreDetail = new FormGroup<SubCategoryForm>({
      id: new FormControl(null),
      name: new FormControl('')
    });
    currArr.push(moreDetail)
    console.log(currArr)
  }
 public remove(i: number):void {
    let arr = this.myCategory.controls.subCategory;
    arr.removeAt(i);
  }
}
