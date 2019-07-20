import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Image } from "../entities/image";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ImageService {
    private testUrl:string = "https://localhost:44381/api/images/";
    
    constructor(private http: HttpClient) {
        
    }

    private header: any = {
        'Content-Type':'application/json', 'Authorization':  'Bearer ' + localStorage.getItem("token")
   }
   
    public PostImageToCatLitter(image:Image) : Observable<Image> {
        let url = this.testUrl + "catlitters"
        console.log(url);
        return this.http.post<Image>(url, image)
    }

    public GetCatLitterImages(id:number) : Observable<Array<Image>> {
        let url = this.testUrl + "catlitters/"+ id;
        return this.http.get<Array<Image>>(url);
    }
}