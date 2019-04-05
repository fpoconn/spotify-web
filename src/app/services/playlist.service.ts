import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";


@Injectable()
export class PlaylistService {

    constructor(private _http: HttpClient, private _authService: AuthService) {}

    playlistFromId(ownerId: string, id: string):Observable<any>  {

        if (ownerId && id) {
        
            return this._authService.getEndPointHeaders().mergeMap( (headers) => 
                this._http.get('https://api.spotify.com/v1/users/' + ownerId + '/playlists/' + id, {headers: headers}))
                    .map(res => res );       
        }

    }

    getTracks(href: string){
        
        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get(href, {headers: headers})
                .map(res => res ));

    }

    addTrack(playlistId: string, userId: string, trackURI: string){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.post('https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks?uris='
                + trackURI.replace(/:/g, '%3A') + '&position=0', null, {headers: headers})
                .map(res => res));
    }

    removeTrack(playlistId: string, userId: string, trackData: string){

        return this._authService.getEndPointHeaders().mergeMap( (headers) => 
            {
                headers.append('Content-Type', 'application/json');
                return this._http.request('delete', 'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks',
                    {headers: headers, body: trackData});
            })
            .map(res => res);

    }
}