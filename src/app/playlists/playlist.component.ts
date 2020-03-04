import {Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {PlaylistService} from "../services/playlist.service";
import 'rxjs/operators';
import { map } from 'rxjs/operators';


@Component({
    selector: 'spot-playlist',
    template: `
    <div *ngIf="playlist" style="position: fixed;">
        <div>
            <h1>{{playlist.name}}</h1>  
               <h4>  {{playlist.tracks.total}} tracks </h4>
               <hr style="margin: 0px;">
        </div>
    </div>
    <div *ngIf="tracks">
        <table>
         <tr *ngFor="let track of tracks">
            <td><iframe width="500" height="80" [src]="track.track.id | sanitizeTrackUrl" 
                frameborder="0" allowtransparency="true"></iframe></td>
         </tr>
        </table>
    </div>
    `,
    providers: [PlaylistComponent]
})

export class PlaylistComponent implements OnInit {

    playlist: any;
    tracks: any;

    constructor(private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _playlistService: PlaylistService) {
    }


    ngOnInit() {

        this._activatedRoute.params
            .pipe(map(params => {

                let ownerId = params['ownerId'];
                let playlistId = params['id'];
                return this._playlistService.playlistFromId(ownerId, playlistId);
                   
            })).subscribe( playlistObs => {

                playlistObs.subscribe( playlist => {

                    this.playlist = playlist;
                    this._playlistService.getTracks(this.playlist.tracks.href)
                        .subscribe( tracks => this.tracks = tracks.items);
                });

            });
    }


    showArtist(id){

        this._router.navigate(['../home/artist', id]);

    }

    showAlbum(id){
        this._router.navigate(['../home/album', id]);

    }


}