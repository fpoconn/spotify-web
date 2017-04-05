import { Component, OnInit } from  '@angular/core';
import {PlaylistListComponent} from "./playlists/playlist-list.compoenent";
import {BrowseService} from "./services/browse.service";
import {AlbumListComponent} from "./albums/albums-list.component";
import {CategoryListComponent} from "./playlists/categories-list.component";
import {UserService} from "./services/user.service";
import {PlaylistBannerComponent} from "./playlists/playlist-banner.component";
import {PlaylistTileComponent} from "./playlists/playlists-tile.component";


@Component({
    selector: 'spot-browse',
    template: `
    <div *ngIf="categories">
        <spot-categories-list [categories]="categories" (selectEvent)="setCategory($event)"></spot-categories-list>
    </div>
    <div *ngIf="!category">
        <div style="display: flex; flex-direction: row">
            <div *ngIf="discoverPlaylist" style="margin-left: 15px;">
                <spot-playlist-banner [playlist]="discoverPlaylist" [description]="discoverDescription"></spot-playlist-banner>
            </div>
            <div *ngIf="releaseRadarPlaylist">
                <spot-playlist-banner [playlist]="releaseRadarPlaylist" [description]="releaseRadarDescription"></spot-playlist-banner>
            </div>
        </div>
        <div *ngIf="featuredPlaylists">
             <h4>{{featuredMessage}}</h4>
             <hr style="margin-top: 0px">
             <spot-playlist-list class="horizontal" [playlists]="featuredPlaylists"></spot-playlist-list>
        </div>
        <div *ngIf="newReleases">
             <h4>New Releases</h4>
             <hr style="margin-top: 0px">
            <spot-album-list class="horizontal" [albums]="newReleases"></spot-album-list>
        </div>
    </div>
    <div *ngIf="category">
         <div class="categoryListHeader">
            <h2 style="margin-top: 10px;">{{category.name}}</h2>
            <span class="closePanel" (click)="removeCategory()"></span>
         </div>
         <hr style="margin-top: 0px;">
         <spot-playlist-list [playlists]="categoryPlaylists"></spot-playlist-list>
    </div>
    `,
    providers: [BrowseService]

})

export class HomeBrowseComponent implements OnInit {

    featuredPlaylists: any;
    featuredMessage: string = "Featured Playlists";
    newReleases: any;
    categories: any;
    category: any;
    categoryPlaylists: any;
    discoverPlaylist: any;
    discoverDescription: string = "Your weekly mixtape of fresh music.  " +
        "Enjoy new discoveries and deep cuts chosen just " +
        "for you.  Updated every Monday, so save your favourites!";

    releaseRadarPlaylist: any;
    releaseRadarDescription: string = "Never miss a new release!  " +
        "Catch all the latest music from artists you care about, " +
        "plus new singles picked just for you.  Updates every Friday.";

    constructor(private _browseService: BrowseService, private _userService: UserService) {}

    ngOnInit(){

        this._browseService.getFeaturedPlaylists().subscribe(
            res => {
                this.featuredPlaylists = res.playlists.items;
                this.featuredMessage = res.message;
            },
            err => console.log("error: " + err),
            () => console.log("Featured Playlists loaded. ")
        );

        this._browseService.getNewReleases().subscribe(
            res => {
                this.newReleases = res.albums.items;
            },
            err => console.log("error: " + err),
            () => console.log("New Releases loaded ")
        );

        this._browseService.getCategories().subscribe(
            res => {
                this.categories = res.categories.items;
            },
            err => console.log("error: " + err),
            () => console.log("Categories loaded ")
        );

        this._userService.myPlaylists().subscribe(
            res => {
                this.discoverPlaylist = res.items.find(item => item.owner.id === "spotify" && item.name.includes("Discover"));
                this.releaseRadarPlaylist = res.items.find(item => item.owner.id === "spotify" && item.name.includes("Radar"));
            },
            err => console.log("error: " + err),
            () => console.log("Discover playlist loaded ")
        );

    }

    setCategory(cat){
        console.log("Category in browse: " + cat);
        this.category = cat;
        this._browseService.getCategoryPlaylists(cat.id).subscribe(
            res => {
                this.categoryPlaylists = res.playlists.items;
            },
            err => console.log("error: " + err),
            () => console.log("Categories loaded ")
        );

    }

    removeCategory(){
        this.category = undefined;
    }

}