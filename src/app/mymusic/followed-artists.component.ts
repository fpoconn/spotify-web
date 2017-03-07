import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {ArtistListComponent} from "../artists/artist-list.component";

@Component({
    selector: 'spot-followed-artists',
    template: `
    <div *ngIf="followedArtists">
         <spot-artist-list [artists]="followedArtists"></spot-artist-list>
    </div>
    <div *ngIf="!followedArtists">
        Sorry, no Followed Artists
    </div>
    `,
    providers: [UserService]
})

export class FollowedArtistsComponent {

    followedArtists: any;

    constructor(private _userService: UserService) {

        this._userService.followedArtists().subscribe(
            res => {
                this.followedArtists = res.artists.items;
            },
            err => console.log("error loading followed artists: " + err),
            () => console.log("Followed Artists loaded ")
        );
    }
}