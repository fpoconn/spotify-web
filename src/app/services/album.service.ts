import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AlbumService {

    constructor(private _http: Http) {}

    albumFromId(id){
        if(id) {
            return this._http.get('https://api.spotify.com/v1/albums/' + id)
                .map(res => res.json());
        }

    }

}