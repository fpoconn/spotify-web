import { Component, OnInit} from '@angular/core';
import {AlbumListComponent} from '../albums/albums-list.component';
import {UserService} from "../services/user.service";

@Component({
    selector: 'spot-saved-albums',
    template: `
    <div *ngIf="savedAlbums && savedAlbums.length > 0; else loading">
         <spot-album-list [albums]="savedAlbums" [isWrapped]=true></spot-album-list>
    </div>
    <ng-template #loading>{{albumsMessage}}</ng-template>
    `,
    providers: [UserService]
})

export class SavedAlbumsComponent implements OnInit {

    savedAlbums: any;
    albumsMessage: string = 'Loading Saved Albums ... ';

    constructor(private _userService: UserService) {}

    ngOnInit() {
        
        this._userService.savedAlbums().subscribe(
            res => {
                this.savedAlbums = res.items;
                if(!this.savedAlbums || this.savedAlbums.length === 0){
                    this.albumsMessage = 'There are no saved albums to display.';
                }
            },
            err => console.log("error loading saved albums: " + err),
            () => console.log("Saved Albums loaded.")
        );
    }
}