import {Component, Input} from '@angular/core';

@Component({
    selector: 'track-info',
    template: `
    <div *ngIf="track">
        <div class="no-wrap-text">
            {{track.name}} 
            <div style="margin-left: 10px; margin-right: 5px;">
                <span *ngIf="!isPlaying" class="glyphicon glyphicon-play-circle previewTrack" (click)="previewTrack(track)"></span>
                <span *ngIf="isPlaying" class="glyphicon glyphicon-pause pauseTrack" (click)="pauseTrack()"></span>              
             </div>
        </div>
        <div class="no-wrap-text">
            <div>{{track.artists[0].name}}</div> 
            <div> 
                <small>{{track.album.name}}</small>
            </div>
        </div>
    </div>    
    `
})
export class TrackInfo{
    
    @Input() track: any;
    player: any = new Audio();
    isPlaying: boolean = false;

    previewTrack(track){
        this.player.setAttribute('src', track.preview_url);
        this.player.load();
        this.player.play();
        this.isPlaying = true;
    }

    pauseTrack(){
        this.player.pause();
        this.isPlaying = false;
    }
   
}