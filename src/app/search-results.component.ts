import { Component, Input, OnInit, Output } from  '@angular/core';
import {RouterModule, ActivatedRoute} from '@angular/router';
import {SearchService} from "./services/search.service";
import {SearchComponent} from "./search.component";
import {ArtistListComponent} from "./artists/artist-list.component";
import {AlbumListComponent} from "./albums/albums-list.component";
import {PlaylistListComponent} from "./playlists/playlist-list.compoenent";

@Component({
    selector: 'spot-results',
    template: `
    <div *ngIf="hasResults">
        <div>
            <div>
                <h3 style="margin: 0px;">Showing results for '{{searchString}}'</h3>
                <spot-search-field [searchString]="searchString" (resultEvent)="setResults($event)"></spot-search-field>
            </div>
            <div>
                <ul class="nav nav-pills">
                    <li class="nav" [class.active]="selectedPill == 'all'"><a (click)="selectPill('all')">All</a></li>
                    <li class="disabled" [class.active]="selectedPill == 'tracks'"><a (click)="selectPill('tracks')">Tracks</a></li>
                    <li class="nav" [class.active]="selectedPill == 'artists'"><a (click)="selectPill('artists')">Artists</a></li>
                    <li class="nav" [class.active]="selectedPill == 'albums'"><a (click)="selectPill('albums')">Albums</a></li>
                    <li class="nav" [class.active]="selectedPill == 'playlists'"><a (click)="selectPill('playlists')">Playlists</a></li>
                </ul>
            </div>
         </div>
         <div *ngIf="selectedPill == 'all'">
            <h4>ARTISTS</h4>
            <hr style="margin-top: 0px">
            <spot-artist-list class="horizontal" *ngIf="artists.length > 0" [artists]="artists"></spot-artist-list>
            <div *ngIf="!artists.length > 0">
            There are no artists to display.
            </div>
            <h4>ALBUMS</h4>
            <hr style="margin-top: 0px">
            <spot-album-list class="horizontal" *ngIf="albums.length > 0" [albums]="albums"></spot-album-list>
            <div *ngIf="!albums.length > 0">
            There are no albums to display.
            </div>
            <h4>PLAYLISTS</h4>
            <hr style="margin-top: 0px">
            <spot-playlist-list class="horizontal" *ngIf="playlists.length > 0" [playlists]="playlists"></spot-playlist-list>
            <div *ngIf="!playlists.length > 0">
            There are not playlists to display.
            </div>
        </div>
        <div *ngIf="selectedPill == 'artists'">
             <h4>ARTISTS</h4>
             <hr style="margin-top: 0px">
            <spot-artist-list *ngIf="artists.length > 0" [artists]="artists"></spot-artist-list>
            <div *ngIf="!(artists.length > 0)">
            There are no artists to display.
            </div>
        </div>
        <div *ngIf="selectedPill == 'albums'">
             <h4>ALBUMS</h4>
             <hr style="margin-top: 0px">
            <spot-album-list *ngIf="albums.length > 0" [albums]="albums"></spot-album-list>
            <div *ngIf="!(albums.length > 0)">
            There are no artists to display.
            </div>
        </div>
        <div *ngIf="selectedPill == 'playlists'">
             <h4>PLAYLISTS</h4>
             <hr style="margin-top: 0px">
            <spot-playlist-list *ngIf="playlists.length > 0" [playlists]="playlists"></spot-playlist-list>
            <div *ngIf="!(playlists.length > 0)">
            There are no playlists to display.
            </div>
        </div>
    </div>
    `,
    providers: [SearchService]

})

export class SearchResultsComponent implements OnInit {

    searchResults: any;
    searchString: string;
    hasResults: boolean = false;
    selectedPill: string = 'all';
    artists: any;
    tracks: any;
    playlists: any;
    albums: any;

    constructor(private _activatedRoute: ActivatedRoute, private _searchService: SearchService) {

    }

    ngOnInit(){

        this._activatedRoute.params
            .map(params => params['str'])
            .map(str => {
                this.searchString = str;
                return this._searchService.search(str, null, 20);
            })
            .subscribe(
                res => {
                    this.searchResults = res;
                    this.update();
                },
                err => console.log("error: " + err),
                () => console.log("Music loaded.")
            );

    }

    update () {

        if(this.searchResults.artists) {
            this.hasResults = true;
            this.artists = this.searchResults.artists.items;
        }
        if(this.searchResults.tracks){
            this.hasResults = true;
            this.tracks = this.searchResults.tracks.items;
        }
        if(this.searchResults.playlists){
            this.hasResults = true;
            this.playlists = this.searchResults.playlists.items;
        }
        if(this.searchResults.albums){
            this.hasResults = true;
            this.albums = this.searchResults.albums.items;
        }

    }

    selectPill(input){

        this.selectedPill = input;
    }

    // new feature related to added search field
    setResults(resEvent) {

        if(resEvent.s) {


            this._searchService.search(resEvent.s, null, 20)
                .subscribe(
                    res => {
                    this.searchResults = res;
                    this.searchString = resEvent.s;

                    this.update();
                },
                err => console.log("error: " + err),
                    () => console.log("Music loaded.")
                );
        }
    }
}