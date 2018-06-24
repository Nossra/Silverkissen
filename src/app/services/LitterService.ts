import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Cat } from "../entities/cat";
import { Litter } from "../entities/litter";

@Injectable()
export class LitterService {
    private url:string = "http://localhost:8080/silverkissen/api/litters/";
    
    constructor(private http: HttpClient) {

    }

    private header: any = {
        'Content-Type':'application/json', 'Authorization':  'Bearer ' + localStorage.getItem("token")
   }
    
    public getAll() : Observable<Array<Litter>> {
        return this.http.get<Array<Litter>>(this.url);
    }

    public getLitterById(id: number) : Observable<Litter> {
        return this.http.get<Litter>(this.url+id);
    }

    public update(litter: Litter, id:number) : Observable<Litter> {
        let updateUrl = this.url+id+"?";

        if (litter.notes != null) {
            let notes: string = LitterService.stringHelper(litter.notes);
            updateUrl += "&notes=" +notes;
        }
        if (litter.numberOfFemales != null) {
            updateUrl += "&females=" + litter.numberOfFemales;
        }
        if (litter.numberOfMales != null) {
            updateUrl += "&males=" + litter.numberOfMales;
        }
        if (litter.vaccinated != null) {
            updateUrl += "&vaccinated=" + LitterService.booleanHelper(litter.vaccinated);
        }
        if (litter.pedigree != null) {
            updateUrl += "&pedigree=" + LitterService.booleanHelper(litter.pedigree);
        }
        if (litter.chipped != null) {
            updateUrl += "&chipped=" + LitterService.booleanHelper(litter.chipped);
        }


        console.log("updateUrl: " + updateUrl);
        return this.http.patch<Litter>(updateUrl, litter);
    }

    public create(litter: Litter) : Observable<Litter> {
        return this.http.post<Litter>(this.url, litter);
    }

    public delete(litter: Litter) : Observable<Litter> {
        let url = this.url+litter.id;
        return this.http.delete<Litter>(url)
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