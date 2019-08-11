import { Image } from "./image";

export class Cat {
    public id:number; 
    public sex:string;
    public name:string;
    public breed:string;
    public age:number;
    public color:string;
    public pedigree:boolean;
    public vaccinated:boolean;
    public chipped:boolean;
    public notes:string;
    public parent:boolean;
    public birthdate:Date;
    public formattedBirthDate:string;
    public Images:Array<Image>
    public catLitterId:number;
    constructor() {
        this.Images = [];
    }
}