import { FormControl, FormGroup } from "@angular/forms";

export interface Task{
    id:number,
    name:string,
    assigned_From:string,
    assignedById:number,
    assignedToId:number,
    assigned_To:string,
    createdOn:string,
    description:string,
    status:TaskStatus,
    isActive:boolean
}
export interface TaskResponse<T>{
    success:boolean,
    message:string,
    data:T,
    totalEntriesCount:number,
}
export enum TaskStatus{
    pending=0,
    Running=1,
    Completed=2
}
export interface PagenatorRequest{
    filterOn:string,
    filterQuery:string,
    sortBy : string,
    isAscending: boolean,
    pageNumber: number,
    pageSize: number,
  
  }