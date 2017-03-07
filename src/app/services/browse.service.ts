import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class BrowseService {

    constructor(private _http: Http, private _authService: AuthService) {}

    getHeaders(){
        var access_token =  this._authService.getAccessToken();
        if(access_token) {

            var headers = new Headers();

            headers.append('Authorization', 'Bearer '+ access_token);

            return headers;
        }
    }

    getFeaturedPlaylists(){

        var headers = this.getHeaders();

        if(headers) {

            return this._http.get('https://api.spotify.com/v1/browse/featured-playlists?country=CA', {headers: headers})
                .map(res => res.json());
        }
        else{
            console.log("NO ACCESS TOKEN.  Could not retrieve featured playlist data.");
        }

    }

    getNewReleases(){

        var headers = this.getHeaders();

        if(headers) {

            return this._http.get('https://api.spotify.com/v1/browse/new-releases', {headers: headers})
                .map(res => res.json());
        }
        else{
            console.log("NO ACCESS TOKEN.  Could not retrieve new releases data.");
        }

    }

    getCategories(){

        var headers = this.getHeaders();

        if(headers) {

            return this._http.get('https://api.spotify.com/v1/browse/categories', {headers: headers})
                .map(res => res.json());
        }
        else{
            console.log("NO ACCESS TOKEN.  Could not retrieve categories data.");
        }

    }

    getCategoryPlaylists(category_id: string){

        var headers = this.getHeaders();

        if(headers) {
            return this._http.get('https://api.spotify.com/v1/browse/categories/' + category_id + '/playlists', {headers: headers})
                .map(res => res.json());
        }
        else{
            console.log("NO ACCESS TOKEN.  Could not retrieve top " + category_id + " data.");
        }

    }
}