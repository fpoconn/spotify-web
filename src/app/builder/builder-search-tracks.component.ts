import { Component } from '@angular/core';
import {SearchService} from "../services/search.service";
import {DragDirective} from "../tools/drag-directive";

@Component({
    selector: 'builder-search-tracks',
    template: `
        <div class="builderTab">
            <spot-search-field (resultEvent)="setResults($event)" [searchString]="searchString"></spot-search-field>
         
             <table style="table-layout: fixed; width: 100%">
                 <tr *ngFor="let track of tracks">
                    <td>
                    <div>
                        <track-info [myDraggable]="track" [track]="track"></track-info>
                    </div>
                    </td>
                 </tr>
             </table>
        </div>
    `,
    providers: [SearchService]
})
export class BuilderSearchTracks {

    searchString: string;
    tracks: any;

    constructor(private _searchService: SearchService){}

    setResults(resEvent) {

        if(resEvent) {

            this.searchString = resEvent.s;
            sessionStorage['builderTrackSearchStr'] = this.searchString;

            this._searchService.search(this.searchString, 'track', 20)
                .subscribe(
                    res => {
                        this.tracks = res.tracks.items;

                    },
                    err => console.log("error: " + err),
                    () => console.log("Music loaded.")
                );
        }
    }

    ngOnInit(){

        this.searchString = sessionStorage['builderTrackSearchStr'] || 'Enter Search String';
    }
}