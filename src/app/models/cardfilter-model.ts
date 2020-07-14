

//what kind of filters exactly?
export class CardFilter {
    id: number;
    name: string;
    active: boolean = false;
    evalMethod: any;

    constructor(id:number, name:string){
        this.id = id;
        this.name = name;
        // Attempted to implement better solution, abandoned for time constraints
        //this.evalMethod = evalMethod;
    }

    evalulate(){
        return this.evalMethod();
    }
    
}