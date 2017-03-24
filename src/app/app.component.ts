import {Component} from '@angular/core';
import {RouterModule, Router} from '@angular/router';
import {HttpModule} from '@angular/http';
import {spotRouterProviders} from './spot-routers';
import {AuthService} from "./services/auth.service";

@Component({
    selector: 'spot-app',
    template: `
    <router-outlet></router-outlet>
    `,
    providers: [HttpModule]
})
export class AppComponent {
    
    constructor(private _router: Router, private _authService: AuthService){}

    ngOnInit() {
        
        var href = window.location.href;
        
        var extractedcode = href.split('=');
        var ourcode = extractedcode[1];

        // go to either login, which directs to spotify URL then redirects back through this loop
        // ... or goes to home where the auth guard will handle flow.

        if(ourcode){

            this._authService.setAccessCode(ourcode);
            this._router.navigate(['home']);
        }
    }
    
}