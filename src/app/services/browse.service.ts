import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class BrowseService {

    constructor(private _http: HttpClient, private _authService: AuthService) {}

    getFeaturedPlaylists(){

        return this._authService.getEndPointHeaders().mergeMap( (headers: HttpHeaders) => 
         this._http.get('https://api.spotify.com/v1/browse/featured-playlists?country=CA', {headers: headers})
                .map(res => res));
    }

    getNewReleases(){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/browse/new-releases', {headers: headers})
                .map(res => res));
    }

    getCategories(){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/browse/categories', {headers: headers})
                .map(res => res));
    }

    getCategoryPlaylists(category_id: string){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/browse/categories/' + category_id + '/playlists', {headers: headers})
                .map(res => res));
    }

}