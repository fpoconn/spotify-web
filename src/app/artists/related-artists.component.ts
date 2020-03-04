import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArtistService} from "../services/artist.service";
import {ArtistListComponent} from "./artist-list.component";

@Component({
    selector: 'spot-related-artists',
    template: `
    <div *ngIf="artistId">
        <div *ngIf="relatedArtists">
             <spot-artist-list [artists]="relatedArtists"></spot-artist-list>
        </div>
        <div *ngIf="!relatedArtists">
            Sorry, no Related Artists
        </div>
    </div>
    <div *ngIf="!artistId">
        No Artist Provided
    </div>
    `,
    providers: [ArtistService]

})

export class RelatedArtistsComponent {

    artistId: string;
    relatedArtists: any;
    sub: any;

    constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _artistService: ArtistService) {

        this.sub = this._activatedRoute.parent.params.subscribe(params => {
            this.artistId = params['id'];

            if (this.artistId) {

                this._artistService.relatedArtists(this.artistId).subscribe(
                    res => {
                        this.relatedArtists = res.artists;
                    },
                    err => console.log("error: " + err),
                    () => console.log("Related Artists loaded.")
                );
            }

        });
    }

}