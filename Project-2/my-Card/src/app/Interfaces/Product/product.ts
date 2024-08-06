import { Form,FormArray,FormControl,FormGroup } from "@angular/forms";
  export interface Product {
     id: string;
     productname: string;
     cid:string;
     brandname: string;
     sellingprice: number;
     actualprice: number;
     discount: number;
        } 
    export interface ProductForm {
        productname: FormControl<string | null>;
        cid:FormControl<string | null>;
         brandname: FormControl<string | null>;
         sellingprice: FormControl<number | null>;
         actualprice: FormControl<number | null>;
         discount: FormControl<number | null>;
       }
    