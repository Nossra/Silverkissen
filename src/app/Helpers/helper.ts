import { Injectable } from "@angular/core";

@Injectable()
export class Helpers {
    public stringHelper(value:string) : string {
        let helpedString: string = "";
        for (let i = 0; i < value.length; i++) {
            helpedString += value[i].replace(" ", "&");
        }
        return helpedString;
    }
    
    public static booleanHelper(value:boolean) : number {
        switch(value) {
            case true: 
                return 1;
            case false: 
                return 0;
        }   
    }

    public static lineBreakHelper(value:string) : string {
        let helpedString: string = "";
        for (let i = 0; i < value.length; i++) {
            helpedString += value[i].replace("\n", "<br>");
        }
        return helpedString;
    }
}

