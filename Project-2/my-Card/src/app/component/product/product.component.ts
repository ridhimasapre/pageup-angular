import { Component, OnInit } from '@angular/core';
// import { ProductType } from './ProductType';
import { ProductService } from '../../Services/Product/product.service';
import { Product } from '../../Interfaces/Product/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
public userlist:Product[]=[];
constructor(private productService : ProductService){}
ngOnInit(): void {
  this.getProducts();
}
public getProducts():void{
  this.productService.getProducts().subscribe(data =>{
    this.userlist=data;
    console.log(data);
  });
}
public deleteProduct(id:string):void{
this.productService.deleteProduct(id).subscribe(data =>{
  this.getProducts();
})  
}
}

