import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from "./UserService";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService) { 
    }

    canActivate(route: ActivatedRouteSnapshot) : boolean {
        if (this.userService.authenticated) {
            return true;
        } else {
            this.router.navigateByUrl('/kattungar');
            return false;
        }
    }



}