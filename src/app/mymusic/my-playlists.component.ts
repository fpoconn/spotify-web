import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {PlaylistListComponent} from "../playlists/playlist-list.compoenent";

@Component({
    selector: 'spot-my-playlists',
    template: `
    <div *ngIf="myPlaylists">
         <spot-playlist-list [playlists]="myPlaylists"></spot-playlist-list>
    </div>
    <div *ngIf="!myPlaylists || myPlaylists.length === 0">
        {{playlistMessage}}
    </div>
    `,
    providers: [UserService]
})

export class MyPlaylistsComponent implements OnInit {

    myPlaylists: any;
    playlistMessage: string = 'Loading playlists ...';

    constructor(private _userService: UserService) {}
    
    ngOnInit(){
        this._userService.myPlaylists().subscribe(
            res => {
                this.myPlaylists = res.items;
                if(!this.myPlaylists || this.myPlaylists.length === 0){
                    this.playlistMessage = 'There are no playlists to display.';
                }
            },
            err => console.log("error loading my playlists: " + err),
            () => console.log("My Playlists loaded.")
        );
    }
}