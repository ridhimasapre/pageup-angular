import { Form,FormArray,FormControl,FormGroup } from "@angular/forms";
export interface CategoryForm {
    id:FormControl<number| null>;
    name: FormControl<string | null>;
    subCategory: FormArray<FormGroup<SubCategoryForm>>;
}
export interface SubCategoryForm {
    id: FormControl<number| null>;
    name: FormControl<string | null>;
}

//main category interface

export interface Category {
    id: number;
    name: string | null;
    subCategory: SubCategory[];
}
export interface SubCategory {
    id:number ;
    name: string | null;
}