import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected router: Router, protected authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        
        // for now, if there's already an access token.  otherwise, this gets called twice?
        if(this.authService.getAccessToken()){
            return true;
        }

        if(this.authService.getAccessCode()){
            return this.authService.retrieveAccessToken().map(data => {
                this.authService.setAccessTokenData(data.json());
                if(data){
                    return true;
                }
                else{
                    console.log("AUTH GUARD - No token data, go to login");
                    this.router.navigate(['login']);
                    return false;
                }

            });
        }
        else{
            console.log("AUTH GUARD - NO ACCESS CODE, go to login");
            this.router.navigate(['login']);
            return false;
        }

    }
}