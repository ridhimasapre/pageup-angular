import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../Services/Category/category.service';
import { Category, CategoryForm, SubCategoryForm } from '../../Interfaces/Category/Category';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductForm,Product } from '../../Interfaces/Product/product';
import { ProductService } from '../../Services/Product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  constructor(private productservice: ProductService, private router: Router,private activatedroute:ActivatedRoute,private categoryservice:CategoryService) { }
  public myProduct: FormGroup<ProductForm> = this.createForm();
  public isedit=  false;
  public paramId!:string | null;
  public Productuser: Product = {
    id: '',
    productname: '',
    cid: '',
    brandname: '',
    sellingprice: 0,
    actualprice: 0,
    discount: 0
    };
   public UserData:Category[]=[];
   public productData:Product[]=[];
  ngOnInit(): void { 
    this.categoryservice.getCategories().subscribe(data => {
      this.UserData = data;
      // console.log("userData in product",data)
      // if (this.paramId) {
      //   this.isedit = true;
      // }
    });
    this.activatedroute.paramMap.subscribe(data=>{
      this.paramId=(data.get('id')) ;
       this.getId(this.paramId)
      //  console.log(id)
    })
    this.myProduct.valueChanges.subscribe(() => {
      this.Discount();
    });
    // this.getUserList();
    // if (this.paramId!='') {
    //   this.isedit = true;
    
    this.productservice.getProducts().subscribe(data => {
      this.productData = data;
    });
  
    this.activatedroute.paramMap.subscribe(data => {
      this.paramId = data.get('id');
      if (this.paramId) {
        this.getId(this.paramId);
        this.isedit = true;
      }
    });
  
}
private Discount(): void {
  const sellingPrice = this.myProduct.controls.sellingprice.value;
  const actualPrice = this.myProduct.controls.actualprice.value;

  if (sellingPrice != null && actualPrice != null && actualPrice > 0) {
    const discount = ((actualPrice - sellingPrice) / actualPrice) * 100;
    this.myProduct.controls.discount.setValue(parseInt(discount.toFixed(2)), { emitEvent: false });
  } else {
    this.myProduct.controls.discount.setValue(0, { emitEvent: false });
  }
}

public getId( id:string | null):void{
  this.productservice.getProductById(this.paramId).subscribe((data =>{
    this.Productuser=data;
    console.log("data is",this.Productuser)
    this.myProduct.patchValue({
    productname:this.Productuser.productname,
    cid:this.Productuser.cid,
    brandname:this.Productuser.brandname,
    sellingprice:this.Productuser.sellingprice,
    actualprice:this.Productuser.actualprice,
    discount:this.Productuser.discount,
    })
    console.log("patchvalue",this.Productuser)
  }))
 }
//  private getUserList():void{
//   this.productservice.getProducts().subscribe(data =>{
//     this.productData=data
//     console.log("value of data is :",data)
//   })
// }
createForm() {
  return new FormGroup<ProductForm>({
    productname: new FormControl(null, [Validators.required]),
    cid: new FormControl(null, [Validators.required]),
    brandname: new FormControl(null, [Validators.required]),
    sellingprice: new FormControl(null, [Validators.required]),
    actualprice: new FormControl(null, [Validators.required]),
    discount: new FormControl({value:null,disabled:true})
  });
}

public updateProduct():void{
  this.productservice.updateProduct(this.paramId,this.myProduct.value).subscribe(()=>{
    
    alert("Your Product is Updated");
    // this.myProduct.reset();
  });
  this.router.navigateByUrl('/product');
}
public addProduct():void {
  if (this.myProduct.valid) {
    // const { productname, cid, brandname, sellingprice, actualprice, discount } = this.myProduct.value;

    // Check if the product name already exists
    const productExists = this.productData.some(product => 
      (product.productname ?? '').toLowerCase() === (this.myProduct.value.productname??'').toLowerCase()
    );

    if (productExists) {
      alert("Product name already exists.");
      return; // duplicate is found
    }

  if(this.myProduct.valid){
    this.productservice.addProduct(this.paramId,this.myProduct.value).subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigateByUrl("/product");
      }
    })
  }
}

  }


}
