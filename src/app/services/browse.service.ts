import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class BrowseService {

    constructor(private _http: HttpClient, private _authService: AuthService) {}

    getFeaturedPlaylists(){

        return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) => 
         this._http.get('https://api.spotify.com/v1/browse/featured-playlists?country=CA', {headers: headers})
                .pipe(map(res => res))));
    }

    getNewReleases(){

        return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
            this._http.get('https://api.spotify.com/v1/browse/new-releases', {headers: headers})
                .pipe(map(res => res))));
    }

    getCategories(){

        return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
            this._http.get('https://api.spotify.com/v1/browse/categories', {headers: headers})
                .pipe(map(res => res))));
    }

    getCategoryPlaylists(category_id: string){

        return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
            this._http.get('https://api.spotify.com/v1/browse/categories/' + category_id + '/playlists', {headers: headers})
                .pipe(map(res => res))));
    }

}