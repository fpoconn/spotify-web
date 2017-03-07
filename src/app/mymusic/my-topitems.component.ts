import { Component } from '@angular/core';
import {SanitizeTrackUrl} from "../pipes";
import {UserService} from "../services/user.service";
import {ArtistComponent} from "../artists/artist.component";

@Component({
    selector: 'spot-top-items',
    template: `
    <div *ngIf="topArtists">
        <h5 style="font-weight: 500;">TOP ARTISTS</h5>
        <hr style="margin-top: 0px; border-top: 1px solid #2b2b2b;">
        <spot-artist-tile class="small-tile" *ngFor="let artist of topArtists" [artist]="artist"></spot-artist-tile>
    </div>
    
    <div *ngIf="!topTracks">
        No Top Artists
    </div>
    <div *ngIf="topTracks">
        <h5 style="font-weight: 500;">TOP TRACKS</h5>
        <hr style="margin-top: 0px; border-top: 1px solid #2b2b2b;">
        <table>
         <tr *ngFor="let track of topTracks">
            <td><iframe width="300" height="80" [src]="track.id | sanitizeTrackUrl" 
                frameborder="0" allowtransparency="true"></iframe></td>
         </tr>
        </table>
    </div>
    <div *ngIf="!topTracks">
        No Top Tracks
    </div>
    `,
    providers: [UserService]
})

export class MyTopItems {
    // objects wrap a track and added time
    // access track with track.track
    topTracks: any;
    topArtists: any;

    constructor(private _userService: UserService) {

        this._userService.getTop('artists', 5).subscribe(
            res => {
                this.topArtists = res.items;
            },
            err => console.log("error: " + err),
            () => console.log("Top Artists loaded ")
        );

        this._userService.getTop('tracks', 10).subscribe(
            res => {
                this.topTracks = res.items;
            },
            err => console.log("error: " + err),
            () => console.log("Top Tracks loaded ")
        );
    }

}