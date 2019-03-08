import {Component, OnInit } from '@angular/core';
import {SanitizeTrackUrl} from "../pipes";
import {UserService} from "../services/user.service";

@Component({
    selector: 'spot-saved-tracks',
    template: `
    <div *ngIf="savedTracks && savedTracks.length > 0; else loading">
        <table>
         <tr *ngFor="let track of savedTracks">
            <td><iframe width="500" height="80" [src]="track.track.id | sanitizeTrackUrl" 
                frameborder="0" allowtransparency="true"></iframe></td>
         </tr>
        </table>
    </div>
    <ng-template #loading>
        {{savedTracksMessage}}
    </ng-template>
    `,
    providers: [UserService]
})

export class SavedTracksComponent implements OnInit {
    // objects wrap a track and added time
    // access track with track.track
    savedTracks: any;
    savedTracksMessage: string = 'Loading Saved Tracks ...';

    constructor(private _userService: UserService) {}

    ngOnInit(){
        
        this._userService.savedTracks().subscribe(
            res => {
                this.savedTracks = res.items;
                if(!this.savedTracks || this.savedTracks.length === 0){
                    this.savedTracksMessage = 'There are no tracks to display.';
                }
            },
            err => console.log("error: " + err),
            () => console.log("Saved Tracks loaded ")
        );
    }
    
}