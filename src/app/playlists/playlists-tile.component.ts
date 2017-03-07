import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'spot-playlist-tile',
    template: `
    <div *ngIf="playlist" class="large-tile" (click)="showPlaylist()">
    
          <div *ngIf="playlist.images[0]">
            <img *ngIf="playlist.images[0].url" src="{{playlist.images[0].url}}"/>
          </div>  
        
        <h5>{{playlist.name}}</h5>
  </div>

`
})

export class PlaylistTileComponent{

    @Input() playlist: any;

    constructor(private _router: Router) {}

    showPlaylist(){
        this._router.navigate(['../home/playlist', this.playlist.owner.id, this.playlist.id]);

    }

}