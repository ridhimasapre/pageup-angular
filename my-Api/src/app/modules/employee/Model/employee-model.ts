import { FormControl } from "@angular/forms";
export interface Employee {
  userName:string,
  password:string,
  createdBy: number,
  updatedBy: number | null, 
  createdOn: string ,
  updatedOn: string | null,
  id: number ,
  name: string ,
  departmentName: string , 
  role: EmployeeRole,
  salary: number,
  adminName:string,
  adminId:number,
  departmentId: number | null,
    // isActive:boolean
}
export interface EmployeeResponse {
  success: boolean;
  status: number; 
  message: string;
  data: Employee[];
}
export interface EmployeeResponseById {
  success: boolean;
  status: number; 
  message: string;
  data: Employee;
}
export interface EmployeeForm{
  userName:FormControl<string|null>,
  password: FormControl<string |null>;
  name: FormControl<string |null>;
  salary: FormControl<number |null>;
  departmentId: FormControl<number |null>;
  adminId: FormControl<number |null>;
  role: FormControl<EmployeeRole |null>;
}
export enum EmployeeRole {
  Employee = 0,
  Admin=1,
  SuperAdmin=2,
}
export interface AddEmployeeRequest{
  userName: string | null | undefined,
  password: string | null | undefined,
  name: string | null | undefined ,
  salary: number | null ,
  departmentId: number | null | undefined,
  adminId: number | null | undefined,
  role: number | null | undefined,
}

export interface AddEmployeeResponse{
  success: boolean,
  message: string,
  data: number,
  totalEntriesCount:number
}
export interface RoleCountResponse{
  success: boolean,
  message: string,
  data: number,
}
export interface EmployeeDeleteResponse {
  success: boolean;
  status: number; 
  message: string;
  data: boolean;
}

export interface UpdatedEmployeeResponse{
  success: boolean,
  status: number,
  message: string,
  data: number;
}

export interface UpdateEmployeeRequest{
  userName: string,
  password: string,
  name: string,
  salary: number,
  departmentId: number|null,
  adminId: number|null,
  role: number
}
export interface EmployeePagenatorRequest{
  filterOn:string,
  filterQuery:string,
  sortBy : string,
  isAscending: boolean,
  pageNumber: number,
  pageSize: number,
  additionalSearch:string,
  // startDate:string,
  // endDate:string,
}
export interface EmployeePagenatorResponse{
  success:boolean,
  message:string,
  totalEntriesCount:number,
  data:Employee[];
}
