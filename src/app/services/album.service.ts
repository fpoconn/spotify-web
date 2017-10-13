import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AlbumService {

    constructor(private _http: Http, private _authService: AuthService) {}

    albumFromId(id){
        if(id) {
            return this._authService.getEndPointHeaders().mergeMap( (headers) =>    
                this._http.get('https://api.spotify.com/v1/albums/' + id, {headers: headers})
                    .map(res => res.json()));
        }
    }

}