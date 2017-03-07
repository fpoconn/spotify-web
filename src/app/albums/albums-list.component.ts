import { Component, Input } from '@angular/core';
import {AlbumTileComponent} from "./album-tile.component";

@Component({
    selector: 'spot-album-list',
    template: `
    <div *ngIf="albums">
    <div *ngIf="isWrapped" >
        <spot-album-tile *ngFor="let album of albums" [album]="album.album"></spot-album-tile>

    </div>
    <div *ngIf="!isWrapped" >
            <spot-album-tile *ngFor="let album of albums" [album]="album"></spot-album-tile>
    </div>
    </div>
    `
})

export class AlbumListComponent{

    @Input() albums: any;
    @Input() isWrapped: boolean = false;

    constructor() {}

}