import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cat } from "../entities/cat";
import { Observable } from "rxjs/Observable";
import { Helpers } from "../Helpers/helper";

@Injectable()
export class CatService {
    private testUrl:string = "https://localhost:44381/api/cats/";
    
    constructor(private http: HttpClient) {
        
    }

    private header: any = {
        'Content-Type':'application/json', 'Authorization':  'Bearer ' + localStorage.getItem("token")
   }

    // public update(cat: Cat, id: number) : Observable<Cat> {
    //     let updateUrl = this.testUrl+id+"?";

    //     if (cat.name != undefined) {
    //         updateUrl += "&name=" + Helpers.stringHelper(cat.name);
    //     }

    //     if (cat.sex != undefined) {
    //         updateUrl += "&sex=" + cat.sex;
    //     }

    //     if (cat.color != undefined) {
    //         updateUrl += "&color=" + Helpers.stringHelper(cat.color);
    //     }

    //     if (cat.notes != undefined) {
    //         updateUrl += "&notes=" + Helpers.stringHelper(cat.notes);
    //     }

    //     if (cat.breed != undefined) {
    //         updateUrl += "&breed=" + Helpers.stringHelper(cat.breed);
    //     }

    //     if (cat.birthdate != undefined) {
    //         updateUrl += "&born=" + cat.birthdate;
    //     }

    //     if (cat.vaccinated != undefined) {
    //         updateUrl += "&vaccinated=" + Helpers.booleanHelper(cat.vaccinated);
    //     }

    //     if (cat.chipped != undefined) {
    //         updateUrl += "&chipped=" + Helpers.booleanHelper(cat.chipped);
    //     }

    //     if (cat.pedigree != undefined) {
    //         updateUrl += "&pedigree=" + Helpers.booleanHelper(cat.pedigree);
    //     }

    //     return this.http.patch<Cat>(updateUrl,cat);
    // }
    
    public getParents() : Observable<Array<Cat>> {
        let parentsUrl = this.testUrl+'parents';
        return this.http.get<Array<Cat>>(parentsUrl);
    }

    public putUpdate(cat:Cat): Observable<Cat> {
        return this.http.put<Cat>(this.testUrl+cat.id, cat)
    }

    public findById(id: number) : Observable<Cat> {
        let url = this.testUrl + id;
        return this.http.get<Cat>(url);
    }

    public create(cat: Cat) : Observable<Cat> {  
        console.log(cat);
        cat.pedigree = Helpers.booleanHelperForCheckBoxes(cat.pedigree);
        cat.chipped = Helpers.booleanHelperForCheckBoxes(cat.chipped);
        cat.vaccinated = Helpers.booleanHelperForCheckBoxes(cat.vaccinated);
        return this.http.post<Cat>(this.testUrl, cat);
    }

    public delete(cat: Cat) : Observable<Cat> {
        let url = this.testUrl+cat.id;
        return this.http.delete<Cat>(url);
    }
}