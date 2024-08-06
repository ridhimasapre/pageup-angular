import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstComponentComponent } from "./first-component/first-component.component";

import { producerAccessed } from "@angular/core/primitives/signals";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FirstComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  // title = 'ToDo List';
  // list:any[]=[];

  // name:string="ridhi";
  // age:number=21;
  // onClick(){
  //   console.log("tur tur");
    
  //   this.name="tur tur";
  // }
//   addTask(data:string)
// {

// this.list.push({name:data});
// console.log(this.list);
// }

// removeTodo(id:number){
//   console.log(id);
//   this.list=this.list.filter(data=>data.id!==id)
// }


export enum Role {
    Admin = 1,
    User = 2
}

interface category {
    id: number,
    name: string,
    createdAt: Date,
    updatedAt?: Date,
    createdBy: Role,
    updatedBy?: Role
}

interface product {
    id: number,
    name: string,
    sellerId: number,
    createdAt: Date,
    updatedAt?: Date,
    createdBy: Role,
    updatedBy?: Role
}

interface Methods {
    add(nameval: string, createBy: Role): void;
}

class Base<T> {
    public valueArray: T[] = [];
    public index: number = 0;

    find(id: number) {
        console.log(this.valueArray[id]);
    }

    update(id: number, nameVal: string, updatedByOwner: Role, createdByOwner: Role) {

        this.valueArray[id] = {
            ...this.valueArray[id],
            name: nameVal,
            updatedAt: new Date,
            updatedBy: updatedByOwner,
            createdBy: createdByOwner
        };

        this.find(id);
    }


    delete(number: number) {
        if (number >= 0 && number < this.valueArray.length) {
            this.valueArray.splice(number, 1);
            console.log("deleted");
        }
    }

    getAll (): T[] {
        return this.valueArray;
    }
}

export class Category extends Base<category> implements Methods {

    add(nameval: string, createBy: Role) {
        const newCategory = {
            id: this.index,
            name: nameval,
            createdBy: createBy,
            createdAt: new Date
        }
        this.index++;
        this.valueArray.push(newCategory);
    }
}

export class Product extends Base<product> implements Methods {

    add(nameval: string, createBy: Role) {
        const newCategory = {
            id: this.index,
            name: nameval,
            sellerId: this.index,
            product: this.index,
            createdBy: createBy,
            createdAt: new Date
        }
        this.index++;
        this.valueArray.push(newCategory);
    }
}
}


