import {Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {ArtistService} from "../services/artist.service";
import {spotRouterProviders} from '../spot-routers';
import {FormatGenres} from "../pipes";
import {ResolveData} from "@angular/router";

@Component({
    selector: 'spot-artist',
    template: `
    <div>
        <div *ngIf="artist.images">
            <img src="{{artist.images[0].url}}" width="250" height="250"/>
        </div>
        <div>
            <h2 style="margin-bottom: -15px;">{{artist.name}}</h2>
            <hr>
            {{artist.followers.total}} followers
            <br>
            {{artist.genres | formatGenres}} 
        </div>
    </div>
    <div>
        <ul class="nav" style="margin: 0px;">
            <li class="spotnav" [class.active]="selectedTab == 'tracks'"><a routerLink="tracks" routerLinkActive="active" (click)="selectTab('tracks')">Tracks</a></li>
            <li class="spotnav" [class.active]="selectedTab == 'albums'"><a routerLink="albums" routerLinkActive="active" (click)="selectTab('albums')">Albums</a></li>
            <li class="spotnav" [class.active]="selectedTab == 'relatedArtists'"><a routerLink="relatedArtists" routerLinkActive="active" (click)="selectTab('relatedArtists')">Related Artists</a></li>
        </ul>
        <hr style="margin-top: 0px">
        <router-outlet></router-outlet> 
    </div>
    `,
    providers: [ArtistService]

})

export class ArtistComponent implements OnInit {

    artist: any;
    selectedTab: string;

    constructor(private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _artistService: ArtistService) {
    }


    ngOnInit() {
    /*
        snapshot only gives the current data, but we need to subscribe to notice changes,
        otherwise, page will not update when changed from within since onInit will not fire again.
        
        this.artist = this._activatedRoute.snapshot.data['artistResolve'];
    */
        let storedTab = localStorage.getItem("artistTab");
        if(storedTab){
            this.selectedTab = storedTab;
          //  this._router.navigate([storedTab]);
        }

       this._activatedRoute.data.subscribe( (data: ResolveData) => {
            this.artist = data['artistResolve'];
           // reset tab to default tracks when data resolve updates
           //this.selectedTab = 'tracks';
      });

    }

    selectTab(tabId){

        this.selectedTab = tabId;
        localStorage.setItem("artistTab", tabId);
    }

}