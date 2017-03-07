import {Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {AlbumService} from "../services/album.service";
import {FormatGenres} from "../pipes";

@Component({
    selector: 'spot-album',
    template: `
    <div>
        <div *ngIf="album.images">
            <img src="{{album.images[0].url}}" width="400" height="400"/>
        </div>
        <div>
            <h2>{{album.name}}</h2>
            <a (click)="showArtist()"><h4>{{artist.name}}</h4></a>
            {{album.release_date}}
        </div>
    </div>
    <table>
     <tr *ngFor="let track of album.tracks.items">
        <td width="35px"><header>{{track.track_number}}.</header></td>
        <td><iframe width="500" height="80" [src]="track.id | sanitizeTrackUrl" 
            frameborder="0" allowtransparency="true"></iframe></td>
     </tr>
    </table>
  
    `,
    providers: [AlbumService]
})

export class AlbumComponent implements OnInit {

    album: any;
    artist: any;

    constructor(private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _albumService: AlbumService) {
    }


    ngOnInit() {
        // revert to this if the subscribe code breaks
         this.album = this._activatedRoute.snapshot.data['albumResolve'];
       // this._activatedRoute.data.subscribe( data => {
         //   this.album = data.albumResolve;
            this.artist = this.album.artists[0];

        //});

    }
    
    showArtist(){

        this._router.navigate(['../home/artist', this.artist.id]);

    }

}