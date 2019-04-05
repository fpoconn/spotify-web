import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; 

@Injectable()
export class AuthService {

    EXPIRED: string = "EXPIRED";

    client_id: string = 'CLIENT_ID';
    redirect_uri: string = "http://localhost:4200";

    token_url: string = 'https://accounts.spotify.com/api/token';

    scope: string = 'user-read-private playlist-read-private user-read-email user-library-read user-top-read user-follow-read';
    
    constructor(private _http: HttpClient) {}

    getAuthorizeUrl(){
        return 'https://accounts.spotify.com/authorize?' +
            'response_type=code' +
            '&client_id=' + this.client_id +
            '&scope=' + this.scope +
            '&redirect_uri=' + this.redirect_uri;
    }

    clearTokenData(){

        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_expiry");
    }

    // access code returned from the url redirect
    setAccessCode(ourCode: string){
        // this.access_code = ourCode;
        localStorage.setItem("access_code", ourCode);
    }
    
    getAccessCode(){
        //return this.access_code;
        return localStorage.getItem("access_code");
    }

    setAccessTokenData(tokenJson: any){
       // expires in uses seconds 
        var tokenExpiry = Date.now() + (tokenJson.expires_in * 1000);

        localStorage.setItem("access_token", tokenJson.access_token);
        localStorage.setItem("token_expiry", tokenExpiry.toString());
        // data return from refresh does not have new refresh token.  need to use original
        if  (tokenJson.refresh_token){
            localStorage.setItem("refresh_token", tokenJson.refresh_token);
           // this.refresh_token = tokenJson.refresh_token;
        }
        this.scope = tokenJson.scope;
    
    }

    // used by API endpoints for the headers
    getAccessToken(): string {
        
        let access_token = localStorage.getItem("access_token");
        let tokenExpiry = localStorage.getItem("token_expiry");

        if (tokenExpiry && access_token) {
            // EXPIRED TOKEN, REFRESH
            if (Date.now() > parseInt(tokenExpiry)) {
                console.log("EXPIRED!");
                return this.EXPIRED; 
            }
        }

        return access_token;
    }

    // return observable because the header might need a refreshed access_token
    getEndPointHeaders() {

        var access_token =  this.getAccessToken();

        if (access_token === this.EXPIRED) {
            return this.refreshAccessToken().map(data => {
                this.setAccessTokenData(data);
                var headers = new HttpHeaders();
                var token = this.getAccessToken();
                headers.append('Authorization', 'Bearer '+ token);

                return headers;
            });
        }
        else{
            return Observable.create(observer => {
                //NOTE: Had to change how new HttpHeaders were created.
               // var headers = new HttpHeaders();
               // headers.append('Authorization', 'Bearer '+ access_token);
               let headers = new HttpHeaders( 
                   { 'Authorization' : 'Bearer '+ access_token }
               );
                observer.next(headers);

            }).map( data =>  data );
        }
    }

    // used by to get a  refreshed token after expiry
    refreshAccessToken() {

        var refreshToken = localStorage.getItem("refresh_token");
        
        // Direct call caused CORS issue.  Use express endpoint.
        // var headers = this.getAccessTokenHeaders();
        // var tokendata = 'grant_type=refresh_token&refresh_token=' + refreshToken;
        // return this._http.post(this.token_url, tokendata, {headers: headers});

       var form = {
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        };

        return this._http.post('/api/token', form);
    }
    
    // auth guard will use the results to set the access token data
    retrieveAccessToken() {

        var access_code = this.getAccessCode();

        // Direct call caused CORS issue.  Use express endpoint.
        // var headers = this.getAccessTokenHeaders();
        //var tokendata = 'code=' + access_code + '&grant_type=authorization_code&redirect_uri=' + this.redirect_uri;
        //return this._http.post(this.token_url, tokendata, {headers: headers});

        var form = {
            code: access_code,
            redirect_uri: this.redirect_uri,
            grant_type: 'authorization_code'
        };

        return this._http.post('/api/token', form);
    }

}