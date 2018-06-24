import { Cat } from "./cat";

export class Litter {
    public id:number;
    public breed:string;
    public born: Date;
    public numberOfKittens:number;
    public numberOfFemales: number;
    public numberOfMales: number;
    public parents:Array<Cat>;
    public kittens:Array<Cat>;
    public notes:string;
    public pedigree:boolean;
    public vaccinated:boolean;
    public chipped:boolean;
    public readyAt: Date
    public displayPicture:string;

    constructor() {
        this.parents = [];
    }
}