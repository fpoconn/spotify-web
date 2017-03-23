import {Component, Output, EventEmitter} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SearchComponent} from './search.component';

import {UserService} from "./services/user.service";

@Component({
    selector: 'spot-navbar',
    template: `
    <div class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <a class="navbar-left" routerLink="homeMyMusic"><img src="/assets/images/Spotify_Logo_RGB_White.png" class="nav-logo" /></a>
            
            <ul class="nav navbar-nav">
               <li [class.active]="selectedTab == 'myMusic'"><a routerLink="homeMyMusic" routerLinkActive="active" (click)="selectTab('myMusic')">My Music</a></li>
               <li [class.active]="selectedTab == 'browse'"><a routerLink="homeBrowse" (click)="selectTab('browse')">Browse</a></li>
               <li [class.active]="selectedTab == 'playlistBuilder'"><a routerLink="playlistBuilder" (click)="selectTab('playlistBuilder')">Playlist Builder</a></li>
            </ul>
            
            <p *ngIf="user" class="navbar-text navbar-right"><span class="glyphicon glyphicon-user"></span><a href="#" class="navbar-link">  {{user.id}}</a></p>
            <spot-search-field class="navbar-right" (resultEvent)="setResults($event)" [isNavBar]=true><span class="glyphicon glyphicon-user"></span></spot-search-field>
        </div>
    </div>
    `
})

export class NavbarComponent {
    
    @Output() searchResultEvent = new EventEmitter();
    user: any;
    selectedTab: string = "myMusic";

    constructor(private _userService: UserService){}

    ngOnInit(){

        this._userService.getUserInfo().subscribe(res => {

            this.user = res;
        },
        err => console.log(err));
    }

    setResults(resEvent) {

        if(resEvent) {

            this.searchResultEvent.emit(resEvent);
        }
        this.selectedTab = undefined;
    }

    selectTab(tab){
        this.selectedTab = tab;
    }
}