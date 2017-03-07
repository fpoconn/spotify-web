import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'spot-artist-tile',
    template: `
    <div *ngIf="artist && artist.images[0]" (click)="showArtist()">
    
          <div *ngIf="artist.images[0]">
            <img *ngIf="artist.images[0].url" src="{{artist.images[0].url}}"/>
          </div>  
        
        <h5>{{artist.name}}</h5>
    </div>
    `
})

export class ArtistTileComponent{

    @Input() artist: any;

    constructor(private _router: Router) {}
    
    showArtist(){
        this._router.navigate(['../home/artist', this.artist.id]);

    }

}