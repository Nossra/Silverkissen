import { Cat } from "./cat";
import { LitterStatus } from "./LitterStatus";

export class Litter {
    public id:number;
    public breed:string;
    public born: Date;
    public numberOfKittens:number;
    public parents:Array<Cat>;
    public kittens:Array<Cat>;
    public notes:string;
    public pedigree:boolean;
    public vaccinated:boolean;
    public chipped:boolean;
    public readyAt: Date
    public displayPicture:string;
    public status: string;

    constructor() {
        this.parents = [];
    }
}

