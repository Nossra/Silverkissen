import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Cat } from "../entities/cat";
import { Litter } from "../entities/litter";

@Injectable()
export class LitterService {
    private url:string = "http://localhost:8080/silverkissen/api/litters/";
    private activeLittersUrl:string = "http://localhost:8080/silverkissen/api/litters/active";
    private archivedLittersUrl:string = "http://localhost:8080/silverkissen/api/litters/archived";
    private earlierLittersUrl:string = "http://localhost:8080/silverkissen/api/litters/earlier";
    
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
    public getActiveLitters() : Observable<Array<Litter>> {
        return this.http.get<Array<Litter>>(this.activeLittersUrl);
    }
    public getArchivedLitters() : Observable<Array<Litter>> {
        return this.http.get<Array<Litter>>(this.archivedLittersUrl);
    }
    public getEarlierLitters() : Observable<Array<Litter>> {
        return this.http.get<Array<Litter>>(this.earlierLittersUrl);
    }

    public update(litter: Litter, id:number) : Observable<Litter> {
        let updateUrl = this.url+id+"?";

        if (litter.notes != null) {
            updateUrl += "&notes=" + LitterService.lineBreakHelper(LitterService.stringHelper(litter.notes));
        }
/*         if (litter.numberOfFemales != null) {
            updateUrl += "&females=" + litter.numberOfFemales;
        }
        if (litter.numberOfMales != null) {
            updateUrl += "&males=" + litter.numberOfMales;
        } */
        if (litter.vaccinated != null) {
            updateUrl += "&vaccinated=" + LitterService.booleanHelper(litter.vaccinated);
        }
        if (litter.pedigree != null) {
            updateUrl += "&pedigree=" + LitterService.booleanHelper(litter.pedigree);
        }
        if (litter.chipped != null) {
            updateUrl += "&chipped=" + LitterService.booleanHelper(litter.chipped);
        }
        if (litter.status != null) {
            updateUrl += "&litterstatus=" + LitterService.stringHelper(litter.status);
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

    public static lineBreakHelper(value:string) : string {
        let helpedString: string = "";
        for (let i = 0; i < value.length; i++) {
            helpedString += value[i].replace("\n", "<br>");
        }
        return helpedString;
    }
} 