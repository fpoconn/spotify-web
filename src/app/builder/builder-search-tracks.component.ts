import { Component } from '@angular/core';
import {SearchService} from "../services/search.service";
import {DragDirective} from "../tools/drag-directive";

@Component({
    selector: 'builder-search-tracks',
    template: `
        <div class="builderTab">
            <!--spot-search-field (resultEvent)="setResults($event)" [searchString]="searchString"></spot-search-field -->
          <form (ngSubmit)="setResults()" #scanForm="ngForm" style="margin-top: 15px;">

            <div style="display: flex; flex-direction: row">
                    <input type="text" class="form-control" id="searchString" name="searchString" [(ngModel)]="searchString">
                    <button type="submit" class="btn btn-default" [disabled]="disableForm">Search</button>
                </div>
         </form>

        <table *ngIf="tracks" style="table-layout: fixed; width: 100%">
             <tr class="alt-color" *ngFor="let track of tracks">
                <td>
                    <div>
                        <track-info [myDraggable]="track" [track]="track"></track-info>
                    </div>
                </td>
            </tr>
        </table>
         <div *ngIf="!tracks" style="text-align: center; margin-top: 40px;">
                <h5>Search for tracks, then drag desired tracks into the selected playlist</h5>
                <span class="glyphicon glyphicon-hand-left" style="font-size: 32px;"></span>
            </div>
        </div>
    `,
    providers: [SearchService]
})
export class BuilderSearchTracks {

    searchString: string;
    tracks: any;
    disableForm: boolean = false;

    constructor(private _searchService: SearchService){}

    setResults() {


        sessionStorage['builderTrackSearchStr'] = this.searchString;

        this._searchService.search("track:" + this.searchString, 'track', 20)
            .subscribe(
                res => {
                    this.tracks = res.tracks.items;

                },
                err => console.log("error: " + err),
                () => console.log("Music loaded.")
            );

    }

    ngOnInit(){

        this.searchString = sessionStorage['builderTrackSearchStr'] || 'Enter Search String';
    }
}