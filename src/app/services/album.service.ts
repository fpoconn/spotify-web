import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class AlbumService {

    constructor(private _http: HttpClient, private _authService: AuthService) {}

    albumFromId(id: string){
        if(id) {
            return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>    
                this._http.get('https://api.spotify.com/v1/albums/' + id, {headers: headers})
                    .pipe(map(res => res))));
        }
    }

}