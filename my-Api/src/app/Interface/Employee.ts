import { FormControl } from "@angular/forms";


export interface Employee {
  createdBy: number,
  updatedBy: number | null, 
  createdOn: string ,
  updatedOn: string | null,
  id: number | null,
  name: string | null,
  departmentName: string | null, 
  managerName: string | null,
  role: EmployeeRole,
  salary: number,
  adminName:string,
  adminId:number,
  departmentId: number | null,
    managerId: number | null,
    isActive:boolean
}

export interface EmployeeResponse {
  success: boolean;
  status: number; 
  message: string;
  data: Employee[];
}

export interface GetEmployeeResponseById {
  success: boolean;
  status: number; 
  message: string;
  data: Employee;
}

export interface EmployeeForm {
  name: FormControl<string |null>;
  salary: FormControl<number |null>;
  departmentName: FormControl<string|null>;
  managerName: FormControl<string |null>;
  departmentId: FormControl<number|null>;
  managerId: FormControl<number|null>;
  role: FormControl<EmployeeRole|null>;
} 
export enum EmployeeRole {
  Employee = 0,
  Admin,
  SuperAdmi,
}
export interface AddEmployeeRequest{
  name: string,
  salary: number,
  departmentId: number|null,
  departmentName:string|null,
  managerId: number|null,
  managerName:string|null,
  role: number
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
  data: Employee;
}

export interface UpdateEmployeeRequest{
  username: string,
  password: string,
  name: string,
  salary: number,
  departmentId: number|null,
  managerId: number|null,
  role: number
}

export interface AddEmployeeResponse{
  success: boolean,
  status: number,
  message: string,
  data: number
}

export interface EmployeePagenatorRequest{
  filterOn:string,
  filterQuery:string,
  sortBy : string,
  isAscending: true,
  pageNumber: 0,
  pageSize: 0,

}
export interface EmployeePagenatorResponse{
  success:boolean,
  message:string,
  totalEntriesCount:number,
  data:Employee[];
}
export interface EmployeeResponseById {
  success: boolean;
  status: number; 
  message: string;
  data: Employee;
}