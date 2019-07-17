import { Injectable } from "@angular/core";

@Injectable()
export class Helpers {
    public static stringHelper(value:string) : string {
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

    public static booleanHelperForCheckBoxes(value) : boolean {
        if (value == null) {
            return false
        }
        return true;
    } 

    public static lineBreakHelper(value:string) : string {
        let helpedString: string = "";
        for (let i = 0; i < value.length; i++) {
            helpedString += value[i].replace("\n", "<br>");
        }
        return helpedString;
    }

    public static dateHelper(date:Date):string {
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');  
        var yyyy = String(date.getFullYear()).padStart(4, '0');
    
        return yyyy + '-' + mm + '-' + dd;
    }

    public static statusHelper(value:number) : string {
        switch (value) {
            case 1: return "Aktiv";
            case 2: return "Tidigare kull";
            case 0: return "Arkiverad kull";
        }
    }
}

