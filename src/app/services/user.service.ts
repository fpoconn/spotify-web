import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    constructor(private _http: Http, private _authService: AuthService) {}

    getHeaders(){
        var access_token =  this._authService.getAccessToken();
        if(access_token) {

            var headers = new Headers();

            headers.append('Authorization', 'Bearer '+ access_token);

            return headers;
        }
    }

    getUserInfo(){
        
        var headers = this.getHeaders();

        if(headers) {
            
            return this._http.get('https://api.spotify.com/v1/me', {headers: headers})
                .map(res => res.json());
        }
        else{
            console.log("NO ACCESS TOKEN.  Could not retrieve User Info data.");
        }

    }

    followedArtists(){

        var headers = this.getHeaders();

        if(headers) {

            return this._http.get('https://api.spotify.com/v1/me/following?type=artist', {headers: headers})
                .map(res => res.json());
        }
        else{
            console.log("NO ACCESS TOKEN.  Could not retrieve followed artists data.");
        }

    }

    myPlaylists(){

        var headers = this.getHeaders();

        if(headers) {
            return this._http.get('https://api.spotify.com/v1/me/playlists', {headers: headers})
                .map(res => res.json());
        }
        else{
            console.log("NO ACCESS TOKEN.  Could not retrieve my playlists data.");
        }

    }

    savedAlbums(){

        var headers = this.getHeaders();

        if(headers) {

            return this._http.get('https://api.spotify.com/v1/me/albums', {headers: headers})
                .map(res => res.json());
        }
        else{
            console.log("NO ACCESS TOKEN.  Could not retrieve my albums data.");
        }

    }

    savedTracks(){

        var headers = this.getHeaders();

        if(headers) {

            return this._http.get('https://api.spotify.com/v1/me/tracks?limit=40', {headers: headers})
                .map(res => res.json());
        }
        else{
            console.log("NO ACCESS TOKEN.  Could not retrieve my tracks data.");
        }

    }

    getTop(type: string, limit: number){

        var headers = this.getHeaders();

        if(headers) {
            return this._http.get('https://api.spotify.com/v1/me/top/' + type + '?limit=' + limit, {headers: headers})
                .map(res => res.json());
        }
        else{
            console.log("NO ACCESS TOKEN.  Could not retrieve top " + type + " data.");
        }

    }
}