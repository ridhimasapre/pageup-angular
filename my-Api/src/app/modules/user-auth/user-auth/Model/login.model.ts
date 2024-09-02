export interface LoginResponse<T> {
    success: boolean;
    status: number; 
    message: string;
    data: T | null;
  }  
  export interface LoginUser {
    employee: NeedEmpployeeType;
    token: string | null;
  }
  export interface LoginRequest {
    username: string;
    password: string;
  }
  export interface EmployeeType {
    createdBy: number | null;
    updatedBy: number | null;
    createdOn: string | null;
    updatedOn: string | null;
    id: number | null;
    name: string | null;
    departmentName: string | null;
    managerName: string | null;
    role: Role[];
    salary: number;
    departmentId: number | null;
    managerId: number | null;
  }
  export enum Role {
    Employee = 1,
    Admin = 2,
    SuperAdmin = 3
  }
  export interface NeedEmpployeeType{
    id: number;
    name: string;
    role: Role;
    isManager: boolean;
  }
  