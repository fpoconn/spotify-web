import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected router: Router, protected authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        
        // access code comes from login.  
        // have access code, but no token yet.
        if(this.authService.getAccessCode()){

            // Moved from outside the accessCode if stmt (noting in case it causes a problem)
            // Don't retrieve access token if there's already one.
            if(this.authService.getAccessToken()){
                return true;
            }

            return this.authService.retrieveAccessToken().map(data => {
                if(data){       
                    this.authService.setAccessTokenData(data.json());
                    return true;
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