import { Component } from '@angular/core';
import {SearchService} from "../services/search.service";

@Component({
    selector: 'builder-recommendations',
    template: `
        <div class="builderTab">
            <div *ngIf="!track" myDroppable (dropped)="processDrop($event)" class="empty">
                Drag and drop playlist track here to find related tracks.
            </div>
            
            <div *ngIf=track class="includeRemove" myDroppable (dropped)="processDrop($event)" style="padding: 5px;">
                <h5 style="margin-top: 0px; margin-bottom: 5px;">Track / Artist seed</h5>
                <div style="display: flex; margin-bottom: 5px;">
                    <div class="no-wrap-text" style="margin-right: 10px;">{{track.name}}</div><div *ngIf="track.artists" class="no-wrap-text" style="font-weight: 300">{{track.artists[0].name}}</div>
                </div>
                <span class="glyphicon glyphicon-remove-circle removePlaylist" (click)="removeTrack()"></span>
                <hr style="margin: 0px;">
            </div>

            <form (ngSubmit)="search()" #recommendForm="ngForm" style="margin-top: 15px;">
                <div style="display: flex; flex-direction: column;">
                    <div style="display: flex; flex-direction: row; justify-content: space-between">
                        <div class="form-group builderFormItem">
                            <input type="checkbox" class="form-control" id="includeAcousticness" name="includeAcousticness" [(ngModel)]="formModel.includeAcousticness">
                            <div>Accousticness</div>
                            <input type="number" disabled={{!formModel.includeAcousticness}} min="0" max="100" class="form-control customNumber" id="acousticness" name="acousticness" [(ngModel)]="formModel.acousticness">
                        </div>
                        
                        <div class="form-group builderFormItem">
                            <input type="checkbox" class="form-control" id="includeDanceability" name="includeDanceability" [(ngModel)]="formModel.includeDanceability">
                            <div>Danceability</div>
                            <input type="number" disabled={{!formModel.includeDanceability}} min="0" max="100" class="form-control customNumber" id="danceability" name="danceability" [(ngModel)]="formModel.danceability">
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: space-between">
                        <div class="form-group builderFormItem">
                            <input type="checkbox" class="form-control" id="includeCheerfulness" name="includeCheerfulness" [(ngModel)]="formModel.includeCheerfulness">
                            <div>Cheerfulness</div>
                            <input type="number" disabled={{!formModel.includeCheerfulness}} min="0" max="100" class="form-control customNumber" id="cheerfulness" name="cheerfulness" [(ngModel)]="formModel.cheerfulness">
                        </div>
                        
                        <div class="form-group builderFormItem">
                            <input type="checkbox" class="form-control" id="includeLiveness" name="includeLiveness" [(ngModel)]="formModel.includeLiveness">
                            <div>Live Venue</div>
                            <input type="number" disabled={{!formModel.includeLiveness}} min="0" max="100" class="form-control customNumber" id="liveness" name="liveness" [(ngModel)]="formModel.liveness">
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-default" [disabled]="disableForm">Search</button>
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
                <h5>1. Drop playlist track above to seed recommendations</h5>
                <h5>2. Optionally set track attributes</h5>
                <h5>3. Search</h5>
                <h5>4. Drag tracks into selected playlist</h5>
                <span class="glyphicon glyphicon-hand-left" style="font-size: 32px;"></span>
            </div>
        
        </div>
    `
})
export class BuilderRecommendations {

    track: any;
    tracks: any;
    waiting: boolean = false;
    disableForm = true;

    formModel = {
        seedTrack: undefined,
        seedArtist: undefined,
        includeAcousticness: false,
        acousticness: 40,
        includeDanceability: false,
        danceability: 60,
        includeCheerfulness: false,
        cheerfulness: 60,
        includeLiveness: false,
        liveness: 40
    };

    constructor(private _searchService: SearchService){
        this.enableSearch();
    }

    processDrop(event){
        this.track = event;
        this.formModel.seedArtist = event.artists[0].id;
        this.formModel.seedTrack = event.id;
        this.enableSearch();
    }

    removeTrack(){

        this.track = undefined;
        this.formModel.seedArtist = undefined;
        this.formModel.seedTrack = undefined;
        this.enableSearch();
    }

    search() {
        if(this.disableForm){
            return;
        }
        this.tracks = [];
        this.waiting = true;
        this._searchService.searchRecommendations(this.formModel)
            .subscribe(
                res => {

                    this.tracks = res.tracks;
                    this.waiting = false;

                },
                err => console.log("error searching recommendations: " + err),
                () => console.log("Music loaded.")
            );
    }

    enableSearch(){

        if(this.track != undefined)
            {
                this.disableForm = false;
        }
        else {
            this.disableForm = true;

        }
    }

}