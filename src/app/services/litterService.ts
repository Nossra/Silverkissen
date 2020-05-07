import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Cat } from "../entities/cat";
import { Litter } from "../entities/litter";

@Injectable()
export class LitterService {
    private prodUrl: string = "https://silverkissen20191220122823.azurewebsites.net/"
    private testUrl:string = "https://localhost:44381/";
    private url:string = this.prodUrl + "api/catlitters/";
    private activeLittersUrl:string = this.url + "active";
    private archivedLittersUrl:string = this.url + "archived";
    private earlierLittersUrl:string = this.url + "earlier"; 
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
    public putUpdate(litter:Litter) : Observable<Litter> {
        return this.http.put<Litter>(this.url+litter.id, litter);
    } 

    public create(litter: Litter) : Observable<Litter> { 
        return this.http.post<Litter>(this.url, litter);
    }

    public delete(litter: Litter) : Observable<Litter> {
        let url = this.url+litter.id;
        return this.http.delete<Litter>(url)
    } 
} 