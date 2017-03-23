import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class UserService {

    constructor(private _http: Http, private _authService: AuthService) {}

    getUserInfo(){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
             this._http.get('https://api.spotify.com/v1/me', {headers: headers})
                .map(res => res.json()));
    }

    followedArtists(){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/me/following?type=artist', {headers: headers})
                .map(res => res.json()));
    }

    myPlaylists(){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/me/playlists', {headers: headers})
                .map(res => res.json()));
    }

    savedAlbums(){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/me/albums', {headers: headers})
                .map(res => res.json()));
    }

    savedTracks(){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/me/tracks?limit=40', {headers: headers})
                .map(res => res.json()));
    }

    getTop(type: string, limit: number){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/me/top/' + type + '?limit=' + limit, {headers: headers})
                .map(res => res.json()));
  }
}