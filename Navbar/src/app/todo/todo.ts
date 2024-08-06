//class Todo 
export class Todo {
    private id:number;
    private title: string ;
    private desciption:string;
    public checked:boolean;
    // public porjhsvf!: boolean; defined
    // public porjhsvf?: boolean; undefined
    //constructor used when not defined directly

    constructor(id1:number,title1:string,desciption1:string,checked1:boolean){
        this.id=id1;
        this.title=title1;
        this.desciption=desciption1;
        this.checked=checked1
    }

    // getter and setter for encrupted
    public getId(){    
        return this.id;
    }
    public getTitle(){
        return this.title;
    }
    public getDesciption(){
        return this.desciption;
    }
    public getChecked(){
        return this.checked;
    }
    public setId(id:number){
        this.id=id;
    }
    public setTitle(title:string){
        this.title=title;
    }
    public setdesciption(desciption:string){
        this.desciption=desciption;
    }
    public setChecked(checked:boolean){
        this.checked=checked;
    }
    public isChecked():boolean{
        return this.checked
    }
    public toggleChecked():void{
        this.checked=!this.checked
    }

  }