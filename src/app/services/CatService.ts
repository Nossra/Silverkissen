import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cat } from "../entities/cat";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CatService {
    private url:string = "http://localhost:8080/silverkissen/api/cats/";
    
    constructor(private http: HttpClient) {
        
    }

    private header: any = {
        'Content-Type':'application/json', 'Authorization':  'Bearer ' + localStorage.getItem("token")
   }

    public update(cat: Cat, id: number) : Observable<Cat> {
        let updateUrl = this.url+id+"?";

        if (cat.name != undefined) {
            updateUrl += "&name=" + CatService.stringHelper(cat.name);
        }

        if (cat.sex != undefined) {
            updateUrl += "&sex=" + cat.sex;
        }

        if (cat.color != undefined) {
            updateUrl += "&color=" + CatService.stringHelper(cat.color);
        }

        if (cat.notes != undefined) {
            updateUrl += "&notes=" + CatService.stringHelper(cat.notes);
        }

        if (cat.breed != undefined) {
            updateUrl += "&breed=" + CatService.stringHelper(cat.breed);
        }

        if (cat.born != undefined) {
            updateUrl += "&born=" + cat.born;
        }

        if (cat.vaccinated != undefined) {
            updateUrl += "&vaccinated=" + CatService.booleanHelper(cat.vaccinated);
        }

        if (cat.chipped != undefined) {
            updateUrl += "&chipped=" + CatService.booleanHelper(cat.chipped);
        }

        if (cat.pedigree != undefined) {
            updateUrl += "&pedigree=" + CatService.booleanHelper(cat.pedigree);
        }

        return this.http.patch<Cat>(updateUrl,cat);
    }
    
    public getParents() : Observable<Array<Cat>> {
        let parentsUrl = this.url+'parents';
        return this.http.get<Array<Cat>>(parentsUrl);
    }

    public findById(id: number) : Observable<Cat> {
        let url = this.url + id;
        return this.http.get<Cat>(url);
    }

    public create(cat: Cat) : Observable<Cat> {
        console.log("method called in catservice..")
        return this.http.post<Cat>(this.url, cat);
    }

    public static stringHelper(value:string) : string {
        let helpedString: string = "";
        for (let i = 0; i < value.length; i++) {
            helpedString += value[i].replace(" ", "+");
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
}