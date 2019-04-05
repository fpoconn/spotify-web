import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {

    constructor(private _http: HttpClient, private _authService: AuthService) {}

    artistAlbums(id){
        if(id) {
            return this._authService.getEndPointHeaders().mergeMap( (headers) =>    
                this._http.get('https://api.spotify.com/v1/artists/' + id + '/albums?market=CA&album_type=album,compilation', {headers: headers})
                    .map(res => res));
        }
    }

    topTracks(id){

        if(id) {
            return this._authService.getEndPointHeaders().mergeMap( (headers) =>
                this._http.get('https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=CA', {headers: headers})
                    .map(res => res));
        }
    }

    relatedArtists(id){
        if(id) {
            return this._authService.getEndPointHeaders().mergeMap( (headers) =>
                 this._http.get('https://api.spotify.com/v1/artists/' + id + '/related-artists', {headers: headers})
                    .map(res => res));
        }
    }

    artistFromId(id){
        console.log("GET ARTIST FROM ID");
        if(id){
            return this._authService.getEndPointHeaders().mergeMap( (headers) =>
                this._http.get('https://api.spotify.com/v1/artists/' + id, {headers: headers})
                    .map(res => {
                        console.log("TEST FOR RYAN");
                        console.log (res);
                        return res;
                    }));

        }
       
    }

}