import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Image } from "../entities/image";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ImageService {
    private testUrl:string = "https://localhost:44381/";
    private prodUrl: string = "https://silverkissen20191220122823.azurewebsites.net/"

    private url = this.prodUrl + "api/images/";
    constructor(private http: HttpClient) {
        
    }

    private header: any = {
        'Content-Type':'application/json', 'Authorization':  'Bearer ' + localStorage.getItem("token")
   }
   
    //LITTERS
    public PostImageToCatLitter(image:Image) : Observable<Image> {
        let url = this.url + "catlitters" 
        return this.http.post<Image>(url, image)
    }


    // public GetCatLitterImages(id:number) : Observable<Array<Image>> {
    //     let url = this.testUrl + "catlitters/"+ id;
    //     return this.http.get<Array<Image>>(url);
    // }

    public PostImageToExistingCatLitter(image:Image, id:number) : Observable<Image> {
        let url = this.url + "catlitters/"+ id;
        return this.http.post<Image>(url,image);
    }

    public DeleteLitterImage(id:number) : Observable<Image> {
        let url = this.url + "catlitters/"+ id;
        return this.http.delete<Image>(url);
    }

    //CATS
    public PostImageToExistingCat(image:Image, id:number) : Observable<Image> {
        let url = this.url + "catimages/" + id 
        return this.http.post<Image>(url, image)
    }

    public PostImageToCat(image:Image) : Observable<Image> {
        let url = this.url + "catimages/" 
        return this.http.post<Image>(url, image)
    }

    public DeleteCatImage(id:number) : Observable<Image> {
        let url = this.url + "catimages/"+ id;
        return this.http.delete<Image>(url);
    }
}