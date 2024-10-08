import { FormControl } from "@angular/forms";

export interface department{
    id:number | null,
    name:string | null,
    createdBy_Name:string | null,
    createdOn:string,
    totalEntriesCount:number,
}
export interface departmentResponse{
    success:boolean,
    status:number,
    message:string | null,
    data:department[] ,
}
export interface generic<T>{
  success:boolean,
  status:number,
  message:string | null,
  data:T
}
export interface departmentForm{
  id:FormControl<number | null>;
    name: FormControl<string | null>;
   }

  
  export interface DepartmentResponseById {
    success: boolean, 
    status: number,
    message: string | null,
    data: department; 
}
  export interface AddDepartmentResponse{
        success: boolean,
        status: number,
        message: string | null,
        data: number
       totalEntriesCount:number

   }
  
   export interface DepartmentRequest {
      name: string
    }
  
    export interface DepartmentDeleteResponse{
      success: boolean,
      status: number,
      message: string |null,
      data: boolean,
    }
    export interface DepartmentPagenatorRequest{
      filterOn:string,
      filterQuery:string,
        sortBy : string,
        isAscending: boolean,
        pageNumber: number,
        pageSize: number,
    
    }
    export interface DepartmentPagenatorResponse{
      success:boolean,
      message:string,
      totalEntriesCount:number,
      data:department[];
    }

//  export interface DepartmentPagenatorRequest{
//   pageIndex: number,
//   pagedItemsCount: number,
//   orderKey: string,
//   sortedOrder: number,
//   search: string,
//  }
//  export interface DepartmentPagenatorResponse{
//     success:boolean,
//     message:string,
//     status:number
//     data:pages;
//   }
// export interface pages{
//   data:department[];
//   totalPages: number,
//   totalItems: number
// }