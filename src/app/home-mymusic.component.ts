import {Component, ElementRef, ViewChild } from '@angular/core';
import {MyTopItems} from "./mymusic/my-topitems.component";
import {Router, RouterModule} from '@angular/router';

@Component({
    selector: 'spot-mymusic',
    template: `
    <div>
        <ul class="nav">
            <li class="spotnav" [class.active]="selectedTab == 'playlists'"><a #playlists routerLink="myPlaylists" routerLinkActive="active" (click)="selectTab('playlists')">My Playlists</a></li>
            <li class="spotnav" [class.active]="selectedTab == 'tracks'"><a #tracks routerLink="savedTracks" routerLinkActive="active" (click)="selectTab('tracks')">Saved Tracks</a></li>
            <li class="spotnav" [class.active]="selectedTab == 'albums'"><a #albums routerLink="savedAlbums" routerLinkActive="active" (click)="selectTab('albums')">Saved Albums</a></li>
            <li class="spotnav" [class.active]="selectedTab == 'artists'"><a #artists routerLink="followedArtists" routerLinkActive="active" (click)="selectTab('artists')">Followed Artists</a></li>
        </ul>
        <hr style="margin-top: 0px">
        <router-outlet></router-outlet> 
    </div>
    <spot-top-items></spot-top-items>
    `
})

export class HomeMyMusicComponent {

    selectedTab: string;  // = 'playlists';
    @ViewChild('playlists', {static: true}) playlists:ElementRef;
    @ViewChild('tracks', {static: true}) tracks:ElementRef;
    @ViewChild('albums', {static: true}) albums:ElementRef;
    @ViewChild('artists', {static: true}) artists:ElementRef;

    constructor(private _router: Router){}

    ngAfterContentInit(){
        let storedTab = localStorage.getItem("mymusicTab");
        if(storedTab){

            this.selectedTab = storedTab;

            if(storedTab === 'playlists'){
                this.playlists.nativeElement.click();
            }
            if(storedTab == 'tracks'){
                this.tracks.nativeElement.click();
            }
            if(storedTab === 'albums'){
                this.albums.nativeElement.click();
            }
            if(storedTab == 'artists'){
                this.artists.nativeElement.click();
            }
        }
        else{
            this.selectedTab = 'playlists';
        }
    }

    selectTab(tabId){

        this.selectedTab = tabId;
        localStorage.setItem("mymusicTab", tabId);

    }

}