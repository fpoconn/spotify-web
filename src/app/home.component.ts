import {Component, OnInit } from '@angular/core';
import {RouterModule, Router} from '@angular/router';
import {UserService} from './services/user.service';

@Component({
    selector: 'spot-home',
    template: `
    <spot-navbar (searchResultEvent)="setResults($event)"></spot-navbar>
    <router-outlet></router-outlet>
    `
})

export class HomeComponent implements OnInit {

    constructor(private _router: Router, private _userService: UserService){}

    ngOnInit(){

        this._userService.getUserInfo().subscribe(res => {
            localStorage.setItem("currentUser", JSON.stringify(res));
        },
        err => console.log(err));
    }

    setResults(resEvent) {
        
        if(resEvent.s) {
            this._router.navigate(['../home/searchResults', resEvent.s ]);
        }
    }
}