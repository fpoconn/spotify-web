import { Component, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'spot-artist-profile',
    template: `
    <div *ngIf="artist">
        {{artist.name}}<br>
        {{artist.genres}}<br>
    </div>

`
})

export class ArtistProfileComponent implements OnChanges{

    @Input() artist: any;

    constructor() {}

    ngOnChanges(){
    }

}