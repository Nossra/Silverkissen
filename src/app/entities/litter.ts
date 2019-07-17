import { Cat } from "./cat";
import { LitterStatus } from "./LitterStatus";
import { Litter_Parent } from "./litter_parent";

export class Litter {
    public id:number; 
    public birthDate: Date;
    public amountOfKids:number;
    public parents:Array<Litter_Parent>; 
    public notes:string;
    public pedigree:boolean;
    public vaccinated:boolean;
    public chipped:boolean;
    public sverak:boolean;
    public readyDate: Date
    public displayPicture:string|any;
    public litterImages:Array<string|any>;
    public status: LitterStatus;
    public formattedReadyDate:string;
    public formattedBirthDate:string;
    public statusText:string;
    public kittens:Array<Cat>;
    constructor() {
        this.parents = [];
        this.litterImages = [];
        this.kittens = [];
    }
}

