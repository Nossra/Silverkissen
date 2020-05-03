import { Injectable } from "@angular/core";
import { User } from "../entities/user";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenObject } from "../entities/TokenObject";
import { Observable } from "rxjs/Observable";
/* import { AuthGuardService } from "./AuthGuard"; */

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private jwtHelper: JwtHelperService,
        /* private authGuardService: AuthGuardService */) {
    }
    private prodUrl: string = "https://silverkissen20191220122823.azurewebsites.net/"
    private testUrl:string = "https://localhost:44381/"
    private url = this.testUrl + "api/users";
    public get authenticated(): boolean {
        const token = this.jwtHelper.tokenGetter();   
        if (token) {    
            return !this.jwtHelper.isTokenExpired(token);
        } else {
            return false;
        }
    }

    public login(values:any)  { 
        return this.http.post(this.url, values).subscribe((x: TokenObject) => {  
            localStorage.setItem('token', x.token); 
            this.token = x.token;
            this.router.navigate(['admin']);
        });
    }  

    private header: any = {
        'Content-Type':'application/json', 'Authorization':  'Bearer ' + localStorage.getItem("token")
    }

    set token(val: string) { 
        this.header.Authorization = 'Bearer ' + val;
    }
}