import {Component } from '@angular/core';
import {MyTopItems} from "./mymusic/my-topitems.component";

@Component({
    selector: 'spot-mymusic',
    template: `
    <div>
        <ul class="nav">
            <li class="spotnav" [class.active]="selectedTab == 'playlists'"><a routerLink="myPlaylists" routerLinkActive="active" (click)="selectTab('playlists')">My Playlists</a></li>
            <li class="spotnav" [class.active]="selectedTab == 'tracks'"><a routerLink="savedTracks" routerLinkActive="active" (click)="selectTab('tracks')">Saved Tracks</a></li>
            <li class="spotnav" [class.active]="selectedTab == 'albums'"><a routerLink="savedAlbums" routerLinkActive="active" (click)="selectTab('albums')">Saved Albums</a></li>
            <li class="spotnav" [class.active]="selectedTab == 'artists'"><a routerLink="followedArtists" routerLinkActive="active" (click)="selectTab('artists')">Followed Artists</a></li>
        </ul>
        <hr style="margin-top: 0px">
        <router-outlet></router-outlet> 
    </div>
    <spot-top-items></spot-top-items>
    `
})

export class HomeMyMusicComponent {
    
    selectedTab: string = 'playlists';

    constructor(){
        
        let storedTab = localStorage.getItem("mymusicTab");
        if(storedTab){
            this.selectedTab = storedTab;
        }
    }

    selectTab(tabId){

        this.selectedTab = tabId;
        localStorage.setItem("mymusicTab", tabId);
    }
}