import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'spot-playlist-banner',
    template: `
    <div *ngIf="playlist" (click)="showPlaylist()">
    
          <div *ngIf="playlist.images[0]">
            <img width="140" height="auto" *ngIf="playlist.images[0].url" src="{{playlist.images[0].url}}"/>
          </div>  
          <div *ngIf="playlist.tracks">
            <h2>{{playlist.name}}</h2>
            <p>{{description}}</p>
            <p>{{playlist.tracks.total}} tracks</p>
           </div>
  </div>

`
})

export class PlaylistBannerComponent{

    @Input() playlist: any;
    @Input() description: string;

    constructor(private _router: Router) {}

    showPlaylist(){
        this._router.navigate(['../home/playlist', this.playlist.owner.id, this.playlist.id]);
    }

}