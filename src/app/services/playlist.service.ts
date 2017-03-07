import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from "./auth.service";


@Injectable()
export class PlaylistService {

    constructor(private _http: Http, private _authService: AuthService) {}

    getHeaders(){
        var access_token =  this._authService.getAccessToken();
        if(access_token) {

            var headers = new Headers();

            headers.append('Authorization', 'Bearer '+ access_token);

            return headers;
        }
    }


    playlistFromId(ownerId: string, id: string){
        
        var headers = this.getHeaders();

        if(headers) {

            if (headers && ownerId && id) {
                return this._http.get('https://api.spotify.com/v1/users/' + ownerId + '/playlists/' + id, {headers: headers})
                    .map(res => res.json());
            }
        }
    }

    getTracks(href: string){
        
        var headers = this.getHeaders();
        if(headers) {

            if (headers) {
                return this._http.get(href, {headers: headers})
                    .map(res => res.json());
            }
        }

    }

    addTrack(playlistId: string, userId: string, trackURI: string){

        var headers = this.getHeaders();
        
        if(headers) {

            return this._http.post('https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks?uris='
                + trackURI.replace(/:/g, '%3A') + '&position=0', null, {headers: headers})
                .map(res => res.json());
        }

    }

    removeTrack(playlistId: string, userId: string, trackData: string){

        var headers = this.getHeaders();

        if(headers) {

            headers.append('Content-Type', 'application/json');

            return this._http.delete('https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks',
                {headers: headers, body: trackData})
                .map(res => res.json());
        }

    }
}