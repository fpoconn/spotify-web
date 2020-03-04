import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import 'rxjs/operators';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ArtistService {

    constructor(private _http: HttpClient, private _authService: AuthService) {}

    artistAlbums(id: string){
        if(id) {
            return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>    
                this._http.get('https://api.spotify.com/v1/artists/' + id + '/albums?market=CA&album_type=album,compilation', {headers: headers})
                    .pipe(map(res => res))));
        }
    }

    topTracks(id: string){

        if(id) {
            return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
                this._http.get('https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=CA', {headers: headers})
                    .pipe(map(res => res))));
        }
    }

    relatedArtists(id: string){
        if(id) {
            return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
                 this._http.get('https://api.spotify.com/v1/artists/' + id + '/related-artists', {headers: headers})
                    .pipe(map(res => res))));
        }
    }

    artistFromId(id: string){
        if(id){
            return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
                this._http.get('https://api.spotify.com/v1/artists/' + id, {headers: headers})
                    .pipe(map(res => {
                        return res;
                    }))));

        }
       
    }

}