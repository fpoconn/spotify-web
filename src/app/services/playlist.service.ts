import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class PlaylistService {

    constructor(private _http: HttpClient, private _authService: AuthService) {}

    playlistFromId(ownerId: string, id: string):Observable<any>  {

        if (ownerId && id) {
        
            return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) => 
                this._http.get('https://api.spotify.com/v1/users/' + ownerId + '/playlists/' + id, {headers: headers})
                    .pipe(map(res => res ))));       
        }
    }

    getTracks(href: string){
        
        return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
            this._http.get(href, {headers: headers})
                .pipe(map(res => res ))));

    }

    addTrack(playlistId: string, userId: string, trackURI: string){

        return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
            this._http.post('https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks?uris='
                + trackURI.replace(/:/g, '%3A') + '&position=0', null, {headers: headers})
                .pipe(map(res => res))));
    }

    removeTrack(playlistId: string, userId: string, trackData: string){

        return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) => 
            {
                headers.append('Content-Type', 'application/json');
                return this._http.request('delete', 'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks',
                    {headers: headers, body: trackData});
            }))
            .pipe(map(res => res));

    }
}