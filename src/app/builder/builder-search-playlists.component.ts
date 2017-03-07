import { Component } from '@angular/core';
import {SearchService} from "../services/search.service";
import {DragDirective} from "../tools/drag-directive";
import {PlaylistService} from "../services/playlist.service";

@Component({
    selector: 'builder-search-playlists',
    template: `
        <div class="builderTab">
            <spot-search-field (resultEvent)="setResults($event)" [searchString]="searchString"></spot-search-field>
            <br>
            Find top 3 rated tracks from top 5 playlists.
            <br>
            <button class="btn btn-default" (click)="searchTracks()">Search</button>
            <div *ngIf="waiting"><h4>Searching ...</h4></div>
            <table *ngIf="!waiting" style="table-layout: fixed; width: 100%; margin-top: 15px;">
                 <tr *ngFor="let track of tracks">
                    <td>
                    <div>
                        <track-info [myDraggable]="track" [track]="track"></track-info>
                    </div>
                    </td>
                 </tr>
             </table>
        </div>
    `

})
export class BuilderSearchPlaylists {

    searchString: string;
    tracks: any = [];
    maxPlaylists: number = 5;
    maxTracks: number = 3;
    waiting: boolean = false;

    constructor(private _searchService: SearchService, private _playlistService: PlaylistService){}

    setResults(resEvent) {

        if(resEvent) {

            this.searchString = resEvent.s;
            sessionStorage['builderPlaylistSearchStr'] = this.searchString;
        }
    }

    searchTracks(){

        this.tracks = [];
        this.waiting = true;
        this._searchService.search(this.searchString, 'playlist', this.maxPlaylists)
            .subscribe(
                res => {
                    
                    res.playlists.items.forEach( playlist => {

                        this._playlistService.getTracks(playlist.tracks.href).subscribe(
                            result => {

                                // account for playlists with few tracks
                                result.items.slice(0, Math.min(this.maxTracks, result.total)).
                                    forEach( item => this.tracks.push(item.track));
                            }
                        )
                        
                    });

                    this.waiting = false;
                    
                },
                err => console.log("error: " + err),
                () => console.log("Music loaded.")
            );
    }

    ngOnInit(){

        this.searchString = sessionStorage['builderPlaylistSearchStr'] || 'Enter Search String';
    }
}