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
            updateUrl += "&name=" + cat.name;
        }

        if (cat.sex != undefined) {
            updateUrl += "&sex=" + cat.sex;
        }

        if (cat.color != undefined) {
            updateUrl += "&color=" + cat.color;
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
}