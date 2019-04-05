import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class UserService {

    constructor(private _http: HttpClient, private _authService: AuthService) {}

    getUserInfo(){
        return this._authService.getEndPointHeaders().mergeMap( headers =>
             this._http.get('https://api.spotify.com/v1/me', {headers: headers})
                .map(res => res));
    }

    followedArtists(){
        return this._authService.getEndPointHeaders().mergeMap( headers =>
            this._http.get('https://api.spotify.com/v1/me/following?type=artist', {headers: headers})
                .map(res => res));
    }

    myPlaylists(){
        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/me/playlists', {headers: headers})
                .map(res => res));
    }

    savedAlbums(){
        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/me/albums', {headers: headers})
                .map(res => res));
    }

    savedTracks(){
        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/me/tracks?limit=40', {headers: headers})
                .map(res => res));
    }

    getTop(type: string, limit: number){
        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/me/top/' + type + '?limit=' + limit, {headers: headers})
                .map(res => res));
  }
}