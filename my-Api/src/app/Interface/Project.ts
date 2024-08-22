import { FormControl,FormArray, FormGroup } from "@angular/forms"


export interface Project{
    id:number,
    name:string | null,
    description:string | null,
    createdOn:string,
    createdBy:string,
    UpdatedOn:string,
    UpdatedBy:string,
    status:ProjectStatus,
    projectEmployee:projectEmployeeitem[]
}
export interface projectEmployeeitem{
    id:number,
    name:string,
}
export interface ProjectResponse<T>{
    success:boolean,
    message:string,
    data:T,
    totalEntriesCount:number,
}
export interface ProjectForm{
    name:FormControl<string | null>
    description:FormControl<string | null>,
    status:FormControl<number |null>,
    // member: FormControl<number | null>;
    projectEmployee:FormArray<FormGroup<subMembersForm>>
}
export interface subMembersForm {
    id:FormControl<number|null>;
    name: FormControl<string | null>;
}
export enum ProjectStatus{
  created=0,
  running=1,
  completed=2
}

export interface AddRequest{
    name: string,
    description: string |null,
    status: number | null
    member: number | null | undefined,
  }
  export interface Members{
    employeeId: number
  }
  export interface PagenatorRequest{
    filterOn:string,
    filterQuery:string,
    sortBy : string,
    isAscending: boolean,
    pageNumber: number,
    pageSize: number,
    additionalSearch:string
  }