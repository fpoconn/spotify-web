import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class BrowseService {

    constructor(private _http: Http, private _authService: AuthService) {}

    getFeaturedPlaylists(){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/browse/featured-playlists?country=CA', {headers: headers})
                .map(res => res.json()));
    }

    getNewReleases(){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/browse/new-releases', {headers: headers})
                .map(res => res.json()));
    }

    getCategories(){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/browse/categories', {headers: headers})
                .map(res => res.json()));
    }

    getCategoryPlaylists(category_id: string){

        return this._authService.getEndPointHeaders().mergeMap( (headers) =>
            this._http.get('https://api.spotify.com/v1/browse/categories/' + category_id + '/playlists', {headers: headers})
                .map(res => res.json()));
    }

}