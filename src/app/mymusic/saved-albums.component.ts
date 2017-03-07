import { Component } from '@angular/core';
import {AlbumListComponent} from '../albums/albums-list.component';
import {UserService} from "../services/user.service";

@Component({
    selector: 'spot-saved-albums',
    template: `
    <div *ngIf="savedAlbums">
         <spot-album-list [albums]="savedAlbums" [isWrapped]=true></spot-album-list>
    </div>
    <div *ngIf="!savedAlbums">
        Sorry, no Saved Albums
    </div>
    `,
    providers: [UserService]
})

export class SavedAlbumsComponent {

    savedAlbums: any;

    constructor(private _userService: UserService) {
        
        this._userService.savedAlbums().subscribe(
            res => {
                this.savedAlbums = res.items;
            },
            err => console.log("error loading saved albums: " + err),
            () => console.log("Saved Albums loaded.")
        );
    }
}