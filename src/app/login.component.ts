import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
    selector: 'spot-login',
    template: `
    <div>
    <div>
    <h1>Log in to Spotify</h1>    
    <button class = "btn btn-primary btn-lg" (click)="login()">Login</button>
    </div>
    </div>
    `
})
export class LoginComponent{

    constructor(private authService: AuthService){}

    login() {
        // from here to spotify auth URL, which redirects to home
        this.authService.clearTokenData();
        window.location.href =  this.authService.getAuthorizeUrl();

    }
}