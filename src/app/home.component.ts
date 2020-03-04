import {Component, OnInit } from '@angular/core';
import {RouterModule, Router} from '@angular/router';
import {UserService} from './services/user.service';

@Component({
    selector: 'spot-home',
    template: `
    <spot-navbar [user]="currentUser" (searchResultEvent)="setResults($event)"></spot-navbar>
    <router-outlet></router-outlet>
    `
})

export class HomeComponent {

    currentUser: any;

    constructor(private _router: Router, private _userService: UserService){

         this._userService.getUserInfo().subscribe(res => {
            this.currentUser = res;
            localStorage.setItem("currentUser", JSON.stringify(res));
        },
        err => {
            return console.log(err);
        });
    }

    setResults(resEvent) {
        
        if(resEvent.s) {
            this._router.navigate(['../home/searchResults', resEvent.s ]);
        }
    }
}