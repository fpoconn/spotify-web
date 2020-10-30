import { Component } from '@angular/core';
import {SearchService} from "../services/search.service";
import {DragDirective} from "../tools/drag-directive";
import {PlaylistService} from "../services/playlist.service";

@Component({
    selector: 'builder-search-playlists',
    template: `
        <div class="builderTab">

           <form (ngSubmit)="scanPlaylistTracks()" #scanForm="ngForm" style="margin-top: 15px;">

                <div class="form-group">
                    <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 15px;">
                        List top <input type="number" min="1" max="10" class="form-control customNumber" id="trackCount" name="trackCount" [(ngModel)]="formModel.trackCount">
                        tracks from
                        <input type="number" min="1" max="10" class="form-control customNumber" id="playlistCount" name="playlistCount" [(ngModel)]="formModel.playlistCount">
                        matching playlists.
                    </div>
                    <div style="display: flex; flex-direction: row">
                        <input type="text" class="form-control" id="searchString" name="searchString" [(ngModel)]="formModel.searchString">
                        <button type="submit" class="btn btn-default" [disabled]="disableForm">Search</button>
                    </div>
                </div>
            </form>

            <div *ngIf="waiting"><h4>Searching ...</h4></div>
            <table *ngIf="!waiting && tracks" style="table-layout: fixed; width: 100%; margin-top: 15px;">
                 <tr class="alt-color" *ngFor="let track of tracks">
                    <td>
                    <div>
                        <track-info [myDraggable]="track" [track]="track"></track-info>
                    </div>
                    </td>
                 </tr>
             </table>
              <div *ngIf="!tracks" style="text-align: center; margin-top: 40px;">
                <h5>1. Select top N tracks from each playlist, and playlist count.</h5>
                <h5>2. Enter search text used to find playlists.</h5>
                <h5>3. Search</h5>
                <h5>4. Drag tracks into selected playlist</h5>
                <span class="glyphicon glyphicon-hand-left" style="font-size: 32px;"></span>
            </div>
        </div>
    `

})
export class BuilderSearchPlaylists {

    tracks: any;
    waiting: boolean = false;
    disableForm: boolean = false;

    formModel = {
        searchString: undefined,
        playlistCount: 3,
        trackCount: 3
    };

    constructor(private _searchService: SearchService, private _playlistService: PlaylistService){}

    scanPlaylistTracks(){

        this.tracks = [];
        this.waiting = true;
        this._searchService.search(this.formModel.searchString, 'playlist', this.formModel.playlistCount)
            .subscribe(
                res => {
                    
                    res.playlists.items.forEach( playlist => {

                        this._playlistService.getTracks(playlist.tracks.href).subscribe(
                            result => {
                                // account for playlists with very few tracks
                                result.items.slice(0, Math.min(this.formModel.trackCount, result.total)).
                                    forEach( item => this.tracks.push(item.track));
                            }
                        )
                        
                    });

                    this.waiting = false;
                    
                },
                err => console.log("error: " + err),
                () => console.log("Music loaded.")
            );
        
        sessionStorage['scanPlaylistsModel'] = JSON.stringify(this.formModel);
    }

   ngOnInit(){

       let model = sessionStorage['scanPlaylistsModel'];

        if(model){
            console.log("exists");
            this.formModel = JSON.parse(model);
        }
    }

}