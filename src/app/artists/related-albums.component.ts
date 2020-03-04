import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArtistService} from "../services/artist.service";
import {AlbumListComponent} from '../albums/albums-list.component';

@Component({
    selector: 'spot-related-albums',
    template: `
    <div *ngIf="artistId">
        <div *ngIf="relatedAlbums">
             <spot-album-list [albums]="relatedAlbums"></spot-album-list>
        </div>
        <div *ngIf="!relatedAlbums">
            Sorry, no Related Albums
        </div>
    </div>
    <div *ngIf="!artistId">
    No Artist Provided
    </div>
    `,
    providers: [ArtistService]
    
})

export class RelatedAlbumsComponent {

    artistId: string;
    relatedAlbums: any;
    sub: any;

    constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _artistService: ArtistService) {

        this.sub = this._activatedRoute.parent.params.subscribe(params => {

            this.artistId = params['id'];

            if (this.artistId) {

                this._artistService.artistAlbums(this.artistId).subscribe( res => {

                   // albumsObs.subscribe(res => {
                            this.relatedAlbums = res.items;
                        },
                        err => console.log("error loading related albums: " + err),
                        () => console.log("Artist Tracks loaded.")
                    )

               // });
            }
            
        });
    }

}