import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ArtistService} from "../services/artist.service";
import {SanitizeTrackUrl} from "../pipes";

@Component({
    selector: 'spot-related-tracks',
    template: `
    <div *ngIf="artistId">
        <div *ngIf="relatedTracks">
            <table>
             <tr *ngFor="let track of relatedTracks">
	            <td><iframe width="500" height="80" [src]="track.id | sanitizeTrackUrl" 
	                frameborder="0" allowtransparency="true"></iframe></td>
                   <td width="100px" align="center"><h4>{{track.popularity}}%</h4></td>
	         </tr>
            </table>
        </div>
        <div *ngIf="!relatedTracks">
            Sorry, no Related Tracks
        </div>
    </div>
    <div *ngIf="!artistId">
    No Artist Provided
    </div>
    `,
    providers: [ArtistService]
})

export class RelatedTracksComponent {

    artistId: String;
    relatedTracks: any;
    sub: any;

    constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _artistService: ArtistService) {

     //   this.sub = this._router.routerState.parent(this._activatedRoute).params.subscribe(params => {
         // this should be new api (issue #9444)
            this.sub = this._activatedRoute.parent.params.subscribe(params => {

            this.artistId = params['id'];

            if (this.artistId) {

                this._artistService.topTracks(this.artistId).subscribe(
                    res => {
                        this.relatedTracks = res.tracks;
                    },
                    err => console.log("error: " + err),
                    () => console.log("Artist Tracks loaded.")
                );

            }

        });
    }
}