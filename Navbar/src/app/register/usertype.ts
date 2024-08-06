import { FormArray, FormControl, FormGroup } from "@angular/forms";

 export interface usertype{
    email:FormControl<string | null>,
    password:FormControl<string | null>,
    firstname: FormControl<string | null>,
    lastname: FormControl<string | null>,
 
    info:FormGroup<infoData>,
    arr:FormArray<FormGroup<arrayData>>,
 }

 export  interface infoData{
    address:FormControl<string | null>,
    pincode:FormControl<number | null>

 }
 export interface arrayData{
   sem:FormControl<number | null>,
   branch:FormControl<string | null>,
 }