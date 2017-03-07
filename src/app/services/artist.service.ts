import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {

    constructor(private _http: Http) {}

    artistAlbums(id){
        if(id) {
            return this._http.get('https://api.spotify.com/v1/artists/' + id + '/albums?market=CA&album_type=album,compilation')
                .map(res => res.json());
        }
    }

    topTracks(id){

        if(id) {
            return this._http.get('https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=CA')
                .map(res => res.json());
        }
    }

    relatedArtists(id){
        if(id) {
            return this._http.get('https://api.spotify.com/v1/artists/' + id + '/related-artists')
                .map(res => res.json());
        }
    }

    artistFromId(id){
        
        if(id) {
            return this._http.get('https://api.spotify.com/v1/artists/' + id)
                .map(res => res.json());
        }

    }

}