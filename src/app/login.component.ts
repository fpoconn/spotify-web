import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpModule} from '@angular/http';
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
    `,
    providers: [HttpModule]

})
export class LoginComponent {

    constructor(private activatedRoute: ActivatedRoute, private _router: Router, private authService: AuthService){}

    login() {

        window.location.href =  this.authService.getAuthorizeUrl();

    }
}