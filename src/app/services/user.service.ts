import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class UserService {

    constructor(private _http: HttpClient, private _authService: AuthService) {}

    getUserInfo(){
        console.log("HEADERS: ");
        return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
             this._http.get('https://api.spotify.com/v1/me', { headers: headers} )
                .pipe(map(res => res))));
    }

    followedArtists(){
        return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
            this._http.get('https://api.spotify.com/v1/me/following?type=artist', { headers: headers}  )
                .pipe(map(res => res))));
    }

    myPlaylists(){
        return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
            this._http.get('https://api.spotify.com/v1/me/playlists',{ headers: headers}  )
                .pipe(map(res => res))));
    }

    savedAlbums(){
        return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
            this._http.get('https://api.spotify.com/v1/me/albums', { headers: headers} )
                .pipe(map(res => res))));
    }

    savedTracks(){
        return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
            this._http.get('https://api.spotify.com/v1/me/tracks?limit=40', { headers: headers} )
                .pipe(map(res => res))));
    }

    getTop(type: string, limit: number){
        return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
            this._http.get('https://api.spotify.com/v1/me/top/' + type + '?limit=' + limit, { headers: headers} )
                .pipe(map(res => res))));
  }
}