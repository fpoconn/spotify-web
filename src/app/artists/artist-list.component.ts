import { Component, Input } from '@angular/core';
import {ArtistTileComponent} from "./artist-tile.component";

@Component({
    selector: 'spot-artist-list',
    template: `
    <div *ngIf="artists">
    <spot-artist-tile class="large-tile" *ngFor="let artist of artists" [artist]="artist"></spot-artist-tile>
    </div>
    `
})

export class ArtistListComponent{ 

    @Input() artists: any;

    constructor() {}

}