import {Injectable} from '@angular/core';
import {HttpModule, Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable'; 

@Injectable()
export class AuthService {

    EXPIRED: string = "EXPIRED";
    // set from the post, used by endpoints
    access_token: string;
    //not used yet
    refresh_token: string;

    tokenExpiry: number;

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

       // expires in uses seconds 
       this.tokenExpiry = Date.now() + (tokenJson.expires_in * 1000);

        this.access_token = tokenJson.access_token;
        // data return from refresh does not have new refresh token.  need to use original
        if  (tokenJson.refresh_token){
            this.refresh_token = tokenJson.refresh_token;
        }
        this.scope = tokenJson.scope;
    
    }

    // used by API endpoints for the headers
    getAccessToken(): string {

        if (this.tokenExpiry && this.access_token) {
            // EXPIRED TOKEN, REFRESH
            if (Date.now() > this.tokenExpiry) {
                return this.EXPIRED; 
            }
        }

        return this.access_token;
    }

    // header needed when using the token uri
    getAccessTokenHeaders(){

        var basicheader = btoa(this.client_id + ':' + this.client_secret);

        var headers = new Headers();

        headers.append('Authorization', 'Basic '+ basicheader);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return headers;
    }

    // return observable because the header might need a refreshed access_token
    getEndPointHeaders() {

        var access_token =  this.getAccessToken();

        if (access_token === this.EXPIRED) {
            return this.refreshAccessToken().map(data => {
                this.setAccessTokenData(data.json());
                var headers = new Headers();
                var token = this.getAccessToken();
                headers.append('Authorization', 'Bearer '+ token);
                return headers;
            });
        }
        else{
            return Observable.create(observer => {
                var headers = new Headers();
                headers.append('Authorization', 'Bearer '+ access_token);
                observer.next(headers);
            }).map( data =>  data );
        }
    }

    // used by to get a  refreshed token after expiry
    refreshAccessToken() {

        var headers = this.getAccessTokenHeaders();
        var tokendata = 'grant_type=refresh_token&refresh_token=' + this.refresh_token;

        return this._http.post(this.token_url, tokendata, {headers: headers});
    }
    
    // auth guard will use the results to set the access token data
    retrieveAccessToken() {

        var headers = this.getAccessTokenHeaders();
        var tokendata = 'code=' + this.access_code + '&grant_type=authorization_code&redirect_uri=' + this.redirect_uri;

        return this._http.post(this.token_url, tokendata, {headers: headers});
    }

}