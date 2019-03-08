import { Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {ArtistListComponent} from "../artists/artist-list.component";

@Component({
    selector: 'spot-followed-artists',
    template: `
    <div *ngIf="followedArtists && followedArtists.length > 0">
         <spot-artist-list [artists]="followedArtists"></spot-artist-list>
    </div>
    <ng-template>
        {{followedArtistsMessage}}
    </ng-template>
    `,
    providers: [UserService]
})

export class FollowedArtistsComponent implements OnInit {

    followedArtists: any;
    followedArtistsMessage: string = 'Loading Followed Artists ...';

    constructor(private _userService: UserService) {}

    ngOnInit(){
        this._userService.followedArtists().subscribe(
            res => {
                this.followedArtists = res.artists.items;
               if(!this.followedArtists || this.followedArtists.length === 0){
                    this.followedArtistsMessage = 'There are no artists to display.';
                }
            },
            err => console.log("Error loading followed artists: " + err),
            () => console.log("Followed Artists loaded ")
        );    
    }
}