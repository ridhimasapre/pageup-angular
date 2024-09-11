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
}
  export interface TaskByIdData{
  success:boolean,
  message:string,
  data:TaskById[],
  totalEntriesCount:number;
}
export interface AllTaskByIdRequest{
  filterQuery: string,
  sortBy: string,
  isAscending: boolean,
  pageNumber: number,
  pageSize: number,
  // startDate: string,
  // endDate: string,
  status:  [] | null,
  type:  [] | null,
  assigned: boolean,
  assignedTo: [] | null,
  // sprintId: number,
  projectId: number,
  // parentId: number
}
export interface TaskByIdsTT{
  id: number,
  name: string,
  assigned_From: string,
  assigned_To: string,
  assignedById: number,
  assignedToId: number,
  createdOn: string,
  description: string,
  status: number,
  isActive: boolean,
  projectId: number,
  parentId: number,
  sprintId: number,
}
export interface TaskById{
      childTasks: [{ id: number; name: string; assigned_From: string; assigned_To: string; assignedById: number; assignedToId: number; createdOn: string; description: string; status: number; isActive: boolean; parentId: number; projectId: number; sprintId: number; type: number; estimatedHours: number; remainingHours: number; }];
      id: number,
      name: string,
      assigned_From: string,
      assigned_To: string,
      assignedById: number,
      assignedToId: number,
      createdOn: string,
      description: string,
      status: number,
      isActive: boolean,
      projectId: number,
      type:number,
      childShow:boolean;
      // parentId: number,
      // sprintId: number,
}
export interface ChildById{
  id: number,
  name: string,
  assigned_From: string,
  assigned_To: string,
  assignedById: number,
  assignedToId: number,
  createdOn: string,
  description: string,
  status: number,
  isActive: boolean,
  projectId: number,
  parentId: number,
  // sprintId: number,
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
  export interface taskData{
    id: number,
   name: string,
   description: string,
   status: Status,
   projectId: number,
   taskType: number,
   assignerName: string,
   assigneeName: string;
   createdOn: string,
 }
 export enum Status{
      active = 0,
      pending = 1,
      Completed = 2
  }
  export enum Type{
    epic=0,
    task=1,
    bug=2,
    userstory=3,
    feature=4
  }
  export interface ParentTaskRequest{
    projectId:number,
    parentId:number,
  }
  export interface ParentTaskResponse{
    
      success: boolean,
      message: string,
      data: [
        {
          id: number,
          name: string,
          assigned_From: string,
          assigned_To: string,
          assignedById: number,
          assignedToId: number,
          createdOn:string,
          description:string,
          status:number,
          isActive:boolean,
          parentId:number,
          projectId:number,
          sprintId: number,
          type: number,
          estimatedHours: number,
          remainingHours: number,
        }
      ],
      totalEntriesCount: number,
    }
   export  interface parentChild {
      id: number;
      name: string;
      description: string;
      createdOn: Date;
      childShow: boolean;
      children: Task[]; 
    }
    export interface TaskAddRequest{
      success:boolean,
      message:string,
      data:AddTaskResponse,
  }
  export interface AddTaskResponse{
  name: FormControl<string|null>,
  description: FormControl<string|null>,
  assignedToId:FormControl<number|null>,
  projectId:FormControl<number|null>,
  type:FormControl<Type|null>,
  status:FormControl<Status|null>,
  estimateHours:FormControl<number|null>,
    }
    