import { FormControl } from "@angular/forms";

export interface department{
    id:number | null,
    name:string | null,
    createdBy:number | null,
    updatedBy:number,
    createdOn:string,
    updatedOn:string | null,
    isActive:boolean
}
export interface departmentResponse{
    success:boolean,
    status:number,
    message:string | null,
    data:department[] ,
}
export interface departmentForm{
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
    // export interface DepartmentPagenatorRequest{
    //     sortBy : string,
    //     isAscending: boolean,
    //     pageNumber: number,
    //     pageSize: number,
    
    // }
    // export interface DepartmentPagenatorResponse{
    //   success:boolean,
    //   message:string,
    //   totalEntriesCount:number,
    //   data:department[];
    // }

 export interface DepartmentPagenatorRequest{
  pageIndex: number,
  pagedItemsCount: number,
  orderKey: string,
  sortedOrder: number,
  search: string,
 }
 export interface DepartmentPagenatorResponse{
    success:boolean,
    message:string,
    status:number
    data:pages;
  }
export interface pages{
  data:department[];
  totalPages: number,
  totalItems: number
}