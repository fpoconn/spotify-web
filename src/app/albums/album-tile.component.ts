import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'spot-album-tile',
    template: `
    <div *ngIf="album" class="large-tile" (click)="showAlbum()">
    
          <div *ngIf="album.images[0]">
            <img *ngIf="album.images[0].url" src="{{album.images[0].url}}"/>
          </div>  
        
        <h5 style="margin-bottom: 0px;">{{album.name}}</h5>
        <h6 style="margin-top: 3px;">{{album.release_date}}</h6>
  </div>
`
})

export class AlbumTileComponent{

    @Input() album: any;

    constructor(private _router: Router) {}
    
    showAlbum(){
        this._router.navigate(['../home/album', this.album.id]);

    }

}