import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {

    constructor(private _http: Http, private _authService: AuthService) {}

    artistAlbums(id){
        if(id) {
            return this._authService.getEndPointHeaders().mergeMap( (headers) =>    
                this._http.get('https://api.spotify.com/v1/artists/' + id + '/albums?market=CA&album_type=album,compilation', {headers: headers})
                    .map(res => res.json()));
        }
    }

    topTracks(id){

        if(id) {
            return this._authService.getEndPointHeaders().mergeMap( (headers) =>
                this._http.get('https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=CA', {headers: headers})
                    .map(res => res.json()));
        }
    }

    relatedArtists(id){
        if(id) {
            return this._authService.getEndPointHeaders().mergeMap( (headers) =>
                 this._http.get('https://api.spotify.com/v1/artists/' + id + '/related-artists', {headers: headers})
                    .map(res => res.json()));
        }
    }

    artistFromId(id){

        if(id){
            return this._authService.getEndPointHeaders().mergeMap( (headers) =>
                this._http.get('https://api.spotify.com/v1/artists/' + id, {headers: headers})
                    .map(res => res.json()));

        }
       
    }

}