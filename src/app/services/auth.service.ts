import {Injectable} from '@angular/core';
import {HttpModule, Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
    
    // set from the post, used by endpoints
    access_token: string;
    //not used yet
    refresh_token: string;

    // set from the redirect
    access_code: string;
    
    client_id: string = 'CLIENT_ID';
    client_secret: string = 'CLIENT_SECRET';
    redirect_uri: string = "http://<host>:port/baseref";
    
    token_url: string = 'https://accounts.spotify.com/api/token';

    scope: string = 'user-read-private playlist-read-private user-read-email user-library-read user-top-read user-follow-read';
    
    constructor(private _http: Http) {}

    getAuthorizeUrl(){
        return 'https://accounts.spotify.com/authorize?' +
            'response_type=code' +
            '&client_id=' + this.client_id +
            '&scope=' + this.scope +
            '&redirect_uri=' + this.redirect_uri;
    }

    // access code returned from the url redirect
    setAccessCode(ourCode: string){
        this.access_code = ourCode;
    }
    
    getAccessCode(){
        return this.access_code;
    }

    setAccessTokenData(tokenJson: any){
        this.access_token = tokenJson.access_token;
        this.refresh_token = tokenJson.refresh_token;
        this.scope = tokenJson.scope;
    }

    // used by API endpoints for the headers
    getAccessToken(){
        return this.access_token;
    }

    // auth guard will use the results to set the access token data
    retrieveAccessToken(): Observable<any> {
        var basicheader = btoa(this.client_id + ':' + this.client_secret);

        var headers = new Headers();

        headers.append('Authorization', 'Basic '+ basicheader);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var tokendata = 'code=' + this.access_code + '&grant_type=authorization_code&redirect_uri=' + this.redirect_uri;

        return this._http.post(this.token_url, tokendata, {headers: headers});
    }

}