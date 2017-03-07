import { Component, Input } from '@angular/core';
import {PlaylistTileComponent} from "./playlists-tile.component";

@Component({
    selector: 'spot-playlist-list',
    template: `
    <div *ngIf="playlists">
    <spot-playlist-tile *ngFor="let playlist of playlists" [playlist]="playlist"></spot-playlist-tile>
    </div>
    `
})

export class PlaylistListComponent{

    @Input() playlists: any;

    constructor() {}

}