import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {PlaylistListComponent} from "../playlists/playlist-list.compoenent";

@Component({
    selector: 'spot-my-playlists',
    template: `
    <div *ngIf="myPlaylists">
         <spot-playlist-list [playlists]="myPlaylists"></spot-playlist-list>
    </div>
    <div *ngIf="!myPlaylists">
        Sorry, no Playlists
    </div>
    `,
    providers: [UserService]
})

export class MyPlaylistsComponent {

    myPlaylists: any;

    constructor(private _userService: UserService) {

        this._userService.myPlaylists().subscribe(
            res => {
                this.myPlaylists = res.items;
            },
            err => console.log("error loading my playlists: " + err),
            () => console.log("My Playlists loaded.")
        );
    }
}